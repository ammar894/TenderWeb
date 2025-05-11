import React, { createContext, useState, useContext } from 'react';

const TenderContext = createContext();

export const TenderProvider = ({ children }) => {
  const [tenders, setTenders] = useState([]);

  // ✅ Buyer - Create a new tender
  const createTender = (newTender) => {
    setTenders((prevTenders) => [...prevTenders, newTender]);
  };

  // ✅ Bidder - Place a bid on a tender
  const placeBid = (tenderId, bid) => {
    setTenders((prevTenders) =>
      prevTenders.map((tender) =>
        tender.id === tenderId
          ? { ...tender, bids: [...(tender.bids || []), bid] }
          : tender
      )
    );
  };

  // ✅ Admin - Update the status of a tender (Approved/Rejected)
  const updateTenderStatus = (tenderId, status) => {
    setTenders((prevTenders) =>
      prevTenders.map((tender) =>
        tender.id === tenderId ? { ...tender, status } : tender
      )
    );
  };

  // ✅ Evaluator - Score a specific bid in a tender
  const scoreBid = (tenderId, bidIndex, score) => {
    setTenders((prevTenders) =>
      prevTenders.map((tender) => {
        if (tender.id !== tenderId) return tender;

        const updatedBids = tender.bids.map((bid, index) =>
          index === bidIndex ? { ...bid, score } : bid
        );

        return { ...tender, bids: updatedBids };
      })
    );
  };

  return (
    <TenderContext.Provider
      value={{
        tenders,
        createTender,
        placeBid,
        updateTenderStatus,
        scoreBid,
      }}
    >
      {children}
    </TenderContext.Provider>
  );
};

export const useTenders = () => useContext(TenderContext);
