export function StaticWeatherCard() {
  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).toUpperCase();

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
              <div>☀️</div>
              <div>Sunny</div>
            </div>
            <div style={{ fontSize: '34pt', fontWeight: 500, lineHeight: '1' }}>25°</div>
            <div>30°/20°</div>
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
            <div>New York</div>
          </div>
        </section>
      </div>
    </div>
  );
}
