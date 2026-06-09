import { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { Wallet, TrendingDown, DollarSign, Edit2, Check } from 'lucide-react';

export default function Dashboard() {
  const { budget, totalExpenses, remainingBudget, updateBudget } = useBudget();
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  const handleSaveBudget = () => {
    if (newBudget && newBudget > 0) {
      updateBudget(newBudget);
      setIsEditing(false);
    }
  };

  const percentageSpent = budget > 0 ? Math.min((totalExpenses / budget) * 100, 100) : 100;
  
  // Choose color based on remaining percentage
  let statusColor = 'var(--success-color)';
  if (percentageSpent > 80) statusColor = 'var(--danger-color)';
  else if (percentageSpent > 50) statusColor = 'var(--warning-color)';

  return (
    <div className="dashboard-container">
      <div className="cards-grid">
        {/* Total Budget Card */}
        <div className="card glass animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="card-header">
            <div>
              <p className="card-label">Total Budget</p>
              {isEditing ? (
                <div className="edit-budget-form">
                  <input
                    type="number"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="budget-input"
                    autoFocus
                  />
                  <button onClick={handleSaveBudget} className="icon-btn success">
                    <Check size={18} />
                  </button>
                </div>
              ) : (
                <div className="budget-display">
                  <h2 className="card-value">${parseFloat(budget).toFixed(2)}</h2>
                  <button onClick={() => setIsEditing(true)} className="icon-btn edit">
                    <Edit2 size={16} />
                  </button>
                </div>
              )}
            </div>
            <div className="icon-wrapper primary">
              <Wallet size={24} />
            </div>
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className="card glass animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="card-header">
            <div>
              <p className="card-label">Total Expenses</p>
              <h2 className="card-value">${totalExpenses.toFixed(2)}</h2>
            </div>
            <div className="icon-wrapper danger">
              <TrendingDown size={24} />
            </div>
          </div>
        </div>

        {/* Remaining Budget Card */}
        <div className="card glass animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="card-header">
            <div>
              <p className="card-label">Remaining Balance</p>
              <h2 className="card-value" style={{ color: statusColor }}>
                ${remainingBudget.toFixed(2)}
              </h2>
            </div>
            <div className="icon-wrapper" style={{ backgroundColor: `${statusColor}20`, color: statusColor }}>
              <DollarSign size={24} />
            </div>
          </div>
          
          <div className="progress-container">
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ 
                  width: `${percentageSpent}%`,
                  backgroundColor: statusColor
                }} 
              />
            </div>
            <p className="progress-text">{percentageSpent.toFixed(1)}% spent</p>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-container {
          margin-bottom: 2rem;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .card {
          padding: 1.5rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .card-label {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .card-value {
          font-size: 2rem;
          margin: 0;
        }
        .icon-wrapper {
          padding: 0.75rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-wrapper.primary {
          background-color: rgba(102, 252, 241, 0.1);
          color: var(--primary-color);
        }
        .icon-wrapper.danger {
          background-color: rgba(255, 76, 76, 0.1);
          color: var(--danger-color);
        }
        .budget-display {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .icon-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 0.25rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-main);
        }
        .icon-btn.success {
          color: var(--success-color);
        }
        .icon-btn.success:hover {
          background: rgba(76, 175, 80, 0.1);
        }
        .edit-budget-form {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .budget-input {
          background: rgba(0,0,0,0.2);
          border: 1px solid var(--primary-color);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 1.5rem;
          width: 120px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
        }
        .progress-container {
          margin-top: 0.5rem;
        }
        .progress-bar-bg {
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 0.5s ease;
        }
        .progress-text {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.5rem;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
