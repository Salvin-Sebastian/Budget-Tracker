import { useBudget } from '../context/BudgetContext';
import { Trash2, ShoppingBag, Utensils, Car, Zap, Activity, Heart, Circle } from 'lucide-react';

export default function ExpenseItem({ expense }) {
  const { deleteExpense } = useBudget();

  // Pick an icon and color based on category
  const getCategoryDetails = (category) => {
    switch (category) {
      case 'Food': return { icon: <Utensils size={18} />, color: '#ff9800' };
      case 'Transport': return { icon: <Car size={18} />, color: '#03a9f4' };
      case 'Utilities': return { icon: <Zap size={18} />, color: '#ffeb3b' };
      case 'Entertainment': return { icon: <Activity size={18} />, color: '#e91e63' };
      case 'Shopping': return { icon: <ShoppingBag size={18} />, color: '#9c27b0' };
      case 'Health': return { icon: <Heart size={18} />, color: '#f44336' };
      default: return { icon: <Circle size={18} />, color: '#9e9e9e' };
    }
  };

  const { icon, color } = getCategoryDetails(expense.category);

  return (
    <div className="expense-item">
      <div className="item-left">
        <div className="category-icon" style={{ backgroundColor: `${color}20`, color: color }}>
          {icon}
        </div>
        <div className="item-details">
          <h4>{expense.title}</h4>
          <span className="item-date">{new Date(expense.date).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="item-right">
        <span className="item-amount">${expense.amount.toFixed(2)}</span>
        <button 
          onClick={() => deleteExpense(expense.id)} 
          className="delete-btn"
          aria-label="Delete expense"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <style>{`
        .expense-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-sm);
          transition: var(--transition);
          border: 1px solid transparent;
        }
        .expense-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateX(4px);
        }
        .item-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .category-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .item-details h4 {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 500;
        }
        .item-date {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .item-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .item-amount {
          font-weight: 600;
          font-size: 1.1rem;
          font-family: 'Outfit', sans-serif;
        }
        .delete-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.2s ease;
        }
        .expense-item:hover .delete-btn {
          opacity: 1;
          transform: translateX(0);
        }
        .delete-btn:hover {
          color: var(--danger-color);
          background: rgba(255, 76, 76, 0.1);
        }
        
        @media (max-width: 480px) {
          .delete-btn {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
