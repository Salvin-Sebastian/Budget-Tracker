import { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { PlusCircle } from 'lucide-react';

export default function ExpenseForm() {
  const { addExpense } = useBudget();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = [
    'Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;
    
    addExpense(formData);
    setFormData({
      title: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="expense-form-container glass animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <h3 className="form-title">Add New Expense</h3>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Grocery Shopping"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="amount">Amount (₹)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0.01"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          <PlusCircle size={20} />
          <span>Add Expense</span>
        </button>
      </form>

      <style>{`
        .expense-form-container {
          padding: 1.5rem;
          border-radius: var(--radius-md);
          margin-bottom: 2rem;
        }
        .form-title {
          margin-bottom: 1.5rem;
          font-size: 1.25rem;
        }
        .expense-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.25rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        label {
          font-size: 0.85rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        input, select {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          color: var(--text-main);
          font-size: 1rem;
          transition: var(--transition);
        }
        input:focus, select:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px var(--primary-glow);
        }
        /* Customizing select options style to ensure visibility */
        select option {
          background-color: var(--surface-color);
          color: var(--text-main);
        }
        
        /* Dark mode date picker overrides */
        ::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }

        .submit-btn {
          background: var(--primary-color);
          color: var(--bg-color);
          border: none;
          padding: 0.875rem 1.5rem;
          border-radius: var(--radius-sm);
          font-size: 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
          box-shadow: 0 4px 14px var(--primary-glow);
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px var(--primary-glow);
        }
      `}</style>
    </div>
  );
}
