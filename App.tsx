
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import TrainResultsScreen from './screens/TrainResultsScreen';
import PassengerDetailsScreen from './screens/PassengerDetailsScreen';
import PaymentScreen from './screens/PaymentScreen';
import SuccessScreen from './screens/SuccessScreen';
import MyBookingsScreen from './screens/MyBookingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthScreen from './screens/AuthScreen';
import OffersScreen from './screens/OffersScreen';
import PreferenceDetailScreen from './screens/PreferenceDetailScreen';
import FoodOrderingScreen from './screens/FoodOrderingScreen';
import FoodPaymentScreen from './screens/FoodPaymentScreen';
import { storage } from './utils/storage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('railswift_auth') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    storage.logout();
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="*" element={<AuthScreen onLogin={handleLogin} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/results" element={<TrainResultsScreen />} />
          <Route path="/passenger-details" element={<PassengerDetailsScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/success" element={<SuccessScreen />} />
          <Route path="/bookings" element={<MyBookingsScreen />} />
          <Route path="/profile" element={<ProfileScreen onLogout={handleLogout} />} />
          <Route path="/offers" element={<OffersScreen />} />
          <Route path="/preference" element={<PreferenceDetailScreen />} />
          <Route path="/food" element={<FoodOrderingScreen />} />
          <Route path="/food-payment" element={<FoodPaymentScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
