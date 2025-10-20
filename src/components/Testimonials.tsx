
'use client';

import { testimonials } from '@/lib/testimonials';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 7000); // Auto-play every 7 seconds
    return () => clearInterval(timer);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-brand-bg text-brand-text dark:bg-brand-dark-teal dark:text-brand-bg py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark-teal dark:text-brand-bright-green text-shadow-3d-green">
                Čo o nás hovoria klienti
            </h2>
            <p className="mt-4 text-lg text-brand-secondary-grey dark:text-slate-300">
                Vaša spokojnosť je našou najlepšou vizitkou.
            </p>
        </header>
        
        <div className="relative bg-brand-light-gray dark:bg-brand-dark-teal/80 rounded-xl shadow-large p-8 md:p-12 overflow-hidden">
           <Quote className="absolute top-4 left-4 h-16 w-16 text-brand-bright-green/10 dark:text-brand-bright-green/20 transform -translate-x-4 -translate-y-4" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 text-center">
              <Image 
                src={currentTestimonial.imageUrl}
                alt={currentTestimonial.name}
                width={100}
                height={100}
                className="rounded-full mx-auto border-4 border-brand-bright-green"
              />
              <h3 className="mt-4 text-xl font-bold text-brand-dark-teal dark:text-brand-bg">{currentTestimonial.name}</h3>
              <p className="text-sm text-brand-secondary-grey dark:text-slate-400">{currentTestimonial.location}</p>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "h-5 w-5",
                      i < currentTestimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300 dark:text-slate-600"
                    )}
                  />
                ))}
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <p className="text-lg italic text-brand-secondary-grey dark:text-slate-300 leading-relaxed">
                “{currentTestimonial.text}”
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
             <button onClick={prevTestimonial} className="p-2 rounded-full bg-brand-dark-teal/50 hover:bg-brand-dark-teal text-white transition-colors" aria-label="Previous testimonial">
                <ChevronLeft size={24} />
             </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all duration-300",
                            currentIndex === index ? "bg-brand-bright-green scale-125" : "bg-slate-400 dark:bg-slate-600"
                        )}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
             <button onClick={nextTestimonial} className="p-2 rounded-full bg-brand-dark-teal/50 hover:bg-brand-dark-teal text-white transition-colors" aria-label="Next testimonial">
                <ChevronRight size={24} />
             </button>
          </div>
        </div>
      </div>
    </section>
  )
}
