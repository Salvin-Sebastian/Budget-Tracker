import { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { Wallet, ArrowRight } from 'lucide-react';

export default function SetupScreen() {
  const { updateBudget } = useBudget();
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && Number(amount) > 0) {
      updateBudget(amount);
    }
  };

  return (
    <div className="setup-container animate-fade-in">
      <div className="setup-card glass">
        <div className="icon-wrapper primary">
          <Wallet size={48} />
        </div>
        <h2 className="setup-title">Welcome to Budget Tracker</h2>
        <p className="setup-subtitle">Let's get started by setting up your initial budget.</p>
        
        <form onSubmit={handleSubmit} className="setup-form">
          <div className="form-group">
            <label htmlFor="initial-budget">Total Budget Amount (₹)</label>
            <input
              type="number"
              id="initial-budget"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 2000.00"
              step="0.01"
              min="0.01"
              required
              autoFocus
            />
          </div>
          
          <button type="submit" className="submit-btn primary-btn">
            <span>Get Started</span>
            <ArrowRight size={20} />
          </button>
        </form>
      </div>

      <style>{`
        .setup-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          padding: 2rem;
        }
        .setup-card {
          max-width: 500px;
          width: 100%;
          padding: 3rem 2rem;
          border-radius: var(--radius-lg);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .icon-wrapper.primary {
          background-color: rgba(102, 252, 241, 0.1);
          color: var(--primary-color);
          width: 80px;
          height: 80px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
        .setup-title {
          font-size: 2rem;
          margin: 0;
        }
        .setup-subtitle {
          color: var(--text-muted);
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }
        .setup-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .setup-form .form-group {
          text-align: left;
        }
        .setup-form input {
          width: 100%;
          font-size: 1.5rem;
          padding: 1rem;
          text-align: center;
          background: rgba(0, 0, 0, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.1);
        }
        .setup-form input:focus {
          border-color: var(--primary-color);
        }
        .primary-btn {
          background: var(--primary-color);
          color: var(--bg-color);
          border: none;
          padding: 1rem 2rem;
          border-radius: var(--radius-full);
          font-size: 1.2rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: var(--transition);
          box-shadow: 0 4px 14px var(--primary-glow);
          width: 100%;
        }
        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px var(--primary-glow);
        }
      `}</style>
    </div>
  );
}
