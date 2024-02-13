import React, { useState } from 'react';
import StocksForm from '../stocks-alert-form/StocksForm';
import StocksGraph from '../stocks-graph/StocksGraph';

export default function Dashboard() {
  const [stock, setStock] = useState('');

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStock(event.target.value);
  };

  return (
    <div className="dashboard d-flex justify-content-between py-5">
      <StocksForm handleSelect={handleSelect} stock={stock} />
      <StocksGraph stockName={stock} />
    </div>
  );
}
