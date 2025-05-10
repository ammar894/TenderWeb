// src/TenderContext.js
import React, { createContext, useState, useContext } from 'react';

const TenderContext = createContext();

export const TenderProvider = ({ children }) => {
  const [tenders, setTenders] = useState([]);

  const createTender = (newTender) => {
    setTenders((prevTenders) => [...prevTenders, newTender]);
  };

  // ✅ NEW FUNCTION to place a bid
  const placeBid = (tenderId, bid) => {
    setTenders((prevTenders) =>
      prevTenders.map((tender) =>
        tender.id === tenderId
          ? { ...tender, bids: [...(tender.bids || []), bid] }
          : tender
      )
    );
  };

  return (
    <TenderContext.Provider value={{ tenders, createTender, placeBid }}>
      {children}
    </TenderContext.Provider>
  );
};

export const useTenders = () => useContext(TenderContext);
