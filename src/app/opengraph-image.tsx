
import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'VI&MO - Sťahovanie Bratislava';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: '#0B4556',
          color: '#E6FF2B',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Inter", sans-serif',
          fontWeight: 800,
        }}
      >
        <img 
          src="https://viandmo.com/wp-content/uploads/viandmo_logo_regular_land.svg" 
          alt="VI&MO Logo" 
          width="400"
          height="114"
        />
        <div style={{ marginTop: '40px', color: '#F9F7F2', fontSize: '36px', fontWeight: 400 }}>Sťahovanie bez starostí</div>
      </div>
    ),
    { 
      ...size,
    }
  );
}
