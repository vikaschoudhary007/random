import React, { useState } from 'react';
import arrowWhite from '../../images/arrow-white.svg';
import logo from '../../images/logo.svg';
import close from '../../images/close.svg';
import { Modal } from 'react-bootstrap';

export default function AddModal({
  date,
  setDate,
  winnerValue,
  setWinnerValue,
  pushWinnerNumber,
  account,
}) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setShow(false);
    setWinnerValue('');
    setDate('');
    setError(false);
  };
  const handleShow = () => setShow(true);
  return (
    <div>
      <button
        className="btn-gr btn-sm"
        type="button"
        data-toggle="modal"
        onClick={handleShow}
      >
        <img src={arrowWhite} alt="content" className="mr-2" width="15px" />
        <span>Add New</span>
      </button>
      <div
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="EditModalLabel"
        aria-hidden="true"
      >
        <Modal
          show={show}
          onHide={handleClose}
          class="modal fade"
          centered
          size="sm"
        >
          <Modal.Header className="modal-header">
            <img src={logo} width="134px" alt="logo" />
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => handleClose()}
            >
              <img src={close} alt="close" />
            </button>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div class="f24-600">Add Winning Number</div>
              <div class="form-group mt-4">
                <label class="text-yellow text-uppercase f14-700">Date</label>
                <div class="input-group ">
                  <input
                    type="date"
                    class="form-control"
                    placeholder="Select Date"
                    data-date-format="dd-mm-yyyy"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <div class="input-group-append"></div>
                </div>
              </div>
              <div class="form-group mb-4">
                <label class="text-yellow text-uppercase f14-700">
                  Winning Number
                </label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Enter Winning Number"
                  value={winnerValue}
                  onChange={(e) => setWinnerValue(e.target.value)}
                />
              </div>
              <p
                style={
                  !error ? { display: 'none' } : { color: 'red', fontSize: 12 }
                }
              >
                All fields are required
              </p>
              <button
                class="btn-gr"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  pushWinnerNumber(
                    winnerValue,
                    date,
                    setWinnerValue,
                    setDate,
                    account,
                    setError,
                    setShow
                  );
                }}
              >
                <img src={arrowWhite} alt="content" class="mr-2" width="15px" />
                <span>Submit</span>
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
