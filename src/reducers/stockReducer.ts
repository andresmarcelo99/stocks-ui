import { Stock } from '../context/StockContext';

export type ActionType =
  | {
      type: 'UPDATE_PRICE_MARGIN';
      symbol: string;
      price: number;
      marginChange: number;
    }
  | {
      type: 'UPDATE_DESIRED_VALUES';
      symbol: string;
      desiredPrice: number | null;
      desiredMarginChange: number | null;
    };

export const stockReducer = (state: Stock[], action: ActionType): Stock[] => {
  switch (action.type) {
    case 'UPDATE_DESIRED_VALUES':
      return state.map((stock) =>
        stock.symbol === action.symbol
          ? {
              ...stock,
              desiredPrice: action.desiredPrice,
              desiredMarginChange: action.desiredMarginChange,
            }
          : stock
      );
    case 'UPDATE_PRICE_MARGIN':
      return state.map((stock) =>
        stock.symbol === action.symbol
          ? {
              ...stock,
              price: action.price,
              marginChange: action.marginChange,
            }
          : stock
      );
    default:
      return state;
  }
};
