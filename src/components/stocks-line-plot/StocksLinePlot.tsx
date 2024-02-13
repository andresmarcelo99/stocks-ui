import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts';
import { useStockContext } from '../../context/StockContext';

export default function StocksLinePlot() {
  const { stocks } = useStockContext();

  return (
    <div className="stock-line-plot ">
      <h2>Stocks Value Chart</h2>
      <LineChart width={800} height={400} data={stocks}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="displayName" />
        <YAxis />
        <Tooltip />
        {stocks.map((entry, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey="price"
            stroke={entry.color}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </div>
  );
}
