import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: '#1A5255',
          color: '#F8F8F8',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        VI&MO · Sťahovanie Bratislava
      </div>
    ),
    { ...size }
  );
}
