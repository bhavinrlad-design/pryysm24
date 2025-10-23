'use client';

export default function LandingPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#004B8D',
      color: 'white',
      fontFamily: "'Roboto', sans-serif",
      padding: '40px',
      gap: '20px'
    }}>
      <h1 style={{fontSize: '3rem', fontWeight: 'bold', color: '#E6A635'}}>TESTING INLINE STYLES</h1>
      <p style={{fontSize: '1.5rem', backgroundColor: '#E6A635', color: '#004B8D', padding: '20px', borderRadius: '8px'}}>If you see GOLD background with DARK BLUE text - inline styles WORK!</p>
      <div style={{backgroundColor: 'white', color: '#004B8D', padding: '30px', borderRadius: '8px', fontSize: '1.25rem', fontWeight: 'bold'}}>WHITE BOX - test</div>
      <div style={{backgroundColor: '#FFD700', color: '#000', padding: '20px', borderRadius: '8px', fontSize: '1rem'}}>BRIGHT YELLOW - should be very visible</div>
    </div>
  )
}
