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
  // Update time & date every minute - format: "01:02 PM", "SAT MAR 7"
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const ampm = h >= 12 ? 'PM' : 'AM';
      const hour12 = h % 12 || 12;
      setFormattedTime(`${hour12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`);
      const day = now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
      const month = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      const date = now.getDate();
      setFormattedDate(`${day} ${month} ${date}`);
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
          if (!cancelled) fetchWeather(28.6139, 77.2090); // Delhi as fallback for India
        },
        { timeout: 5000, maximumAge: 300000 }
      );
    } else {
      fetchWeather(28.6139, 77.2090);
    }

    return () => { cancelled = true; };
  }, []);

  const weather = getWeatherInfo(weatherCode);
  const isClearOrSunny = weatherCode === 0 || weatherCode === 1;

  // White outline sun icon (reference style) for clear/sunny, emoji for others
  const WeatherIcon = () =>
    isClearOrSunny ? (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="4" fill="none" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ) : (
      <span style={{ fontSize: '18px' }}>{weather.emoji}</span>
    );

  // Weather-based gradient (realistic sky tones)
  const getCardGradient = () => {
    if (isClearOrSunny) {
      return 'linear-gradient(180deg, #9DD4F0 0%, #7EC5E8 30%, #5BA8D8 70%, #4A96C8 100%)';
    }
    if (weatherCode === 2 || weatherCode === 3) {
      return 'linear-gradient(180deg, #8B9DC3 0%, #6B7BA3 50%, #4A5A7A 100%)';
    }
    if (weatherCode >= 51 && weatherCode <= 82) {
      return 'linear-gradient(180deg, #6B7B8A 0%, #4A5A6A 50%, #3A4A5A 100%)';
    }
    if (weatherCode >= 95) {
      return 'linear-gradient(180deg, #4A5A6A 0%, #3A4A5A 70%, #2A3A4A 100%)';
    }
    return 'linear-gradient(180deg, #87CEEB 0%, #4A9FD4 100%)';
  };

  return (
    <div style={{ marginTop: '-20px', height: '120px' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '140px',
        width: '280px',
        borderRadius: '20px',
        background: getCardGradient(),
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
      }}>
        {/* Sun with radiating rays - reference style + animations */}
        {isClearOrSunny && (
          <div
            style={{
              position: 'absolute',
              top: '-55px',
              right: '-55px',
              width: '140px',
              height: '140px',
              pointerEvents: 'none',
              animation: 'sunGlowPulse 4s ease-in-out infinite'
            }}
          >
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                  <stop offset="25%" stopColor="rgba(255,245,200,0.4)" />
                  <stop offset="50%" stopColor="rgba(255,230,150,0.2)" />
                  <stop offset="75%" stopColor="rgba(255,200,80,0.08)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFEF5" />
                  <stop offset="30%" stopColor="#FFE066" />
                  <stop offset="60%" stopColor="#FFC84D" />
                  <stop offset="100%" stopColor="#FFB020" />
                </radialGradient>
              </defs>
              <circle cx="70" cy="70" r="65" fill="url(#sunGlow)" />
              <g style={{ animation: 'sunRayPulse 3s ease-in-out infinite' }}>
              {/* Radiating rays - 24 rays, more visible */}
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i * 15 * Math.PI) / 180 - Math.PI / 2;
                const x1 = 70 + 22 * Math.cos(angle);
                const y1 = 70 + 22 * Math.sin(angle);
                const x2 = 70 + 55 * Math.cos(angle);
                const y2 = 70 + 55 * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(255,248,220,0.7)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                );
              })}
              </g>
              <circle cx="70" cy="70" r="20" fill="url(#sunCore)" />
            </svg>
          </div>
        )}
        {/* Small subtle clouds */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '18px', left: '30px', width: '35px', height: '14px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)' }} />
          <div style={{ position: 'absolute', top: '25px', left: '55px', width: '28px', height: '11px', borderRadius: '50%', background: 'rgba(255,255,255,0.14)' }} />
          <div style={{ position: 'absolute', top: '45px', right: '50px', width: '32px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.16)' }} />
          <div style={{ position: 'absolute', top: '55px', right: '85px', width: '24px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
        </div>
        <section style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          color: 'white',
          padding: '20px 22px',
          textShadow: '0 1px 3px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.15)'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            zIndex: 1,
            gap: '4px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '16px', fontWeight: 600 }}>
              <WeatherIcon />
              <span>{loading ? '...' : weather.label}</span>
            </div>
            <div style={{ fontSize: '44px', fontWeight: 700, lineHeight: '1', letterSpacing: '-0.03em', textShadow: '0 2px 6px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)' }}>
              {loading || temp === null ? '--°' : `${temp}°`}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 500 }}>
              {loading ? '--°/--°' : `${high ?? '--'}°/${low ?? '--'}°`}
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: '100%',
            zIndex: 1,
            gap: '4px'
          }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, lineHeight: '1.1' }}>
                {formattedTime.split(' ')[0]}
                <span style={{ fontSize: '0.8em', fontWeight: 600, marginLeft: '2px' }}> {formattedTime.split(' ')[1]}</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 500, marginTop: '2px' }}>{formattedDate}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
              <div style={{ fontSize: '15px', fontWeight: 500 }}>
                {location === null ? 'Loading...' : location}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
