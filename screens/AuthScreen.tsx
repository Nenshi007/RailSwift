
import React, { useState } from 'react';
import { storage } from '../utils/storage';

interface AuthScreenProps {
  onLogin: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (isLogin) {
        // Login Logic
        const user = storage.loginUser(email, password);
        if (user) {
          onLogin();
        } else {
          setError('Invalid email or password. Please register if you are new.');
        }
      } else {
        // Register Logic
        const success = storage.registerUser({ name, email, password, avatar: null });
        if (success) {
          setIsLogin(true);
          setError('Registration successful! Please log in.');
        } else {
          setError('Email already exists. Please log in.');
        }
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 max-w-md mx-auto relative shadow-2xl border-x border-slate-100 overflow-hidden font-['Plus_Jakarta_Sans']">
      {/* Brand Header */}
      <div className="bg-blue-600 h-[35vh] flex flex-col items-center justify-center text-white px-8 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="currentColor" />
             <circle cx="20" cy="20" r="10" fill="white" />
             <circle cx="80" cy="50" r="15" fill="white" />
           </svg>
        </div>
        
        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-4 shadow-xl">
           <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 17h20"/><path d="M10 12h4"/><path d="m11 7 1 1 1-1"/><path d="M12 22V17"/><path d="M12 7V2"/><path d="M22 17v-4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4"/></svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tighter">RailSwift</h1>
        <p className="text-blue-100 mt-2 font-medium opacity-80 text-sm">Your premium journey starts here</p>
      </div>

      {/* Auth Card */}
      <div className="px-6 -mt-12 flex-1 relative z-10">
        <div className="bg-white rounded-[40px] shadow-2xl pt-12 pb-8 px-8 h-full border border-slate-50">
          <div className="flex gap-8 mb-6">
            <button 
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`text-lg font-bold transition-all relative ${isLogin ? 'text-black' : 'text-slate-300'}`}
            >
              Log In
              {isLogin && <div className="absolute -bottom-2 left-0 w-6 h-1 bg-blue-600 rounded-full"></div>}
            </button>
            <button 
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`text-lg font-bold transition-all relative ${!isLogin ? 'text-black' : 'text-slate-300'}`}
            >
              Register
              {!isLogin && <div className="absolute -bottom-2 left-0 w-6 h-1 bg-blue-600 rounded-full"></div>}
            </button>
          </div>

          {error && (
            <div className={`p-4 rounded-2xl mb-6 text-xs font-bold ${error.includes('successful') ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 ring-blue-500/20 font-semibold text-black placeholder:text-slate-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-black uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email"
                required
                placeholder="you@example.com"
                className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 ring-blue-500/20 font-semibold text-black placeholder:text-slate-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-black uppercase tracking-widest">Password</label>
                {isLogin && <button type="button" className="text-[10px] font-bold text-blue-600 uppercase">Forgot?</button>}
              </div>
              <input 
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 ring-blue-500/20 font-semibold text-black placeholder:text-slate-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-all mt-4 flex items-center justify-center disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>

            <div className="pt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400"><span className="px-2 bg-white">Or continue with</span></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button type="button" className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all font-bold text-sm text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all font-bold text-sm text-slate-700">
                  <svg width="20" height="20" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="p-8 text-center">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          By continuing, you agree to our <span className="text-blue-600">Terms of Service</span>
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
