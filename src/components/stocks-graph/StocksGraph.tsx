import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { stockIndex } from '../../utils/contants';

interface Props {
  stockName: string;
}

export default function StocksGraph({ stockName }: Props) {
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

  if (loading) {
    return (
      <div className="container-fluid align-items-center stocks-graph mx-3">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid align-items-center stocks-graph mx-3">
        <h4> {error.message}</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid align-items-center stocks-graph mx-3">
      <h4 className="mt-5">Displaying {stockName} Data</h4>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="linear" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
