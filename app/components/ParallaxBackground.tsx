'use client';

import { useEffect, useRef } from 'react';

export default function ParallaxBackground() {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      
      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
      if (layer3Ref.current) {
        layer3Ref.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
      if (layer4Ref.current) {
        layer4Ref.current.style.transform = `translateY(${scrolled * 0.6}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Parallax layers with different scroll speeds */}
      <div 
        ref={layer1Ref}
        className="absolute top-0 left-0 w-full h-[200vh] bg-gradient-to-b from-rose-50/30 via-purple-50/20 to-blue-50/30 will-change-transform"
      ></div>
      <div 
        ref={layer2Ref}
        className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-radial from-rose-200/20 via-transparent to-transparent rounded-full blur-3xl will-change-transform"
      ></div>
      <div 
        ref={layer3Ref}
        className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-gradient-radial from-purple-200/20 via-transparent to-transparent rounded-full blur-3xl will-change-transform"
      ></div>
      <div 
        ref={layer4Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-100/15 via-transparent to-transparent rounded-full blur-3xl will-change-transform"
      ></div>
    </div>
  );
}
