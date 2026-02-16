
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNav = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 max-w-md mx-auto relative shadow-2xl border-x border-slate-100 overflow-hidden">
      {/* Scrollable Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 custom-scrollbar">
        {children}
      </main>

      {/* Bottom Navigation */}
      {!hideNav && (
        <nav className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-100 flex items-center justify-around px-4 z-50">
          <button 
            onClick={() => navigate('/')}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive('/') ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span className="text-[10px] font-semibold uppercase tracking-wider">Home</span>
          </button>
          <button 
            onClick={() => navigate('/bookings')}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive('/bookings') ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10h10V2z"/><path d="M22 2h-10v10h10V2z"/><path d="M12 12H2v10h10V12z"/><path d="M22 12h-10v10h10V12z"/></svg>
            <span className="text-[10px] font-semibold uppercase tracking-wider">Bookings</span>
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${isActive('/profile') ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4-4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span className="text-[10px] font-semibold uppercase tracking-wider">Profile</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default Layout;
