'use client';

import { useState } from 'react';
import confetti from 'canvas-confetti';
import { supabase } from '@/lib/supabase';
import CountdownTimer from './components/CountdownTimer';
import { MapPin } from 'lucide-react';

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

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitting(true);
    setRsvpSuccess(false);

    try {
      const { error } = await supabase.from('rsvps').insert([
        {
          name: rsvpForm.name,
          attending: rsvpForm.attending,
          guests_count: parseInt(rsvpForm.guestCount),
          dietary_info: rsvpForm.dietaryInfo || null,
        },
      ]);

      if (error) throw error;

      setRsvpSuccess(true);
      setRsvpForm({ name: '', attending: true, guestCount: '1', dietaryInfo: '' });
      
      // Celebration confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFB6C1', '#FFC0CB', '#FFD1DC', '#FFE4E1'],
      });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('There was an error submitting your RSVP. Please try again.');
    } finally {
      setRsvpSubmitting(false);
    }
  };

  const handleLetterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLetterSubmitting(true);
    setLetterSuccess(false);

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
      alert('There was an error submitting your letter. Please try again.');
    } finally {
      setLetterSubmitting(false);
    }
  };

  const openGoogleMaps = () => {
    // Update this with the actual address/coordinates
    const address = encodeURIComponent('Your Address Here');
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FFFAF0]">
      {/* Hero Section */}
      <section className="px-4 py-12 md:py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-pink-500 mb-6 drop-shadow-sm">
            Nora is turning ONE
          </h1>
          
          {/* Image Placeholder */}
          <div className="w-full max-w-md mx-auto mb-8 rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-pink-200 to-purple-200 aspect-square flex items-center justify-center">
            <div className="text-gray-500 text-lg">Photo Placeholder</div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8">
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="px-4 py-12 bg-white/50 rounded-3xl mx-4 md:mx-auto max-w-2xl shadow-sm mb-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Party Details</h2>
          
          <div className="space-y-3 text-lg text-gray-700">
            <div>
              <span className="font-semibold">Date:</span> January 11, 2026
            </div>
            <div>
              <span className="font-semibold">Time:</span> 11:30 AM
            </div>
            <div>
              <span className="font-semibold">Location:</span> Your Venue Name
            </div>
          </div>

          <button
            onClick={openGoogleMaps}
            className="mt-6 px-6 py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-full font-medium transition-colors shadow-md flex items-center gap-2 mx-auto"
          >
            <MapPin size={20} />
            Open in Google Maps
          </button>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="px-4 py-12 max-w-2xl mx-auto mb-8">
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            RSVP
          </h2>

          {rsvpSuccess && (
            <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg text-center">
              Thank you for your RSVP! We can't wait to celebrate with you! 🎉
            </div>
          )}

          <form onSubmit={handleRsvpSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={rsvpForm.name}
                onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Attending *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={rsvpForm.attending}
                    onChange={() => setRsvpForm({ ...rsvpForm, attending: true })}
                    className="mr-2"
                  />
                  Yes, I'll be there!
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={!rsvpForm.attending}
                    onChange={() => setRsvpForm({ ...rsvpForm, attending: false })}
                    className="mr-2"
                  />
                  Sorry, can't make it
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="guestCount" className="block text-gray-700 font-medium mb-2">
                Number of Guests *
              </label>
              <input
                type="number"
                id="guestCount"
                required
                min="1"
                value={rsvpForm.guestCount}
                onChange={(e) => setRsvpForm({ ...rsvpForm, guestCount: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="dietaryInfo" className="block text-gray-700 font-medium mb-2">
                Dietary Info
              </label>
              <textarea
                id="dietaryInfo"
                value={rsvpForm.dietaryInfo}
                onChange={(e) => setRsvpForm({ ...rsvpForm, dietaryInfo: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none"
                rows={3}
                placeholder="Any dietary restrictions or allergies?"
              />
            </div>

            <button
              type="submit"
              disabled={rsvpSubmitting}
              className="w-full py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-xl font-medium transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {rsvpSubmitting ? 'Submitting...' : 'Submit RSVP'}
            </button>
          </form>
        </div>
      </section>

      {/* Time Capsule Section */}
      <section className="px-4 py-12 max-w-2xl mx-auto mb-12">
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
            Time Capsule
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Letter to Nora (to be opened in 2042)
          </p>

          {letterSuccess && (
            <div className="mb-4 p-4 bg-blue-100 text-blue-800 rounded-lg text-center">
              Your letter has been saved! Thank you for your beautiful message. 💌
            </div>
          )}

          <form onSubmit={handleLetterSubmit} className="space-y-4">
            <div>
              <label htmlFor="guestName" className="block text-gray-700 font-medium mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="guestName"
                required
                value={letterForm.guestName}
                onChange={(e) => setLetterForm({ ...letterForm, guestName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Your Message *
              </label>
              <textarea
                id="message"
                required
                value={letterForm.message}
                onChange={(e) => setLetterForm({ ...letterForm, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none"
                rows={8}
                placeholder="Write a special message to Nora that will be opened when she turns 18..."
              />
            </div>

            <button
              type="submit"
              disabled={letterSubmitting}
              className="w-full py-3 bg-purple-400 hover:bg-purple-500 text-white rounded-xl font-medium transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {letterSubmitting ? 'Saving...' : 'Save Letter'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
