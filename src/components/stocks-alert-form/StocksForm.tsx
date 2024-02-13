import React, { useState } from 'react';
import { initialStockValues, stockIndex } from '../../utils/contants';
import { useStockContext } from '../../context/StockContext';

interface Props {
  stock: string;
  setStock: React.Dispatch<React.SetStateAction<string>>;
}

export default function StocksForm({ stock, setStock }: Props) {
  const { dispatch } = useStockContext();
  const [price, setPrice] = useState(0);
  const [margin, setMargin] = useState(0);
  const [shouldNotify, setShouldNotify] = useState(false);

  const selectItems = () =>
    initialStockValues.map((s) => (
      <option value={s.displayName} key={s.symbol}>
        {s.displayName}
      </option>
    ));

  const isBtnDisabled = () => {
    if (stock === '') return true;
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStock(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPrice(0);
    setMargin(0);
    dispatch({
      type: 'UPDATE_DESIRED_VALUES',
      desiredMarginChange: margin,
      desiredPrice: price,
      symbol: stockIndex(stock),
    });

    setShouldNotify(false);
  };

  return (
    <div className="container-fluid stocks-alert mx-3">
      <form className="my-5 mx-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="form-floating">
            <select
              className="form-select"
              id="floatingSelect"
              aria-label="Floating label select"
              onChange={handleSelect}
              value={stock}
            >
              <option hidden={true}>None</option>
              {selectItems()}
            </select>
            <label htmlFor="floatingSelect">Choose an Stock</label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="priceInput" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="priceInput"
            aria-describedby="priceHelp"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="marginInput" className="form-label">
            Margin
          </label>
          <input
            type="number"
            className="form-control"
            id="marginInput"
            aria-describedby="marginHelp"
            value={margin}
            onChange={(e) => setMargin(+e.target.value)}
          ></input>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input "
            id="exampleCheck1"
            checked={shouldNotify}
            onChange={() => {
              setShouldNotify((prev) => !prev);
            }}
          ></input>
          <label className="form-check-label" htmlFor="exampleCheck1">
            Notify me
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary primary-color"
          disabled={isBtnDisabled()}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
