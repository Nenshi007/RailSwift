
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Train, TrainClass, Passenger, SearchQuery } from '../types';
import Layout from '../components/Layout';

const PassengerDetailsScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { train, selectedClass, query } = location.state as { train: Train; selectedClass: TrainClass; query: SearchQuery };

  const [passengers, setPassengers] = useState<Passenger[]>(
    Array(query.passengers).fill(null).map(() => ({
      name: '',
      age: 25,
      gender: 'Male',
      idType: 'Aadhar Card',
      idNumber: '',
      seatPreference: 'Lower Berth'
    }))
  );

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const updatePassenger = (index: number, field: keyof Passenger, value: any) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengers(newPassengers);
  };

  const handleProceed = () => {
    if (!email || !phone || passengers.some(p => !p.name || !p.idNumber)) {
      alert('Please fill all passenger and contact details');
      return;
    }
    const bookingData = {
      train,
      selectedClass,
      passengers,
      email,
      phone,
      date: query.date,
      totalFare: selectedClass.price * query.passengers
    };
    navigate('/payment', { state: bookingData });
  };

  return (
    <Layout>
      <div className="bg-white border-b border-slate-100 p-6 sticky top-0 z-40 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="font-bold text-slate-800">Passenger Details</h2>
      </div>

      <div className="p-6 space-y-8">
        {passengers.map((p, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-blue-600 flex items-center gap-2">
              <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px]">P{idx+1}</span>
              Passenger Information
            </h3>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-black uppercase tracking-widest">Full Name</label>
              <input 
                className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 ring-blue-500/20 font-semibold text-black placeholder:text-slate-400"
                placeholder="Enter name"
                value={p.name}
                onChange={(e) => updatePassenger(idx, 'name', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest">Age</label>
                <input 
                  type="number"
                  className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 ring-blue-500/20 font-semibold text-black"
                  value={p.age}
                  onChange={(e) => updatePassenger(idx, 'age', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest">Gender</label>
                <select 
                  className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 ring-blue-500/20 font-semibold text-black"
                  value={p.gender}
                  onChange={(e) => updatePassenger(idx, 'gender', e.target.value)}
                >
                  <option className="text-black">Male</option>
                  <option className="text-black">Female</option>
                  <option className="text-black">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-black uppercase tracking-widest">ID Type</label>
              <select 
                className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 ring-blue-500/20 font-semibold text-black"
                value={p.idType}
                onChange={(e) => updatePassenger(idx, 'idType', e.target.value)}
              >
                <option className="text-black">Aadhar Card</option>
                <option className="text-black">Passport</option>
                <option className="text-black">Driving License</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-black uppercase tracking-widest">ID Number</label>
              <input 
                className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 ring-blue-500/20 font-semibold uppercase text-black placeholder:text-slate-400"
                placeholder="Enter ID number"
                value={p.idNumber}
                onChange={(e) => updatePassenger(idx, 'idNumber', e.target.value)}
              />
            </div>
          </div>
        ))}

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800">Contact Information</h3>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-black uppercase tracking-widest">Phone Number</label>
            <input 
              className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 ring-blue-500/20 font-semibold text-black placeholder:text-slate-400"
              placeholder="+91 00000 00000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-black uppercase tracking-widest">Email Address</label>
            <input 
              className="w-full bg-slate-50 p-3 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 ring-blue-500/20 font-semibold text-black placeholder:text-slate-400"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button 
          onClick={handleProceed}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all mb-10"
        >
          Proceed to Payment
        </button>
      </div>
    </Layout>
  );
};

export default PassengerDetailsScreen;
