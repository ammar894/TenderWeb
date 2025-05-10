// src/dashboards/BuyerDashboard.jsx
import React, { useState } from 'react';
import './BuyerDashboard.css';
import { useTenders } from '../TenderContext';

const BuyerDashboard = () => {
  const { tenders, createTender } = useTenders();
  const [form, setForm] = useState({
    date: '',
    projectName: '',
    description: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createTenderHandler = (e) => {
    e.preventDefault();
    const newTender = { ...form, id: Date.now(), bids: [] };
    createTender(newTender);
    setForm({ date: '', projectName: '', description: '' });
  };

  return (
    <div className="buyer-dashboard">
      <h1>Buyer Dashboard</h1>
      <form onSubmit={createTenderHandler}>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="projectName"
          placeholder="Project Name"
          value={form.projectName}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Tender</button>
      </form>

      <h2>Created Tenders:</h2>
      <ul>
        {tenders.map((tender) => (
          <li key={tender.id}>
            <strong>{tender.projectName}</strong> ({tender.date}) - {tender.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuyerDashboard;
