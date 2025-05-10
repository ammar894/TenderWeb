// src/dashboards/BidderDashboard.jsx
import React, { useState } from 'react';
import { useTenders } from '../TenderContext';
import './BidderDashboard.css';

const BidderDashboard = () => {
  const { tenders, placeBid } = useTenders();
  const [bidAmounts, setBidAmounts] = useState({});

  const handleChange = (e, tenderId) => {
    setBidAmounts({ ...bidAmounts, [tenderId]: e.target.value });
  };

  const handlePlaceBid = (tenderId) => {
    const amount = bidAmounts[tenderId];
    if (!amount) return alert('Enter a bid amount.');

    const bid = {
      bidderName: 'Bidder1',
      amount: parseFloat(amount),
      time: new Date().toLocaleString()
    };

    placeBid(tenderId, bid);
    setBidAmounts({ ...bidAmounts, [tenderId]: '' });
  };

  return (
    <div className="bidder-dashboard">
      <h1>Bidder Dashboard</h1>
      <ul>
        {tenders.map((tender) => (
          <li key={tender.id} className="bid-card">
            <h3>{tender.projectName}</h3>
            <p><strong>Date:</strong> {tender.date}</p>
            <p><strong>Description:</strong> {tender.description}</p>

            <div>
              <input
                type="number"
                placeholder="Your bid amount"
                value={bidAmounts[tender.id] || ''}
                onChange={(e) => handleChange(e, tender.id)}
                className="bid-input"
              />
              <button
                onClick={() => handlePlaceBid(tender.id)}
                className="bid-button"
              >
                Place Bid
              </button>
            </div>

            {tender.bids && tender.bids.length > 0 && (
              <div className="bid-history">
                <strong>Bids:</strong>
                <ul>
                  {tender.bids.map((bid, idx) => (
                    <li key={idx}>
                      💰 {bid.amount} by {bid.bidderName} on {bid.time}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BidderDashboard;
