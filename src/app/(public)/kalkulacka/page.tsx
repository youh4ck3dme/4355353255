
'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function KalkulackaPage() {
  useEffect(() => {
    redirect('/cennik');
  }, []);

  return null;
}
