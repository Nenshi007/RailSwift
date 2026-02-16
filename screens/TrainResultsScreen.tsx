
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TRAINS } from '../constants';
import { Train, SearchQuery, TrainClass } from '../types';
import Layout from '../components/Layout';

const TrainResultsScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state as SearchQuery;
  const [loading, setLoading] = useState(true);
  const [filteredTrains, setFilteredTrains] = useState<Train[]>([]);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fromSearch = query.from.toLowerCase().trim();
      const toSearch = query.to.toLowerCase().trim();

      // Flexible Search Logic: Case-insensitive + Partial Match (Contains)
      let results = TRAINS.filter(t => 
        t.from.toLowerCase().includes(fromSearch) && 
        t.to.toLowerCase().includes(toSearch)
      );

      // STEP 3 Fallback Logic: If no exact/partial route found, show trains from the origin city
      if (results.length === 0) {
        results = TRAINS.filter(t => t.from.toLowerCase().includes(fromSearch));
        setIsFallback(true);
      } else {
        setIsFallback(false);
      }

      setFilteredTrains(results);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [query]);

  const handleBook = (train: Train, selectedClass: TrainClass) => {
    navigate('/passenger-details', { state: { train, selectedClass, query } });
  };

  return (
    <Layout>
      <div className="bg-white border-b border-slate-100 p-6 sticky top-0 z-40">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-black flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              {query.from} 
              <svg className="text-slate-400 shrink-0" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              {query.to}
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{query.date} • {query.passengers} {query.passengers > 1 ? 'Persons' : 'Person'}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Searching Premium Trains...</p>
          </div>
        ) : filteredTrains.length > 0 ? (
          <div className="space-y-6">
            {isFallback && (
              <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl mb-2">
                <p className="text-orange-700 text-xs font-bold leading-relaxed">
                  No direct trains found for this route. Showing departures from <span className="underline">{query.from}</span>.
                </p>
              </div>
            )}
            
            {filteredTrains.map(train => (
              <div key={train.id} className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight">{train.name}</h3>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Train #{train.number}</p>
                  </div>
                  <div className="bg-slate-50 text-slate-500 px-3 py-1 rounded-full text-[10px] font-bold border border-slate-100">
                    MTWTFSS
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="text-center">
                    <p className="text-xl font-bold text-slate-800">{train.departure}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase truncate max-w-[80px]">{train.from}</p>
                  </div>
                  <div className="flex-1 px-4 flex flex-col items-center">
                    <p className="text-[10px] font-bold text-slate-400 mb-1">{train.duration}</p>
                    <div className="w-full h-[1px] bg-slate-200 relative">
                       <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full border border-slate-200 bg-white"></div>
                       <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-slate-800">{train.arrival}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase truncate max-w-[80px]">{train.to}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {train.classes.map(cls => (
                    <button 
                      key={cls.type}
                      onClick={() => handleBook(train, cls)}
                      className="text-left p-4 rounded-[20px] border border-slate-100 bg-white hover:border-blue-300 hover:bg-blue-50/30 transition-all active:scale-95 group relative overflow-hidden"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-slate-800">{cls.type}</span>
                        <span className="text-blue-600 font-bold">₹{cls.price}</span>
                      </div>
                      <p className="text-[9px] text-green-600 font-bold uppercase tracking-tighter">Available: {cls.available}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[40px] border border-slate-100 shadow-sm px-8">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
               <svg className="text-slate-300" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">No Routes Found</h3>
            <p className="text-slate-400 text-sm font-medium px-4">We couldn't find any trains matching your search. Try checking origin/destination spellings.</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-8 bg-blue-600 text-white w-full py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all"
            >
              Update Search
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TrainResultsScreen;
