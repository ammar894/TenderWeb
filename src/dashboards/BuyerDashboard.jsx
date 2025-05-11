// src/dashboards/BuyerDashboard.jsx
import React, { useState } from 'react';
import './BuyerDashboard.css';
import { useTenders } from '../TenderContext';

const BuyerDashboard = () => {
  const { tenders, createTender } = useTenders();
  const [form, setForm] = useState({
    date: '',
    projectName: '',
    description: '',
    deadline: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createTenderHandler = (e) => {
    e.preventDefault();
    const newTender = {
      ...form,
      id: Date.now(),
      bids: [],
      status: 'Waiting for Approval' // default status
    };
    createTender(newTender);
    setForm({ date: '', projectName: '', description: '', deadline: '' });
  };

  return (
    <div className="buyer-dashboard">
      <h1>Buyer Dashboard</h1>
      <form onSubmit={createTenderHandler}>
        <label>Date:
          <input
            placeholder='Enter Date'
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>
        
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
        
        <label>Deadline:
          <input
            placeholder='Enter Deadline'
            type="date"
            name="deadline"  
            value={form.deadline}  
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Create Tender</button>
      </form>

      <h2>Created Tenders:</h2>
      <ul>
        {tenders.map((tender) => (
          <li key={tender.id} className="tender-item">
            <div>
              <strong>{tender.projectName}</strong> ({tender.date})<br />
              {tender.description}<br />
              <strong>Deadline:</strong> {tender.deadline}
            </div>
            <div className={`status-label ${tender.status.toLowerCase().replace(/\s/g, '-')}`}>
              {tender.status}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuyerDashboard;
