
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { storage, User } from '../utils/storage';

interface ProfileScreenProps {
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(storage.getCurrentUser());
  }, []);

  const handlePreferenceClick = (title: string) => {
    navigate('/preference', { state: { title } });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updatedUser = storage.updateCurrentUser({ avatar: base64String });
        if (updatedUser) setUser(updatedUser);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="bg-blue-600 px-6 pt-12 pb-20 rounded-b-[40px] text-white flex flex-col items-center">
        <div className="relative group">
          <div 
            className="w-24 h-24 rounded-full border-4 border-white/20 shadow-xl overflow-hidden bg-white flex items-center justify-center cursor-pointer active:scale-95 transition-all"
            onClick={() => fileInputRef.current?.click()}
          >
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-16 h-16 text-slate-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full border-2 border-blue-600 shadow-lg active:scale-90 transition-all"
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handlePhotoUpload} 
            className="hidden" 
            accept="image/*"
          />
        </div>
        <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
        <p className="text-blue-200 text-sm font-medium">{user.email}</p>
      </div>

      <div className="px-6 -mt-10 space-y-4">
        <div className="bg-white rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
               <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
             </div>
             <div className="flex-1">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account Type</p>
               <p className="font-bold text-slate-800">Standard Member</p>
             </div>
             <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded-lg text-[10px] font-bold uppercase">Active</div>
          </div>

          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center">
               <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
             </div>
             <div className="flex-1">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contact Email</p>
               <p className="font-bold text-slate-800">{user.email}</p>
             </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest ml-4">Preferences</h3>
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm divide-y divide-slate-50">
             {['Notifications', 'Language', 'Privacy Settings', 'Help Center'].map(item => (
               <button 
                key={item} 
                onClick={() => handlePreferenceClick(item)}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors active:bg-slate-100"
               >
                 <span className="font-bold text-slate-700">{item}</span>
                 <svg className="text-slate-300" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
               </button>
             ))}
          </div>
        </div>

        <button 
          onClick={onLogout}
          className="w-full text-red-500 font-bold py-6 hover:bg-red-50 rounded-2xl transition-all uppercase text-xs tracking-widest mt-4"
        >
          Logout Session
        </button>
      </div>
    </Layout>
  );
};

export default ProfileScreen;
