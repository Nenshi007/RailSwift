
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Booking } from '../types';
import Layout from '../components/Layout';

const SuccessScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state as Booking;

  return (
    <Layout hideNav>
      <div className="flex flex-col items-center p-6 space-y-8 animate-in fade-in duration-700">
        <div className="mt-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Booking Confirmed!</h2>
          <p className="text-slate-500 font-medium">Have a safe and happy journey</p>
        </div>

        <div className="w-full bg-white rounded-[40px] p-8 shadow-2xl relative border border-slate-100">
          <div className="flex flex-col items-center mb-8 border-b border-slate-100 border-dashed pb-8">
            <div className="bg-slate-50 p-4 rounded-3xl mb-4">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${booking.id}`} 
                alt="Ticket QR" 
                className="w-32 h-32"
              />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Ticket ID</p>
            <h3 className="text-xl font-bold text-slate-800">{booking.id}</h3>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Train</p>
                <p className="font-bold text-slate-800">{booking.train.name}</p>
                <p className="text-[10px] font-bold text-blue-600">#{booking.train.number}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Class</p>
                <p className="font-bold text-slate-800">{booking.selectedClass.type}</p>
              </div>
            </div>

            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
              <div>
                <p className="text-lg font-bold text-slate-800">{booking.train.departure}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">{booking.train.from}</p>
              </div>
              <div className="text-slate-200">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-800">{booking.train.arrival}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">{booking.train.to}</p>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</p>
                <p className="font-bold text-slate-800">{booking.date}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Passengers</p>
                <p className="font-bold text-black">{booking.passengers.length} {booking.passengers.length > 1 ? 'Persons' : 'Person'}</p>
              </div>
            </div>
          </div>

          {/* Ticket Edge Decoration */}
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-50 border border-slate-100"></div>
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-50 border border-slate-100"></div>
        </div>

        <div className="w-full space-y-3">
          <button className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download PDF
          </button>
          <button 
            onClick={() => navigate('/bookings')}
            className="w-full bg-white text-blue-600 border border-blue-600 py-4 rounded-2xl font-bold active:scale-95 transition-all"
          >
            My Bookings
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-full text-slate-400 py-2 font-bold text-xs uppercase tracking-widest"
          >
            Back to Home
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessScreen;
