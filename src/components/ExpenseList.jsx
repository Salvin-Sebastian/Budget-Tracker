import { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList() {
  const { expenses } = useBudget();
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Other'];

  const filteredExpenses = filter === 'All' 
    ? expenses 
    : expenses.filter(exp => exp.category === filter);

  // Sort by date (newest first)
  const sortedExpenses = [...filteredExpenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="expense-list-container glass animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <div className="list-header">
        <h3 className="list-title">Recent Transactions</h3>
        
        <div className="filter-container">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="category-filter"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="expenses-list">
        {sortedExpenses.length > 0 ? (
          sortedExpenses.map(expense => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))
        ) : (
          <div className="empty-state">
            <p>No expenses found. Add some to get started!</p>
          </div>
        )}
      </div>

      <style>{`
        .expense-list-container {
          padding: 1.5rem;
          border-radius: var(--radius-md);
        }
        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .list-title {
          font-size: 1.25rem;
          margin: 0;
        }
        .category-filter {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          color: var(--text-main);
          font-size: 0.9rem;
          cursor: pointer;
        }
        .category-filter option {
          background-color: var(--surface-color);
        }
        .expenses-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-height: 500px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }
        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: var(--text-muted);
          background: rgba(0,0,0,0.1);
          border-radius: var(--radius-sm);
          border: 1px dashed rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  );
}
