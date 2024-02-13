import React, { useEffect, useState } from 'react';
import { initialStockValues } from '../../utils/contants';

interface Props {
  stock: string;
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function StocksForm({ stock, handleSelect }: Props) {
  const [email, setEmail] = useState('');
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

  return (
    <div className="container-fluid stocks-alert mx-3">
      <form className="my-5 mx-5">
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
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          ></input>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input "
            id="exampleCheck1"
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
