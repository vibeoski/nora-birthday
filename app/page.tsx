'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { supabase } from '@/lib/supabase';
import CountdownTimer from './components/CountdownTimer';
import { MapPin, Calendar, Clock, Users, UtensilsCrossed, Heart, ArrowDown } from 'lucide-react';
import ParallaxBackground from './components/ParallaxBackground';

export default function Home() {
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    attending: true,
    guestCount: '1',
    dietaryInfo: '',
  });
  const [letterForm, setLetterForm] = useState({
    guestName: '',
    message: '',
  });
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [letterSubmitting, setLetterSubmitting] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [letterSuccess, setLetterSuccess] = useState(false);
  const [rsvpError, setRsvpError] = useState('');
  const [letterError, setLetterError] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitting(true);
    setRsvpSuccess(false);
    setRsvpError('');

    try {
      const { error } = await supabase.from('rsvps').insert([
        {
          name: rsvpForm.name,
          attending: rsvpForm.attending,
          guests_count: parseInt(rsvpForm.guestCount, 10),
          dietary_info: rsvpForm.dietaryInfo || null,
        },
      ]);

      if (error) throw error;

      setRsvpSuccess(true);
      setRsvpForm({ name: '', attending: true, guestCount: '1', dietaryInfo: '' });
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#667eea', '#764ba2', '#f093fb'],
      });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setRsvpError('There was an error submitting your RSVP. Please try again.');
      setRsvpSuccess(false);
    } finally {
      setRsvpSubmitting(false);
    }
  };

  const handleLetterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLetterSubmitting(true);
    setLetterSuccess(false);
    setLetterError('');

    try {
      const { error } = await supabase.from('time_capsule').insert([
        {
          guest_name: letterForm.guestName,
          message: letterForm.message,
        },
      ]);

      if (error) throw error;

      setLetterSuccess(true);
      setLetterForm({ guestName: '', message: '' });
    } catch (error) {
      console.error('Error submitting letter:', error);
      setLetterError('There was an error submitting your letter. Please try again.');
      setLetterSuccess(false);
    } finally {
      setLetterSubmitting(false);
    }
  };

  const openGoogleMaps = () => {
    const address = encodeURIComponent('Your Address Here');
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  const heroParallax = scrollY * 0.5;
  const imageParallax = scrollY * 0.3;
  const infoParallax = scrollY * 0.2;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParallaxBackground />
      
      {/* Hero Section with Parallax */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 py-20 z-10"
        style={{
          transform: `translateY(${heroParallax * 0.3}px)`,
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          {/* Floating badge */}
          <div 
            className="inline-block mb-8 px-6 py-3 rounded-full glass-effect shadow-lg animate-fade-in-up"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            <span className="text-sm font-medium text-slate-700">January 11, 2026</span>
          </div>

          {/* Main heading with gradient */}
          <h1 
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 animate-fade-in-scale leading-tight"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          >
            <span className="text-slate-900">Nora is</span>
            <br />
            <span className="text-gradient">Turning One</span>
          </h1>

          <p 
            className="text-xl md:text-2xl text-slate-600 mb-16 max-w-2xl mx-auto animate-fade-in-up animate-delay-200 font-light"
            style={{
              transform: `translateY(${scrollY * 0.15}px)`,
            }}
          >
            Join us for a celebration of this special milestone
          </p>

          {/* Image with parallax */}
          <div 
            className="relative w-full max-w-2xl mx-auto mb-20 rounded-3xl overflow-hidden shadow-2xl card-hover"
            style={{
              transform: `translateY(${imageParallax}px) scale(${1 - scrollY * 0.0001})`,
              opacity: 1 - scrollY * 0.001,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
            <Image
              src="/nora.jpg"
              alt="Nora"
              width={800}
              height={800}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Scroll indicator */}
          <div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
            style={{
              opacity: 1 - scrollY * 0.01,
            }}
          >
            <ArrowDown className="w-6 h-6 text-slate-400" />
          </div>
        </div>
      </section>

      {/* Countdown Section with Parallax */}
      <section className="relative py-20 px-6 z-10">
        <div 
          className="max-w-6xl mx-auto"
          style={{
            transform: `translateY(${infoParallax}px)`,
          }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Countdown to Celebration</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto"></div>
          </div>
          <CountdownTimer />
        </div>
      </section>

      {/* Information Section with Glass Morphism */}
      <section 
        ref={infoRef}
        className="relative py-24 px-6 z-10"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl card-hover">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
              Event Details
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-200 mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="w-8 h-8 text-rose-600" />
                </div>
                <div className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">Date</div>
                <div className="text-xl font-semibold text-slate-900">January 11</div>
                <div className="text-lg text-slate-600">2026</div>
              </div>

              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">Time</div>
                <div className="text-xl font-semibold text-slate-900">11:30 AM</div>
                <div className="text-lg text-slate-600">Morning</div>
              </div>

              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">Location</div>
                <div className="text-xl font-semibold text-slate-900">Your Venue</div>
                <div className="text-lg text-slate-600">Name</div>
              </div>
            </div>

            <button
              onClick={openGoogleMaps}
              className="w-full md:w-auto mx-auto block px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <MapPin size={20} />
              View on Google Maps
            </button>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="relative py-24 px-6 z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">RSVP</h2>
            <p className="text-slate-600">Please let us know if you can join us</p>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-4"></div>
          </div>

          <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl card-hover">
            {rsvpSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-center text-sm font-medium">
                Thank you for your RSVP. We look forward to celebrating with you.
              </div>
            )}

            {rsvpError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-center text-sm font-medium">
                {rsvpError}
              </div>
            )}

            <form onSubmit={handleRsvpSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-slate-700 font-medium mb-2 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={rsvpForm.name}
                  onChange={(e) => {
                    setRsvpForm({ ...rsvpForm, name: e.target.value });
                    if (rsvpError) setRsvpError('');
                    if (rsvpSuccess) setRsvpSuccess(false);
                  }}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-3 text-sm">
                  Attendance
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    rsvpForm.attending 
                      ? 'border-slate-900 bg-slate-900 text-white font-medium shadow-lg' 
                      : 'border-slate-200 bg-white/50 backdrop-blur-sm text-slate-700 hover:border-slate-300'
                  }`}>
                    <input
                      type="radio"
                      name="attending"
                      checked={rsvpForm.attending}
                      onChange={() => {
                        setRsvpForm({ ...rsvpForm, attending: true });
                        if (rsvpError) setRsvpError('');
                        if (rsvpSuccess) setRsvpSuccess(false);
                      }}
                      className="sr-only"
                    />
                    <span>Attending</span>
                  </label>
                  <label className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    !rsvpForm.attending 
                      ? 'border-slate-900 bg-slate-900 text-white font-medium shadow-lg' 
                      : 'border-slate-200 bg-white/50 backdrop-blur-sm text-slate-700 hover:border-slate-300'
                  }`}>
                    <input
                      type="radio"
                      name="attending"
                      checked={!rsvpForm.attending}
                      onChange={() => {
                        setRsvpForm({ ...rsvpForm, attending: false });
                        if (rsvpError) setRsvpError('');
                        if (rsvpSuccess) setRsvpSuccess(false);
                      }}
                      className="sr-only"
                    />
                    <span>Not Attending</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="guestCount" className="block text-slate-700 font-medium mb-2 text-sm">
                  Number of Guests
                </label>
                <input
                  type="number"
                  id="guestCount"
                  required
                  min="1"
                  value={rsvpForm.guestCount}
                  onChange={(e) => {
                    setRsvpForm({ ...rsvpForm, guestCount: e.target.value });
                    if (rsvpError) setRsvpError('');
                    if (rsvpSuccess) setRsvpSuccess(false);
                  }}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all bg-white/50 backdrop-blur-sm"
                />
              </div>

              <div>
                <label htmlFor="dietaryInfo" className="block text-slate-700 font-medium mb-2 text-sm">
                  Dietary Requirements
                </label>
                <textarea
                  id="dietaryInfo"
                  value={rsvpForm.dietaryInfo}
                  onChange={(e) => {
                    setRsvpForm({ ...rsvpForm, dietaryInfo: e.target.value });
                    if (rsvpError) setRsvpError('');
                  }}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 resize-none transition-all bg-white/50 backdrop-blur-sm"
                  rows={4}
                  placeholder="Any dietary restrictions or allergies?"
                />
              </div>

              <button
                type="submit"
                disabled={rsvpSubmitting}
                className="w-full py-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {rsvpSubmitting ? 'Submitting...' : 'Submit RSVP'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Time Capsule Section */}
      <section className="relative py-24 px-6 z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 mb-4">
              <Heart className="w-8 h-8 text-purple-600 fill-purple-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Time Capsule</h2>
            <p className="text-slate-600">Write a letter to Nora (to be opened in 2042)</p>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-4"></div>
          </div>

          <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl card-hover">
            {letterSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-center text-sm font-medium">
                Your letter has been saved. Thank you for your message.
              </div>
            )}

            {letterError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-center text-sm font-medium">
                {letterError}
              </div>
            )}

            <form onSubmit={handleLetterSubmit} className="space-y-6">
              <div>
                <label htmlFor="guestName" className="block text-slate-700 font-medium mb-2 text-sm">
                  Your Name
                </label>
                <input
                  type="text"
                  id="guestName"
                  required
                  value={letterForm.guestName}
                  onChange={(e) => {
                    setLetterForm({ ...letterForm, guestName: e.target.value });
                    if (letterError) setLetterError('');
                    if (letterSuccess) setLetterSuccess(false);
                  }}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-slate-700 font-medium mb-2 text-sm">
                  Your Message
                </label>
                <textarea
                  id="message"
                  required
                  value={letterForm.message}
                  onChange={(e) => {
                    setLetterForm({ ...letterForm, message: e.target.value });
                    if (letterError) setLetterError('');
                    if (letterSuccess) setLetterSuccess(false);
                  }}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 resize-none transition-all"
                  rows={10}
                  placeholder="Write a special message to Nora that will be opened when she turns 18 in 2042..."
                />
              </div>

              <button
                type="submit"
                disabled={letterSubmitting}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {letterSubmitting ? 'Saving...' : 'Save Letter to Time Capsule'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
