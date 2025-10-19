
'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function ReferenciePage() {
  useEffect(() => {
    redirect('/#sluzby');
  }, []);

  return null;
}
