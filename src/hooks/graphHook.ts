import { useState, useEffect } from 'react';
import { stockIndex } from '../utils/contants';

export const useStockGraph = (stockName: string) => {
  const [graphData, setGraphData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const apiKey = import.meta.env.VITE_FINN_API_KEY;
        const stockSymbol = stockIndex(stockName);
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${apiKey}`
        );
        const data = await response.json();

        if (!data) {
          throw new Error('error fetching the data');
        }

        setGraphData([
          { name: 'Current Price', value: data.c },
          { name: 'High Price', value: data.h },
          { name: 'Low Price', value: data.l },
          { name: 'Previous Close', value: data.pc },
        ]);

        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
        setLoading(false);
      }
    };
    if (stockName !== '') {
      fetchData();
    } else {
      setError(new Error('No stock selected'));
      setLoading(false);
    }
  }, [stockName]);
  return { graphData, loading, error };
};
