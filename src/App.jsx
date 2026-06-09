import { BudgetProvider, useBudget } from './context/BudgetContext';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SetupScreen from './components/SetupScreen';

function AppContent() {
  const { budget } = useBudget();

  if (budget === null) {
    return <SetupScreen />;
  }

  return (
    <div className="app-container">
      <header className="app-header animate-fade-in">
        <div className="logo-container">
          <div className="logo-icon"></div>
          <h1>Budget Tracker</h1>
        </div>
        <p className="subtitle">Track your expenses, master your finances</p>
      </header>

      <main className="main-content">
        <Dashboard />
        
        <div className="content-grid">
          <div className="form-section">
            <ExpenseForm />
          </div>
          <div className="list-section">
            <ExpenseList />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BudgetProvider>
      <AppContent />
      <style>{`
        .app-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 100vh;
        }

        .app-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          border-radius: 8px;
          box-shadow: 0 0 20px var(--primary-glow);
        }

        .app-header h1 {
          font-size: 2.5rem;
          background: linear-gradient(to right, #fff, var(--primary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 1.1rem;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 2rem;
        }

        @media (max-width: 900px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          .app-container {
            padding: 1rem;
          }
        }
      `}</style>
    </BudgetProvider>
  );
}

export default App;
