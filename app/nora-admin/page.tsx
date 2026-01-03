'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface RSVP {
  id: string;
  name: string;
  attending: boolean;
  guests_count: number;
  dietary_info: string | null;
  created_at: string;
}

interface TimeCapsule {
  id: string;
  guest_name: string;
  message: string;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [messages, setMessages] = useState<TimeCapsule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Simple password check - you can change this or use env variable
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'nora2024';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setError('Incorrect password');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch RSVPs
      const { data: rsvpData, error: rsvpError } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false });

      if (rsvpError) throw rsvpError;
      setRsvps(rsvpData || []);

      // Fetch Time Capsule messages
      const { data: messageData, error: messageError } = await supabase
        .from('time_capsule')
        .select('*')
        .order('created_at', { ascending: false });

      if (messageError) throw messageError;
      setMessages(messageData || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      alert('Error loading data. Please check your Supabase connection.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFFAF0] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                placeholder="Enter password"
                autoFocus
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-xl font-medium transition-colors shadow-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFAF0] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-4 py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {/* RSVPs Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            RSVPs ({rsvps.length})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Attending</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Guests</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Dietary Info</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      No RSVPs yet
                    </td>
                  </tr>
                ) : (
                  rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-800">{rsvp.name}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {rsvp.attending ? (
                          <span className="text-green-600 font-medium">Yes</span>
                        ) : (
                          <span className="text-red-600 font-medium">No</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{rsvp.guests_count}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {rsvp.dietary_info || '-'}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {new Date(rsvp.created_at).toLocaleDateString()} {new Date(rsvp.created_at).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Time Capsule Messages Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Time Capsule Messages ({messages.length})
          </h2>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No messages yet</p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className="border border-gray-200 rounded-xl p-4 bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-800">{message.guest_name}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(message.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-800 whitespace-pre-wrap">{message.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
