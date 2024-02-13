import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { CircularProgress } from '@mui/material';
import { useStockGraph } from '../../hooks/graphHook';

interface Props {
  stockName: string;
}

export default function StocksGraph({ stockName }: Props) {
  const { graphData, error, loading } = useStockGraph(stockName);

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
    <div className="container-fluid align-items-center stocks-graph mx-3 pt-4 pe-4">
      <h4 className="mt-3">Displaying {stockName} Data</h4>
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
