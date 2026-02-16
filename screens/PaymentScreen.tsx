
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Train, TrainClass, Passenger, Booking } from '../types';
import { storage } from '../utils/storage';
import Layout from '../components/Layout';

const PaymentScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as { 
    train: Train; 
    selectedClass: TrainClass; 
    passengers: Passenger[]; 
    totalFare: number;
    date: string;
    email: string;
    phone: string;
  };

  const [method, setMethod] = useState('UPI');

  const handlePay = () => {
    // Simulate payment processing
    // We create the booking without the userEmail, storage.addBooking will handle it
    const bookingData: Omit<Booking, 'userEmail'> = {
      id: 'TXN' + Math.floor(Math.random() * 1000000),
      train: data.train,
      selectedClass: data.selectedClass,
      passengers: data.passengers,
      date: data.date,
      totalFare: data.totalFare,
      status: 'Upcoming',
      paymentMethod: method,
      bookingDate: new Date().toISOString().split('T')[0]
    };

    storage.addBooking(bookingData);
    
    // Fetch the full booking (including userEmail) to pass to success screen
    const userBookings = storage.getCurrentUserBookings();
    const finalBooking = userBookings[0]; // Most recent is at the top
    
    navigate('/success', { state: finalBooking });
  };

  return (
    <Layout hideNav>
      <div className="bg-white border-b border-slate-100 p-6 sticky top-0 z-40 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="font-bold text-slate-800">Review & Pay</h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Ticket Summary */}
        <div className="bg-blue-600 text-white rounded-3xl p-6 shadow-xl shadow-blue-100">
          <div className="flex justify-between items-start mb-6 border-b border-blue-500/50 pb-4">
            <div>
              <h3 className="font-bold text-lg">{data.train.name}</h3>
              <p className="text-xs text-blue-200 font-bold uppercase tracking-widest">#{data.train.number}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">₹{data.totalFare}</p>
              <p className="text-[10px] font-bold text-blue-200">INCLUSIVE OF GST</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Travel Date</p>
              <p className="font-bold">{data.date}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Passengers</p>
              <p className="font-bold">{data.passengers.length} Person{data.passengers.length > 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 text-lg">Payment Method</h3>
          
          <div className="space-y-3">
            {[
              { id: 'UPI', label: 'UPI (GPay, PhonePe, Paytm)', icon: '⚡' },
              { id: 'CARD', label: 'Credit / Debit Card', icon: '💳' },
              { id: 'NET', label: 'Net Banking', icon: '🏦' }
            ].map(m => (
              <button 
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${method === m.id ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'bg-white border-slate-100 hover:border-slate-200'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{m.icon}</span>
                  <span className="font-bold text-slate-700">{m.label}</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === m.id ? 'border-blue-600 bg-blue-600' : 'border-slate-200'}`}>
                  {method === m.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button 
            onClick={handlePay}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all"
          >
            Confirm & Pay ₹{data.totalFare}
          </button>
          <p className="text-center text-[10px] text-slate-400 mt-4 px-4 font-medium uppercase tracking-widest">
            By paying, you agree to the Terms of Service & Privacy Policy
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentScreen;
