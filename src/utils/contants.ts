export const initialStockValues = [
  {
    symbol: 'BINANCE:BTCUSDT',
    displayName: 'BTC/USDT',
    price: 0,
    marginChange: 0,
    backgroundColor: '#B79BFF',
    color: '#FFFFFF',
  },
  {
    symbol: 'IC MARKETS:1',
    displayName: 'EUR/USD',
    price: 0,
    marginChange: 0,
    backgroundColor: '#A6F7E2',
    color: '#2C2C2C',
  },
  {
    symbol: 'COINBASE:ETH-USD',
    displayName: 'ETH/USD',
    price: 0,
    marginChange: 0,
    backgroundColor: '#FFE5A5',
    color: '#2C2C2C',
  },
  {
    symbol: 'FOREX:401484392',
    displayName: 'GBP/USD',
    price: 0,
    marginChange: 0,
    backgroundColor: '#C7FFA5',
    color: '#2C2C2C',
  },
  {
    symbol: 'AMZN',
    displayName: 'Amazon',
    price: 0,
    marginChange: 0,
    backgroundColor: '#F8A5FF',
    color: '#2C2C2C',
  },
];

interface Map {
  [key: string]: string | undefined;
}

export const STOCK_MAP: Map = {
  'BTC/USDT': 'BINANCE:BTCUSDT',
  'EUR/USD': 'IC MARKETS:1',
  'ETH/USD': 'COINBASE:ETH-USD',
  'GBP/USD': 'FOREX:401484392',
  Amazon: 'AMZN',
};

export const stockIndex = (str: string) => STOCK_MAP[str] || str;
