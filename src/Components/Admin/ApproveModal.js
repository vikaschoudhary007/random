import React, { useState } from 'react';
import arrowWhite from '../../images/arrow-white.svg';
import arrowBlue from '../../images/arrow-blue.svg';
import edit from '../../images/edit.png';
import logo from '../../images/logo.svg';
import close from '../../images/close.svg';
import { Modal } from 'react-bootstrap';

export default function EditModal({
  approveValue,
  setApproveValue,
  account,
  approveForAdminFunction,
  userData,
  tokenContract,
}) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setShow(false);
    setError(false);
    setApproveValue(0);
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
        <span className="approve">APPROVE</span>
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
              <div class="f24-600">How much do you want to approve?</div>
              <div class="form-group my-4">
                <label class="text-yellow text-uppercase f14-700">
                  Approve
                </label>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control withMaxbtn"
                    placeholder="0.00"
                    value={approveValue}
                    onChange={(e) => setApproveValue(e.target.value)}
                  />
                  <div class="input-group-append">
                    <button
                      type="button"
                      class="btn btn-outline-primary max-btn"
                      onClick={() =>
                        setApproveValue(userData.stochBalance / 10 ** 18)
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
              </div>
              <button
                class="btn-gr"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  approveForAdminFunction(
                    tokenContract,
                    approveValue,
                    account,
                    setError,
                    setApproveValue,
                    setShow
                  );
                }}
              >
                <img src={arrowWhite} alt="content" class="mr-2" width="15px" />
                <span>Approve</span>
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
