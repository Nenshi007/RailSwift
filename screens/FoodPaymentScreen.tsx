
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FoodItem, Booking } from '../types';
import Layout from '../components/Layout';

const FoodPaymentScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as { 
    cart: FoodItem[]; 
    totalPrice: number; 
    deliveryTime: string;
    booking: Booking;
  };

  const [method, setMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Payment Successful! Your order will be delivered at: ${data.deliveryTime}`);
      navigate('/');
    }, 1500);
  };

  if (!data) return null;

  return (
    <Layout hideNav>
      <div className="bg-white border-b border-slate-100 p-6 sticky top-0 z-40 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h2 className="font-bold text-slate-800">Food Checkout</h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Order Summary */}
        <div className="bg-orange-500 text-white rounded-[32px] p-6 shadow-xl shadow-orange-100 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6 border-b border-orange-400/50 pb-4">
              <div>
                <h3 className="font-bold text-lg">Order Summary</h3>
                <p className="text-[10px] text-orange-100 font-bold uppercase tracking-widest">Delivery: {data.deliveryTime}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">₹{data.totalPrice}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {data.cart.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs font-medium">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Decorative background circle */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* Association Trip */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 flex items-center gap-4">
           <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7"/></svg>
           </div>
           <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assigned to Trip</p>
              <p className="text-sm font-bold text-slate-700">{data.booking.train.name}</p>
           </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 text-lg">Payment Method</h3>
          
          <div className="space-y-3">
            {[
              { id: 'UPI', label: 'UPI (GPay, PhonePe, Paytm)', icon: '⚡' },
              { id: 'CARD', label: 'Credit / Debit Card', icon: '💳' },
              { id: 'COD', label: 'Cash on Delivery', icon: '💵' }
            ].map(m => (
              <button 
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${method === m.id ? 'bg-orange-50 border-orange-500 ring-1 ring-orange-500' : 'bg-white border-slate-100 hover:border-slate-200'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{m.icon}</span>
                  <span className="font-bold text-slate-700">{m.label}</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === m.id ? 'border-orange-600 bg-orange-600' : 'border-slate-200'}`}>
                  {method === m.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button 
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-100 active:scale-95 transition-all flex items-center justify-center"
          >
            {isProcessing ? (
               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              `Pay ₹${data.totalPrice} & Confirm`
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default FoodPaymentScreen;
