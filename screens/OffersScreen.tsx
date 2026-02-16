
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OFFERS } from '../constants';
import Layout from '../components/Layout';

const OffersScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="bg-white border-b border-slate-100 p-6 sticky top-0 z-40 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="font-bold text-slate-800 text-lg">Special Offers</h2>
      </div>

      <div className="p-6 space-y-6">
        <p className="text-slate-500 text-sm font-medium">Save more on your premium travels with these exclusive RailSwift deals.</p>
        
        {OFFERS.map(offer => (
          <div key={offer.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group">
            <div className="h-40 relative">
              <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                New
              </div>
            </div>
            <div className="p-6 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-800 text-xl">{offer.discount}</h4>
                <p className="text-slate-500 text-sm">{offer.title}</p>
              </div>
              <button 
                onClick={() => alert(`Code ${offer.code} copied to clipboard!`)}
                className="bg-slate-50 border border-dashed border-blue-300 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-50 transition-colors"
              >
                {offer.code}
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default OffersScreen;
