import StocksBar from './components/stocks-bar/StocksBar';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/navbar/Navbar';

import './App.css';

function App() {
  return (
    <div className="main">
      <Navbar />
      <StocksBar />
      <Dashboard />
    </div>
  );
}

export default App;
