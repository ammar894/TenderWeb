import React from 'react';
import { useTenders } from '../TenderContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { tenders, updateTenderStatus } = useTenders();

  const handleStatusChange = (id, status) => {
    updateTenderStatus(id, status);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {tenders.length === 0 ? (
        <p>No tenders created yet.</p>
      ) : (
        <ul className="tender-list">
          {tenders.map((tender) => (
            <li key={tender.id} className="tender-item">
              <div className="tender-info">
                <h3>{tender.projectName}</h3>
                <p><strong>Created On:</strong> {tender.date}</p>
                <p><strong>Deadline:</strong> {tender.deadline}</p>
                <p><strong>Description:</strong> {tender.description}</p>
              </div>
              <div className="tender-status">
                <p><strong>Status:</strong> {tender.status}</p>
                <button
                  onClick={() => handleStatusChange(tender.id, 'Approved')}
                  className="approve-button"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(tender.id, 'Rejected')}
                  className="reject-button"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
