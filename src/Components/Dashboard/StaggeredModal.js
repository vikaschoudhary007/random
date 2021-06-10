import React, { useContext, useEffect, useState } from 'react';
import arrowWhite from '../../images/arrow-white.svg';
import arrowBlue from '../../images/arrow-blue.svg';
import logo from '../../images/logo.svg';
import close from '../../images/close.svg';
import { Modal } from 'react-bootstrap';
import { UserContext } from '../../Context/UserContext';
import { firebaseinit } from '../../FirebaseAuth';
import Swal from 'sweetalert2';
import { staggeredUnstake } from '../../Functions/Web3';

const db = firebaseinit.database().ref('Binance');

export default function StaggeredModal({}) {
  const { userData, account, guessContract } = useContext(UserContext);

  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [numArray, setNumArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [choosedArray, setChoosedArray] = useState([]);
  const [checkboxId, setCheckboxId] = useState(new Map());
  const [currentPage, setCurrentPage] = useState(1);
  const [numberPerPage] = useState(101);
  const [unstakeInput, setUnstakeInput] = useState(0);

  useEffect(() => {
    const getDataFromFirebase = async () => {
      try {
        setLoading(true);
        var temp1, temp2;
        await db
          .child('Users')
          .child(account)
          .on('value', async (snapshot) => {
            temp1 = snapshot.val();

            if (temp1 === null) {
              setNumArray([]);
              await db
                .child('Users')
                .child(account)
                .update({ SelectedArray: [-1] })
                .then(async () => {
                  await db
                    .child('Users')
                    .child(account)
                    .on('value', async (snapshot) => {
                      temp2 = snapshot.val().SelectedArray;
                    });
                });
            }
            if (temp1 === undefined) {
              setNumArray([]);
              await db
                .child('Users')
                .child(account)
                .update({ SelectedArray: [-1] })
                .then(async () => {
                  await db
                    .child('Users')
                    .child(account)
                    .on('value', async (snapshot) => {
                      temp2 = snapshot.val().SelectedArray;
                    });
                });
            }

            await db
              .child('Users')
              .child(account)
              .on('value', async (snapshot) => {
                console.log(snapshot.val());
                temp2 = snapshot.val().SelectedArray;
              });

            console.log('temp2', temp2);
            setNumArray(temp2);
          });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getDataFromFirebase();
  }, []);

  useEffect(() => {
    const getDataFromFirebase = async () => {
      try {
        setLoading(true);
        var temp1, temp2;
        await db
          .child('Users')
          .child(account)
          .on('value', async (snapshot) => {
            temp1 = snapshot.val();

            if (temp1 === null) {
              await db
                .child('Users')
                .child(account)
                .update({ SelectedArray: [-1] })
                .then(async () => {
                  await db
                    .child('Users')
                    .child(account)
                    .on('value', async (snapshot) => {
                      console.log(snapshot.val());
                      temp2 = snapshot.val().SelectedArray;
                    });
                });
            }
            if (temp1 === undefined) {
              await db
                .child('Users')
                .child(account)
                .update({ SelectedArray: [-1] })
                .then(async () => {
                  await db
                    .child('Users')
                    .child(account)
                    .on('value', async (snapshot) => {
                      console.log(snapshot.val());
                      temp2 = snapshot.val().SelectedArray;
                    });
                });
            }

            await db
              .child('Users')
              .child(account)
              .on('value', async (snapshot) => {
                console.log(snapshot.val());
                temp2 = snapshot.val().SelectedArray;
              });

            console.log('temp2', temp2);
            setNumArray(temp2);
          });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getDataFromFirebase();
  }, [account]);

  const handleClose = () => {
    setShow(false);
    setError(false);
    setChoosedArray([]);
    setCheckboxId(new Map());
    setUnstakeInput(0);
  };
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    let temp = [];
    temp = choosedArray;

    const target = event.target;
    var id = target.id;
    var value = target.value;
    var checked = target.checked;

    if (target.checked) {
      {
        if (temp.length < 100) {
          temp.push(parseInt(value));
        } else {
          Swal.fire({
            title: 'Maximum 100 in one go',
            showConfirmButton: true,
            showCloseButton: false,
            confirmButtonText: 'Close',
            icon: 'warning',
            customclassName: {
              confirmButton: 'swal-button',
            },
            buttonsStyling: false,
          });
          setCheckboxId(new Map(checkboxId.set(parseInt(id), false)));
          console.log(checkboxId);
          return;
        }

        setCheckboxId(new Map(checkboxId.set(parseInt(id), checked)));
        console.log(checkboxId);
      }
    }

    if (!target.checked) {
      for (var i = 0; i < Object.keys(temp).length; i++) {
        if (temp[i] === parseInt(value)) {
          temp.splice(i, 1);
        }
      }
      setCheckboxId(new Map(checkboxId.set(parseInt(id), checked)));
      console.log(checkboxId);
    }

    setChoosedArray(temp);
    setUnstakeInput(temp.length * 100);
    console.log(choosedArray);
  };

  const handleSelect100 = (event) => {
    let temp = [];
    temp = choosedArray;
    const target = event.target;
    var checked = target.checked;

    if (target.checked) {
      if (numArray.length >= 100) {
        for (var i = 1; i <= 100; i++) {
          temp.push(numArray[i]);
          setCheckboxId(new Map(checkboxId.set(numArray[i], checked)));
        }
      } else {
        for (var i = 1; i < numArray.length; i++) {
          temp.push(numArray[i]);
          setCheckboxId(new Map(checkboxId.set(numArray[i], checked)));
        }
      }

      console.log('temp', temp);
      console.log(checkboxId);
    }

    if (!target.checked) {
      const tempLength = temp.length;
      for (var i = 0; i < tempLength; i++) {
        setCheckboxId(new Map(checkboxId.set(temp[i], false)));
      }

      for (var i = 0; i < tempLength; i++) {
        temp.pop();
      }

      console.log('temp', temp);
      console.log(checkboxId);
    }

    setChoosedArray(temp);
    setUnstakeInput(temp.length * 100);
    console.log('choosedArray', choosedArray);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    staggeredUnstake(guessContract, account, choosedArray);
  };

  const handleMaxButton = (e) => {
    e.preventDefault();

    if (numArray.length > 100) {
      setUnstakeInput(100 * 100);
    }
    if (numArray.length <= 100) {
      setUnstakeInput((numArray.length - 1) * 100);
    }
  };

  const indexOfLastNumber = currentPage * numberPerPage;
  const indexOfFirstNumber = indexOfLastNumber - numberPerPage;
  const currentNumber = numArray.slice(indexOfFirstNumber, indexOfLastNumber);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <a
        style={{ cursor: 'pointer' }}
        data-toggle="modal"
        className="link link2 align-items-start"
        onClick={handleShow}
      >
        <img src={arrowBlue} alt="arrow" className="mr-2" width="15px" />
        <span className="unstake">
          Staggered
          <br />
          Unstake
        </span>
      </a>
      <div
        className="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="EditModalLabel"
        aria-hidden="true"
      >
        <Modal
          show={show}
          onHide={handleClose}
          className="modal fade"
          centered
          size="lg"
        >
          <Modal.Header className="modal-header">
            <img src={logo} width="134px" alt="logo" />
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => handleClose()}
            >
              <img src={close} alt="close" />
            </button>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-body">
              <form>
                <div className="f24-600">
                  How much do you want to staggered unstake?
                </div>
                <div className="form-group my-4">
                  <label>
                    <span className="text-yellow text-uppercase f14-700 pr-2">
                      Unstake
                    </span>{' '}
                    <span className="f14-700">Maximum 100 in one go</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control withMaxbtn"
                      placeholder="0.00"
                      value={unstakeInput}
                      onChange={(e) => setUnstakeInput(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="btn btn-outline-primary max-btn mt-1"
                        onClick={(e) => handleMaxButton(e)}
                      >
                        MAX
                      </button>
                    </div>
                    <button
                      className="btn-gr ml-3"
                      type="submit"
                      onClick={(e) => handleSubmit(e)}
                    >
                      <img
                        src={arrowWhite}
                        alt="content"
                        className="mr-2"
                        width="15px"
                      />
                      <span>Unstake</span>
                    </button>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <label className="rd_checkbox">
                    <input type="checkbox" onChange={handleSelect100} />
                    <span className="f14-700">Select first 100</span>
                  </label>
                  <button type="button" className="link p-0 border-0 bg-white">
                    SELECT MENUALLY
                  </button>
                </div>
                <hr />
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    type="button"
                    className="link rotate-180 p-0 border-0 bg-white mr-3"
                    onClick={() => paginate(currentPage - 1)}
                  >
                    <img src={arrowBlue} alt="left" />
                  </button>
                  <button
                    type="button"
                    className="link p-0 border-0 bg-white"
                    onClick={() => paginate(currentPage + 1)}
                  >
                    <img src={arrowBlue} alt="right" />
                  </button>
                </div>
                <div className="scrollBox mb-0 selectBtns px-3">
                  {loading ? (
                    <div id="arrayNumber" className="inModal">
                      Loading...
                    </div>
                  ) : (
                    <>
                      {numArray.length === 0 ? (
                        <p>Please Choose Numbers first</p>
                      ) : (
                        <div id="arrayNumber" className="inModal">
                          {currentNumber.map((data, key) => {
                            if (data === -1) {
                              return;
                            } else {
                              return (
                                <label className="button">
                                  <input
                                    type="checkbox"
                                    name="number"
                                    id={data}
                                    value={data}
                                    key={key}
                                    onChange={handleChange}
                                    checked={checkboxId.get(data)}
                                  />
                                  <span>{data}</span>
                                </label>
                              );
                            }
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
                <hr />
                <div className="f14-700 pb-3">Numbers choose to unstake</div>
                <div className="f24-600 text-yellow">
                  {choosedArray.map((data, key) => {
                    if (key === choosedArray.length - 1) {
                      return <>{`${data} `}</>;
                    }
                    return <>{`${data}, `}</>;
                  })}
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
