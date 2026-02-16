
import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { Booking } from '../types';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

const MyBookingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed' | 'Cancelled'>('Upcoming');

  const loadData = () => {
    // Only fetch bookings for the currently logged in user
    setBookings(storage.getCurrentUserBookings());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCancel = (e: React.MouseEvent, bookingId: string) => {
    e.stopPropagation();
    const confirmed = window.confirm('Do you want to cancel?');
    if (!confirmed) return;

    storage.cancelBooking(bookingId);
    alert('ur booking is cancel and u will get refund within 2 days');
    
    // Refresh and switch to cancelled tab so the user sees the booking has moved
    loadData();
    setActiveTab('Cancelled');
  };

  const filtered = bookings.filter(b => b.status === activeTab);

  return (
    <Layout>
      <div className="bg-white p-6 sticky top-0 z-40 border-b border-slate-100">
        <h2 className="font-bold text-slate-800 text-lg mb-4">My Bookings</h2>
        <div className="flex bg-slate-100 p-1 rounded-2xl">
          {(['Upcoming', 'Completed', 'Cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-4">
        {filtered.length > 0 ? (
          filtered.map((booking) => (
            <div 
              key={booking.id} 
              className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm relative overflow-hidden group active:scale-[0.98] transition-all"
              onClick={() => navigate('/success', { state: booking })}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-base">{booking.train.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">PNR: {booking.id}</p>
                </div>
                <p className="font-bold text-blue-600">₹{booking.totalFare}</p>
              </div>

              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4">
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

              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{booking.date}</p>
                  <p className="text-[10px] font-bold text-slate-600">{booking.passengers.length} Passenger(s) • {booking.selectedClass.type}</p>
                </div>
                {activeTab === 'Upcoming' && (
                  <button 
                    onClick={(e) => handleCancel(e, booking.id)}
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-100 transition-all"
                  >
                    Cancel Now
                  </button>
                )}
                {activeTab === 'Cancelled' && (
                   <div className="bg-red-100/50 text-red-700 px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest">
                     Refund in Progress
                   </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24 bg-white rounded-[40px] border border-slate-100 shadow-sm px-8">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="text-slate-200" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 2v2m0 16v2m10-10h-2M4 10H2"/></svg>
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">No {activeTab} Bookings</h3>
            <p className="text-slate-400 text-xs font-medium px-4 leading-relaxed">
              Your personal {activeTab.toLowerCase()} journeys will appear here.
            </p>
            {activeTab === 'Upcoming' && (
              <button 
                onClick={() => navigate('/')}
                className="mt-8 bg-blue-600 text-white w-full py-4 rounded-2xl font-bold shadow-lg shadow-blue-50 active:scale-95 transition-all"
              >
                Book a Journey
              </button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyBookingsScreen;
