import React, { useState } from 'react';
import arrowWhite from '../../images/arrow-white.svg';
import arrowBlue from '../../images/arrow-blue.svg';
import edit from '../../images/edit.png';
import logo from '../../images/logo.svg';
import close from '../../images/close.svg';
import { Modal } from 'react-bootstrap';

export default function StakeModal({
  stakeValue,
  setStakeValue,
  account,
  stakeTokens,
  userData,
  guessContract,
}) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);

  const handleClose = () => {
    setShow(false);
    setError(false);
    setStakeValue(0);
  };
  const handleShow = () => setShow(true);
  return (
    <div>
      <a
        style={{ cursor: 'pointer' }}
        data-toggle="modal"
        className="link"
        onClick={handleShow}
      >
        <img src={arrowBlue} alt="arrow" className="mr-2" width="15px" />
        <span className="stake">Stake</span>
      </a>
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
              <div className="f24-600">
                How much RAND would you like to stake?
              </div>
              <div className="form-group my-4">
                <label className="text-yellow text-uppercase f14-700">
                  Stake
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control withMaxbtn"
                    placeholder="0.00"
                    value={stakeValue}
                    onChange={(e) => setStakeValue(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-outline-primary max-btn"
                      onClick={() =>
                        setStakeValue(userData.approvedAmount / 10 ** 18)
                      }
                    >
                      MAX
                    </button>
                  </div>
                </div>
                <p
                  style={
                    !error
                      ? { display: 'none' }
                      : { color: 'red', fontSize: 12 }
                  }
                >
                  Amount should be grater then 0
                </p>
                <p
                  style={
                    !error2
                      ? { display: 'none' }
                      : { color: 'red', fontSize: 12 }
                  }
                >
                  Can't exceed approved amount
                </p>
              </div>
              <button
                className="btn-gr"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  const maxAmount = userData.approvedAmount / 10 ** 18;
                  stakeTokens(
                    guessContract,
                    stakeValue,
                    account,
                    setError,
                    setError2,
                    setStakeValue,
                    maxAmount,
                    setShow
                  );
                }}
              >
                <img
                  src={arrowWhite}
                  alt="content"
                  className="mr-2"
                  width="15px"
                />
                <span>Stake</span>
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
