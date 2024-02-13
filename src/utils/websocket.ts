import { ActionType } from '../reducers/stockReducer';

export const finnhubSocket = (dispatch: React.Dispatch<ActionType>) => {
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
