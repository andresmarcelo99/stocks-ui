import StocksBar from './components/stocks-bar/StocksBar';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/navbar/Navbar';
import { StockProvider } from './context/StockContext';

import './App.css';

function App() {
  return (
    <StockProvider>
      <div className="main">
        <Navbar />
        <StocksBar />
        <Dashboard />
      </div>
    </StockProvider>
  );
}

export default App;
