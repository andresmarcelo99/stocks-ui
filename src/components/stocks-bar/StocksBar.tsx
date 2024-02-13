import { useEffect } from 'react';
import { Stock, useStockContext } from '../../context/StockContext';

export default function StocksBar() {
  const { stocks } = useStockContext();
  useEffect(() => {
    window.onbeforeunload = () => {
      localStorage.setItem('stockData', JSON.stringify(stocks));
    };
    return () => {};
  });

  const getStockValueColor = (stock: Stock) => {
    if (stock.desiredPrice != null) {
      return stock.desiredPrice < stock.price ? '#89d00a' : '#FF2F2F';
    }
    return undefined;
  };
  const getStockMarginColor = (stock: Stock) => {
    if (stock.desiredMarginChange != null) {
      return stock.desiredMarginChange < stock.marginChange
        ? '#89d00a'
        : '#FF2F2F';
    }
    return undefined;
  };

  const stockCards = () => {
    return stocks.map((stock) => {
      return (
        <div
          className="stock-card col"
          key={stock.symbol}
          style={{ backgroundColor: stock.backgroundColor, color: stock.color }}
        >
          <div className="d-flex justify-content-between">
            <h6>{stock.displayName} </h6>
            <span style={{ color: getStockMarginColor(stock) }}>
              {stock.marginChange.toPrecision(3)}%
            </span>{' '}
          </div>
          <div className="mt-4">
            <span className="text-muted">Current Value</span>
            <h5 style={{ color: getStockValueColor(stock) }}>${stock.price}</h5>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="mx-3 mt-4 ps-3 pt-3 stocks-bar">
      <div className="stocks-card-row row justify-content-between">
        {stockCards()}
      </div>
    </div>
  );
}
