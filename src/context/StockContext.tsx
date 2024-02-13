import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { initialStockValues } from '../utils/contants';
import { ActionType, stockReducer } from '../reducers/stockReducer';

export interface Stock {
  symbol: string;
  displayName: string;
  price: number;
  desiredPrice: number | null;
  marginChange: number;
  desiredMarginChange: number | null;
  backgroundColor: string;
  color: string;
}
interface StockContextProps {
  children: ReactNode;
}

const StockContext = createContext<
  { stocks: Stock[]; dispatch: React.Dispatch<ActionType> } | undefined
>(undefined);

const getInitialValues = () =>
  localStorage.getItem('stockData') !== null
    ? JSON.parse(localStorage.getItem('stockData')!)
    : initialStockValues;

export const StockProvider: React.FC<StockContextProps> = ({ children }) => {
  const [stocks, dispatch] = useReducer(stockReducer, getInitialValues());

  useEffect(() => {
    finnhubSocket(dispatch);
  }, []);

  return (
    <StockContext.Provider value={{ stocks, dispatch }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStockContext = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStockContext must be used within a StockProvider');
  }
  return context;
};

const finnhubSocket = (dispatch: React.Dispatch<ActionType>) => {
  const socket = new WebSocket(
    `wss://ws.finnhub.io?token=${import.meta.env.VITE_FINN_API_KEY}`
  );

  socket.onopen = () => {
    socket.send(JSON.stringify({ type: 'subscribe', symbol: 'IC MARKETS:1' }));
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
      dispatch({
        type: 'UPDATE_PRICE_MARGIN',
        symbol: stockData.s,
        price: stockData.p,
        marginChange: stockData.v,
      });
    }
  });
};
