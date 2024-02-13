import React, { useEffect, useState } from 'react';
import { initialStockValues } from '../../utils/contants';

interface Stock {
  symbol: string;
  displayName: string;
  price: number;
  marginChange: number;
  backgroundColor: string;
  color: string;
}

export default function StocksBar() {
  const [liveStocks, setLiveStocks] = useState<Stock[]>(initialStockValues);

  useEffect(() => {
    const socket = new WebSocket(
      `wss://ws.finnhub.io?token=${import.meta.env.VITE_FINN_API_KEY}`
    );

    socket.onopen = () => {
      socket.send(
        JSON.stringify({ type: 'subscribe', symbol: 'IC MARKETS:1' })
      );
      socket.send(
        JSON.stringify({ type: 'subscribe', symbol: 'FOREX:401484392' })
      );
      socket.send(
        JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:BTCUSDT' })
      );
      socket.send(
        JSON.stringify({ type: 'subscribe', symbol: 'COINBASE:ETH-USD' })
      );
      socket.send(JSON.stringify({ type: 'subscribe', symbol: 'AMZN' }));
    };

    socket.addEventListener('message', function (event) {
      const jsonData = JSON.parse(event.data);

      if (jsonData.type === 'trade') {
        const stockData = jsonData.data[0];
        setLiveStocks((prev) =>
          prev.map((s) =>
            s.symbol === stockData.s
              ? { ...s, price: stockData.p, marginChange: stockData.v }
              : s
          )
        );
      }
    });
  }, []);

  const stockCards = () => {
    return liveStocks.map((stock) => (
      <div
        className="stock-card col"
        key={stock.symbol}
        style={{ backgroundColor: stock.backgroundColor, color: stock.color }}
      >
        <div className="d-flex justify-content-between">
          <h6>{stock.displayName} </h6>
          <span>{(stock.marginChange * 100).toPrecision(3)}%</span>{' '}
        </div>
        <div className="mt-4">
          <span className="text-muted">Current Value</span>
          <h5 className="">${stock.price}</h5>
        </div>
      </div>
    ));
  };

  return (
    <div className="mx-3 mt-4 ps-3 pt-3 stocks-bar">
      <div className="stocks-card-row row justify-content-between">
        {stockCards()}
      </div>
    </div>
  );
}
