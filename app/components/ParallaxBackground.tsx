'use client';

export default function ParallaxBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Simplified background for mobile - no parallax for better performance */}
      <div className="absolute top-0 left-0 w-full h-[200vh] bg-gradient-to-b from-rose-50/30 via-purple-50/20 to-blue-50/30"></div>
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-gradient-radial from-rose-200/20 via-transparent to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-[250px] h-[250px] bg-gradient-radial from-purple-200/20 via-transparent to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-blue-100/15 via-transparent to-transparent rounded-full blur-3xl"></div>
    </div>
  );
}
