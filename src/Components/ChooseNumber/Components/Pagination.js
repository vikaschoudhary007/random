import React from 'react';

export default function Pagination({
  array1,
  array2,
  paginate,
  handleRangeCheckbox,
  checked,
  rangeValue,
  setRangeValue,
  rangeKey,
  setRangeKey,
}) {
  return (
    <div>
      <div className="hdr px-3 border-bottom">
        <div className="row">
          <div className="col-xl-4 py-2 col-md-5 d-flex align-items-center">
            <span className="f13-700 pr-2">Select Range</span>
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {rangeValue}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {array1.map((data, key) => (
                  <a
                    className="dropdown-item"
                    key={key}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setRangeValue(data);
                      setRangeKey(key);
                    }}
                  >
                    {data}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="col-xl-8  py-2 col-md-7 text-right">
            {array2.map((data, key) => (
              <label className="btn-gray" key={key}>
                <input
                  type="radio"
                  id={`check${key}`}
                  name="subrange"
                  onClick={() => paginate(key + 1)}
                  onChange={() => handleRangeCheckbox(key)}
                  checked={checked === key}
                />
                <span>{data}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
