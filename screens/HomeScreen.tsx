
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CITY_LIST, OFFERS } from '../constants';
import { SearchQuery } from '../types';
import Layout from '../components/Layout';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [passengers, setPassengers] = useState(1);
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);

  const handleSearch = () => {
    if (!from || !to) {
      alert('Please enter origin and destination');
      return;
    }
    const query: SearchQuery = { from, to, date, passengers };
    navigate('/results', { state: query });
  };

  const filterCities = (val: string) => {
    if (!val || val.length < 1) return [];
    const searchVal = val.toLowerCase().trim();
    return CITY_LIST.filter(city => 
      city.toLowerCase().includes(searchVal)
    ).slice(0, 6);
  };

  return (
    <Layout>
      <div className="bg-blue-600 px-6 pt-8 pb-20 rounded-b-[40px] text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight">RailSwift</h1>
          <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center cursor-pointer" onClick={() => navigate('/preference', { state: { title: 'Notifications' } })}>
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          </div>
        </div>
        <p className="text-blue-100 font-medium">Where would you like to go?</p>
      </div>

      <div className="px-6 -mt-14">
        <div className="bg-white rounded-3xl shadow-xl p-6 space-y-4">
          <div className="relative">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">From</label>
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 focus-within:ring-2 ring-blue-500/20 transition-all">
              <svg className="text-blue-600" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <input 
                type="text" 
                placeholder="Origin City" 
                className="bg-transparent w-full focus:outline-none text-black font-semibold placeholder:text-slate-400"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  setFromSuggestions(filterCities(e.target.value));
                }}
              />
            </div>
            {fromSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-100 shadow-2xl rounded-xl z-50 overflow-hidden">
                {fromSuggestions.map(city => (
                  <button 
                    key={city} 
                    className="w-full text-left p-3 hover:bg-blue-50 transition-colors border-b border-slate-50 last:border-0 font-bold text-black"
                    onClick={() => {
                      setFrom(city);
                      setFromSuggestions([]);
                    }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">To</label>
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 focus-within:ring-2 ring-blue-500/20 transition-all">
              <svg className="text-orange-500" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <input 
                type="text" 
                placeholder="Destination City" 
                className="bg-transparent w-full focus:outline-none text-black font-semibold placeholder:text-slate-400"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  setToSuggestions(filterCities(e.target.value));
                }}
              />
            </div>
            {toSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-100 shadow-2xl rounded-xl z-50 overflow-hidden">
                {toSuggestions.map(city => (
                  <button 
                    key={city} 
                    className="w-full text-left p-3 hover:bg-blue-50 border-b border-slate-50 last:border-0 font-bold text-black"
                    onClick={() => {
                      setTo(city);
                      setToSuggestions([]);
                    }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Date</label>
              <input 
                type="date" 
                className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 text-black font-semibold focus:outline-none focus:ring-2 ring-blue-500/20"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">No. of Person</label>
              <select 
                className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 text-black font-semibold focus:outline-none focus:ring-2 ring-blue-500/20"
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
              >
                {[1,2,3,4,5,6].map(n => <option key={n} value={n} className="text-black">{n}</option>)}
              </select>
            </div>
          </div>

          <button 
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            Search Trains
          </button>
        </div>
      </div>

      {/* Services Section - Only Order Food remaining */}
      <div className="px-6 mt-8">
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest mb-4 ml-1">Quick Services</h3>
        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => navigate('/food')}
            className="flex items-center gap-4 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-100 group-hover:scale-110 transition-transform">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Premium Service</p>
              <p className="font-bold text-slate-800 text-lg">Order Food on Train</p>
              <p className="text-slate-400 text-xs mt-0.5">Fresh meals delivered to your seat</p>
            </div>
            <div className="ml-auto text-slate-200">
               <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          </button>
        </div>
      </div>

      <div className="mt-10 px-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800 text-lg">Deals for You</h3>
          <button 
            onClick={() => navigate('/offers')}
            className="text-blue-600 text-xs font-bold uppercase tracking-widest hover:underline"
          >
            View All
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar custom-scrollbar">
          {OFFERS.map(offer => (
            <div 
              key={offer.id} 
              className="min-w-[280px] h-32 relative rounded-2xl overflow-hidden shadow-md cursor-pointer active:scale-95 transition-all"
              onClick={() => navigate('/offers')}
            >
              <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent p-4 flex flex-col justify-center">
                <p className="text-blue-400 font-bold text-xs uppercase">{offer.code}</p>
                <h4 className="text-white font-bold text-xl">{offer.discount}</h4>
                <p className="text-white/80 text-sm">{offer.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomeScreen;
