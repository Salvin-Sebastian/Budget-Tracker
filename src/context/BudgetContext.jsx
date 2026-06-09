import { createContext, useState, useEffect, useContext } from 'react';

const BudgetContext = createContext();

export function useBudget() {
  return useContext(BudgetContext);
}

export function BudgetProvider({ children }) {
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('budgetTracker_budget');
    return saved ? JSON.parse(saved) : null; // No default budget initially
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('budgetTracker_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('budgetTracker_budget', JSON.stringify(budget));
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('budgetTracker_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ...expense, amount: parseFloat(expense.amount) }
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const updateBudget = (amount) => {
    setBudget(parseFloat(amount));
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingBudget = budget - totalExpenses;

  const value = {
    budget,
    expenses,
    totalExpenses,
    remainingBudget,
    addExpense,
    deleteExpense,
    updateBudget
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
}
