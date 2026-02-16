
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import { Booking } from '../types';
import Layout from '../components/Layout';

const CancellationScreen: React.FC = () => {
  const navigate = useNavigate();
  // 'Upcoming' is the "To Cancel" list, 'Cancelled' is the "Cancellation Section"
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Cancelled'>('Upcoming');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const loadBookings = () => {
    // Only load bookings belonging to the current user
    setBookings(storage.getCurrentUserBookings());
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = (bookingId: string) => {
    // 1. Ask for confirmation
    const confirmed = window.confirm('Do you want to cancel?');
    if (!confirmed) return;
    
    setIsProcessing(bookingId);
    
    // Simulate API processing time
    setTimeout(() => {
      // 2. Update status in storage
      storage.cancelBooking(bookingId);
      
      // 3. Show success alert with the exact message requested
      alert('ur booking is cancel and u will get refund within 2 days');
      
      // 4. Refresh local state and switch to the "Cancellation Section" tab
      loadBookings();
      setIsProcessing(null);
      setActiveTab('Cancelled');
    }, 800);
  };

  // Filter based on tab: 'Upcoming' are active, 'Cancelled' are cancelled
  const filtered = bookings.filter(b => b.status === activeTab);

  return (
    <Layout>
      <div className="bg-white border-b border-slate-100 p-6 sticky top-0 z-40">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h2 className="font-bold text-slate-800 text-lg">Manage Cancellation</h2>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-100 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('Upcoming')}
            className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === 'Upcoming' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
          >
            To Cancel
          </button>
          <button
            onClick={() => setActiveTab('Cancelled')}
            className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === 'Cancelled' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-400'}`}
          >
            Cancellation Section
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map(booking => (
              <div key={booking.id} className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm relative overflow-hidden group">
                {activeTab === 'Cancelled' && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-[8px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                    Cancelled
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">{booking.train.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PNR: {booking.id}</p>
                  </div>
                  <p className={`font-bold ${activeTab === 'Upcoming' ? 'text-blue-600' : 'text-slate-300'}`}>₹{booking.totalFare}</p>
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
                  <div className="text-center">
                    <p className="text-sm font-extrabold text-slate-800">{booking.train.departure}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">{booking.train.from}</p>
                  </div>
                  <div className="px-4 text-slate-200">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-extrabold text-slate-800">{booking.train.arrival}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">{booking.train.to}</p>
                  </div>
                </div>

                {activeTab === 'Upcoming' ? (
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{booking.date}</p>
                    <button 
                      onClick={() => handleCancel(booking.id)}
                      disabled={isProcessing === booking.id}
                      className="bg-red-600 text-white px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-700 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-red-100"
                    >
                      {isProcessing === booking.id ? 'Processing...' : 'Cancel Now'}
                    </button>
                  </div>
                ) : (
                  <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                      <p className="text-red-700 text-[10px] font-bold uppercase tracking-wider">
                        Refund Status
                      </p>
                    </div>
                    <p className="text-slate-600 text-[10px] font-medium leading-relaxed mt-1">
                      ur booking is cancel and u will get refund within 2 days.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[40px] border border-slate-100 shadow-sm px-8">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="text-slate-200" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 2v2m0 16v2m10-10h-2M4 10H2"/></svg>
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">No Records</h3>
            <p className="text-slate-400 text-xs font-medium px-4 leading-relaxed">
              {activeTab === 'Upcoming' 
                ? "You don't have any active bookings available for cancellation." 
                : "You haven't cancelled any bookings yet. Cancelled trips appear here."}
            </p>
            <button 
              onClick={() => navigate('/')}
              className="mt-8 bg-blue-600 text-white w-full py-4 rounded-2xl font-bold shadow-lg shadow-blue-50 active:scale-95 transition-all"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CancellationScreen;
