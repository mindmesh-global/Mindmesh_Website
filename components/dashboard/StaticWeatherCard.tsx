'use client';

import { useState, useEffect } from 'react';

const WEATHER_CODES: Record<number, { emoji: string; label: string }> = {
  0: { emoji: '☀️', label: 'Clear' },
  1: { emoji: '🌤️', label: 'Mainly Clear' },
  2: { emoji: '⛅', label: 'Partly Cloudy' },
  3: { emoji: '☁️', label: 'Overcast' },
  45: { emoji: '🌫️', label: 'Foggy' },
  48: { emoji: '🌫️', label: 'Foggy' },
  51: { emoji: '🌧️', label: 'Drizzle' },
  53: { emoji: '🌧️', label: 'Drizzle' },
  55: { emoji: '🌧️', label: 'Drizzle' },
  61: { emoji: '🌧️', label: 'Rain' },
  63: { emoji: '🌧️', label: 'Rain' },
  65: { emoji: '🌧️', label: 'Heavy Rain' },
  71: { emoji: '🌨️', label: 'Snow' },
  73: { emoji: '🌨️', label: 'Snow' },
  75: { emoji: '🌨️', label: 'Snow' },
  77: { emoji: '🌨️', label: 'Snow' },
  80: { emoji: '🌦️', label: 'Showers' },
  81: { emoji: '🌦️', label: 'Showers' },
  82: { emoji: '🌦️', label: 'Heavy Showers' },
  85: { emoji: '🌨️', label: 'Snow Showers' },
  86: { emoji: '🌨️', label: 'Snow Showers' },
  95: { emoji: '⛈️', label: 'Thunderstorm' },
  96: { emoji: '⛈️', label: 'Thunderstorm' },
  99: { emoji: '⛈️', label: 'Thunderstorm' },
};

function getWeatherInfo(code: number) {
  return WEATHER_CODES[code] ?? { emoji: '🌤️', label: 'Unknown' };
}

export function StaticWeatherCard() {
  const [formattedTime, setFormattedTime] = useState('--:-- --');
  const [formattedDate, setFormattedDate] = useState('---');
  const [location, setLocation] = useState<string | null>(null);
  const [temp, setTemp] = useState<number | null>(null);
  const [high, setHigh] = useState<number | null>(null);
  const [low, setLow] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Update time & date every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setFormattedTime(now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }));
      setFormattedDate(now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }).toUpperCase());
    };
    updateTime();
    const id = setInterval(updateTime, 60000);
    return () => clearInterval(id);
  }, []);

  // Fetch location, then weather
  useEffect(() => {
    let cancelled = false;

    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const [weatherRes, geoRes] = await Promise.all([
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`),
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
        ]);

        if (cancelled) return;

        const weatherData = await weatherRes.json();
        const geoData = await geoRes.json();

        if (weatherData?.current) {
          setTemp(Math.round(weatherData.current.temperature_2m));
          setWeatherCode(weatherData.current.weather_code ?? 0);
        }
        if (weatherData?.daily?.temperature_2m_max?.[0] != null) {
          setHigh(Math.round(weatherData.daily.temperature_2m_max[0]));
        }
        if (weatherData?.daily?.temperature_2m_min?.[0] != null) {
          setLow(Math.round(weatherData.daily.temperature_2m_min[0]));
        }
        if (geoData?.city) {
          setLocation(geoData.city);
        } else if (geoData?.locality) {
          setLocation(geoData.locality);
        } else if (geoData?.principalSubdivision) {
          setLocation(geoData.principalSubdivision);
        } else {
          setLocation(`${lat.toFixed(1)}°, ${lon.toFixed(1)}°`);
        }
      } catch {
        if (!cancelled) {
          setLocation('Location unavailable');
          setTemp(25);
          setHigh(30);
          setLow(20);
          setWeatherCode(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (!cancelled) {
            fetchWeather(pos.coords.latitude, pos.coords.longitude);
          }
        },
        () => {
          if (!cancelled) {
            // Fallback: use approximate location or default
            fetchWeather(28.6139, 77.2090); // Delhi as fallback for India
          }
        },
        { timeout: 5000, maximumAge: 300000 }
      );
    } else {
      fetchWeather(28.6139, 77.2090);
    }

    return () => { cancelled = true; };
  }, []);

  const weather = getWeatherInfo(weatherCode);

  return (
    <div style={{ marginTop: '-20px', height: '120px' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '140px',
        width: '280px',
        borderRadius: '25px',
        background: 'linear-gradient(135deg, #ec7263 0%, #f08d7e 100%)',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'rgba(0, 0, 0, 0.15) 2px 3px 4px'
      }}>
        <section style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          color: 'white',
          padding: '0 18px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '100%',
            zIndex: 1
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div>{weather.emoji}</div>
              <div>{loading ? '...' : weather.label}</div>
            </div>
            <div style={{ fontSize: '34pt', fontWeight: 500, lineHeight: '1' }}>
              {loading ? '--°' : `${temp}°`}
            </div>
            <div>
              {loading ? '--°/--°' : `${high}°/${low}°`}
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
            height: '100%',
            zIndex: 1
          }}>
            <div>
              <div style={{ fontSize: '19pt', lineHeight: '1em' }}>{formattedTime}</div>
              <div style={{ fontSize: '15px' }}>{formattedDate}</div>
            </div>
            <div>{location ?? 'Loading...'}</div>
          </div>
        </section>
      </div>
    </div>
  );
}
