
'use client';

import dynamic from 'next/dynamic';

const Testimonials = dynamic(() => import('@/components/Testimonials'), { 
  loading: () => <div className="min-h-[300px]"></div>,
  ssr: false 
});

export default function DynamicTestimonials() {
    return <Testimonials />;
}
