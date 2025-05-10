import React from 'react';
import { createRoot } from "react-dom/client";

import './index.css';
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import Home from './Home'; 
import LogIn from './LogIn';
import AdminDashboard from './dashboards/AdminDashboard';
import BidderDashboard from './dashboards/BidderDashboard';
import BuyerDashboard from './dashboards/BuyerDashboard';
import EvaluatorDashboard from './dashboards/EvaluatorDashboard';
import { TenderProvider } from './TenderContext';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/bidder-dashboard" element={<BidderDashboard />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        <Route path="/evaluator-dashboard" element={<EvaluatorDashboard />} />
      </Routes>
    </Router>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TenderProvider>
      <App />
    </TenderProvider>
  </React.StrictMode>
);