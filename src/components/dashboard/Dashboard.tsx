import { useState } from 'react';
import StocksForm from '../stocks-alert-form/StocksForm';
import StocksGraph from '../stocks-graph/StocksGraph';
import StocksLinePlot from '../stocks-line-plot/StocksLinePlot';

export default function Dashboard() {
  const [stock, setStock] = useState('');

  return (
    <>
      <div className="dashboard d-flex justify-content-between py-5">
        <StocksForm setStock={setStock} stock={stock} />
        <StocksGraph stockName={stock} />
      </div>
      <div className="container  stocks-line-container">
        <StocksLinePlot />
      </div>
    </>
  );
}
