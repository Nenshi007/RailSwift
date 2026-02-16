
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FOOD_ITEMS } from '../constants';
import { FoodItem, Booking } from '../types';
import { storage } from '../utils/storage';
import Layout from '../components/Layout';

const FoodOrderingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Meal' | 'Snack' | 'Beverage'>('All');
  const [cart, setCart] = useState<FoodItem[]>([]);
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [deliveryTime, setDeliveryTime] = useState('As soon as possible');

  useEffect(() => {
    // Check for active (upcoming) bookings for the current user
    const userBookings = storage.getCurrentUserBookings();
    const upcoming = userBookings.filter(b => b.status === 'Upcoming');
    setActiveBookings(upcoming);
  }, []);

  const filteredItems = FOOD_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: FoodItem) => {
    setCart(prev => [...prev, item]);
  };

  const handleProceedToPayment = () => {
    if (cart.length === 0) return;
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Pass data to a new FoodPaymentScreen
    navigate('/food-payment', { 
      state: { 
        cart, 
        totalPrice, 
        deliveryTime,
        booking: activeBookings[0] // Associate with their current trip
      } 
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  // If no active booking, show the block screen
  if (activeBookings.length === 0) {
    return (
      <Layout hideNav>
        <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-slate-50">
          <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
             <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-3 tracking-tight">Booking Required</h2>
          <p className="text-slate-500 font-medium leading-relaxed mb-10 px-4">
            You need an active booking to order food. Please book your ticket first to enjoy fresh meals on your journey!
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all"
          >
            Go to Bookings
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 text-slate-400 font-bold text-xs uppercase tracking-widest"
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white border-b border-slate-100 p-6 sticky top-0 z-40">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h2 className="font-bold text-slate-800 text-lg">Food on Train</h2>
        </div>
        
        <div className="flex items-center gap-3 bg-slate-100 p-3 rounded-2xl border border-slate-200 focus-within:ring-2 ring-blue-500/20">
          <svg className="text-slate-400" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input 
            type="text" 
            placeholder="Search food items..."
            className="bg-transparent w-full focus:outline-none text-black font-semibold text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
          {['All', 'Meal', 'Snack', 'Beverage'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-orange-500 text-white shadow-lg shadow-orange-100' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Delivery Info Associate with their trip */}
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-3xl flex items-center gap-3 mb-2">
           <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white">
             <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
           </div>
           <div>
             <p className="text-[10px] font-bold text-blue-800 uppercase tracking-widest">Delivering to Trip</p>
             <p className="text-xs font-bold text-blue-900">{activeBookings[0].train.name} (#{activeBookings[0].id})</p>
           </div>
        </div>

        {/* Time Selection */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Preferred Delivery Time</label>
           <select 
             className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 ring-blue-500/20"
             value={deliveryTime}
             onChange={(e) => setDeliveryTime(e.target.value)}
           >
             <option>As soon as possible</option>
             <option>At next station</option>
             <option>Lunch (1:00 PM - 2:00 PM)</option>
             <option>Dinner (7:30 PM - 8:30 PM)</option>
             <option>Morning Snacks (10:00 AM)</option>
             <option>Evening Snacks (5:00 PM)</option>
           </select>
        </div>

        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-50">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-800">{item.name}</h3>
                <p className="font-bold text-orange-600">₹{item.price}</p>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-1 line-clamp-2">{item.description}</p>
              <button 
                onClick={() => addToCart(item)}
                className="mt-2 text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg active:scale-95 transition-all"
              >
                + Add to Cart
              </button>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-20 flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <svg className="text-slate-300" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">No food items found</p>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-20 left-6 right-6 z-50 animate-in slide-in-from-bottom-10">
          <div className="bg-slate-900 text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between border border-white/10 backdrop-blur-md">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cart.length} Items Selected</p>
              <p className="text-lg font-bold">₹{totalPrice}</p>
            </div>
            <button 
              onClick={handleProceedToPayment}
              className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-bold active:scale-95 transition-all shadow-lg shadow-orange-900/40"
            >
              Checkout Now
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default FoodOrderingScreen;
