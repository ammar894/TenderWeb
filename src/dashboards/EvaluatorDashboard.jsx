import React, { useState } from 'react';
import { useTenders } from '../TenderContext';
import './EvaluatorDashboard.css';

const EvaluatorDashboard = () => {
  const { tenders, scoreBid } = useTenders();
  const [scores, setScores] = useState({});

  const handleScoreChange = (tenderId, bidIndex, value) => {
    setScores((prev) => ({
      ...prev,
      [`${tenderId}-${bidIndex}`]: value,
    }));
  };

  const handleSubmitScore = (tenderId, bidIndex) => {
    const key = `${tenderId}-${bidIndex}`;
    const score = parseFloat(scores[key]);

    if (!score || score < 1 || score > 10) {
      alert('Please enter a valid score between 1 and 10.');
      return;
    }

    scoreBid(tenderId, bidIndex, score);
    setScores((prev) => ({ ...prev, [key]: '' }));
  };

  return (
    <div className="evaluator-dashboard">
      <h1>Evaluator Dashboard</h1>
      <div className="dashboard-container">
        {/* LEFT SECTION: Unscored Bids */}
        <div className="left-section">
          {tenders.filter(t => t.status === 'Approved').map((tender) => (
            <div key={tender.id} className="tender-card">
              <h2>{tender.projectName}</h2>
              <p>{tender.description}</p>

              <h3>Unscored Bids</h3>
              <ul>
                {(tender.bids || [])
                  .map((bid, index) => ({ ...bid, index }))
                  .filter((bid) => bid.score === undefined)
                  .map((bid) => (
                    <li key={bid.index} className="bid-row">
                      💰 {bid.amount}$ by {bid.bidderName} — {bid.time}
                      <input
                        type="number"
                        min="1"
                        max="10"
                        placeholder="1-10"
                        value={scores[`${tender.id}-${bid.index}`] || ''}
                        onChange={(e) =>
                          handleScoreChange(tender.id, bid.index, e.target.value)
                        }
                      />
                      <button onClick={() => handleSubmitScore(tender.id, bid.index)}>
                        Submit Score
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        {/* RIGHT SECTION: Scored Rankings */}
        <div className="right-section">
          <h2>🏆 Bid Rankings</h2>
          {tenders.filter(t => t.status === 'Approved').map((tender) => {
            const scoredBids = (tender.bids || [])
              .filter((bid) => bid.score !== undefined)
              .sort((a, b) => b.score - a.score);

            return (
              <div key={tender.id} className="ranking-box">
                <h3>{tender.projectName}</h3>
                <ol>
                  {scoredBids.map((bid, idx) => (
                    <li key={idx}>
                      {bid.bidderName} — 💰 {bid.amount} — 🏅 Score: {bid.score}
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EvaluatorDashboard;
