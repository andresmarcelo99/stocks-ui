import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { initialStockValues } from '../utils/contants';
import { ActionType, stockReducer } from '../reducers/stockReducer';
import { finnhubSocket } from '../utils/websocket';

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
