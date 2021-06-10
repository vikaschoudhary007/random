import React, { useContext, useEffect, useState } from 'react';
import arrowBlue from '../../images/arrow-blue.svg';
import EditModal from './EditModal';
import ApproveModal from './ApproveModal';
import {
  guessRandomNumber,
  emitEveryWeekTokens,
  lastRandomNumber,
  chooseWinner,
  pushWinnerNumber,
  editWinnerNumber,
  approveForAdminFunction,
} from '../../Functions/Web3';
import { UserContext } from '../../Context/UserContext';
import { firebaseinit } from '../../FirebaseAuth';
import AddModal from './AddModal';

const database = firebaseinit.database().ref('Binance');
const db = firebaseinit.database().ref('Binance/Users');

export default function Main() {
  const {
    userData,
    tokenContract,
    account,
    guessContract,
    setCheckRandomNumber,
    checkRandomNumber,
  } = useContext(UserContext);
  const [approveValue, setApproveValue] = useState(0);
  const [error, setError] = useState(false);
  const [speed, setSpeed] = useState('');
  const [winnerValue, setWinnerValue] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [winnerNumbers, setWinnerNumbers] = useState({});

  // console.log(date);

  useEffect(() => {
    const getAllData = async () => {
      try {
        setLoading(true);

        await database.child('winnerNumbers').on('value', async (snapshot) => {
          setWinnerNumbers(snapshot.val());
        });

        console.log('result', winnerNumbers);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getAllData();
  }, []);

  useEffect(() => {
    const getAllData = async () => {
      try {
        setLoading(true);

        await database.child('winnerNumbers').on('value', async (snapshot) => {
          setWinnerNumbers(snapshot.val());
        });

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getAllData();
  }, [account]);

  const setNumberArray = () => {
    const Items = [];

    if (winnerNumbers == null) {
      return <p>No Winners Yet</p>;
    }

    Object.entries(winnerNumbers).map(([key, object]) => {
      Items.push(object);
    });

    return loading ? (
      <p>Loading...</p>
    ) : (
      Items.map((item) => {
        return (
          <tr>
            <td>{item.date}</td>
            <td>{`${item.number}`}</td>
            <td>
              <EditModal
                date={date}
                setDate={setDate}
                winnerValue={winnerValue}
                setWinnerValue={setWinnerValue}
                editWinnerNumber={editWinnerNumber}
                id={item.id}
                account={account}
              />
            </td>
          </tr>
        );
      })
    );
  };

  return (
    <>
      <main className="padding-top h-100vh position-relative">
        <div className="blur_bg"></div>
        <div className="container z-index2">
          <div className="row">
            <div className="col-lg-6">
              <div className="f13-700 text-yellow text-uppercase pb-2">
                Balance
              </div>
              <div className="row">
                <div className="col-md-6 pr-md-2">
                  <div className="box2">
                    <div className="f14-700">$RAND Balance in Wallet</div>
                    <div className="f24-600 text-yellow pb-xl-5 pb-3">
                      {parseFloat(
                        (userData.stochBalance / 10 ** 18).toString()
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 pl-md-2">
                  <div className="box2">
                    <div className="f14-700">Expected Rewards</div>
                    <div className="f24-600 text-yellow pb-xl-5 pb-3">
                      {parseFloat(
                        (
                          userData.calculateCurrentTokenAmount /
                          10 ** 18
                        ).toString()
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 pr-md-2">
                  <div className="box2">
                    <div className="f14-700">Approved</div>
                    <div className="f24-600 text-yellow pb-xl-5 pb-3">
                      {parseFloat(
                        (userData.approvedAmount / 10 ** 18).toString()
                      ).toFixed(2)}
                    </div>
                    <ApproveModal
                      approveValue={approveValue}
                      setApproveValue={setApproveValue}
                      account={account}
                      approveForAdminFunction={approveForAdminFunction}
                      userData={userData}
                      tokenContract={tokenContract}
                    />
                  </div>
                </div>
                <div className="col-md-6 pl-md-2">
                  <div className="box2">
                    <div className="f14-700">Time of Last Winner</div>
                    <div className="f24-600 text-yellow pb-xl-5 pb-3">
                      {account === undefined
                        ? '00/00/0000'
                        : new Date(
                            userData.lastWinsTime * 1000
                          ).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 pr-md-2">
                  <div className="box2">
                    <div className="f14-700">Emit Weekly Tokens</div>
                    <button
                      className="link"
                      style={{
                        background: 'white',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        emitEveryWeekTokens(tokenContract, account)
                      }
                    >
                      <img
                        src={arrowBlue}
                        alt="arrow"
                        className="mr-2"
                        width="15px"
                      />
                      <span>Emit</span>
                    </button>
                  </div>
                </div>
                <div className="col-md-6 pl-md-2">
                  <div className="box2">
                    <div className="f14-700">Random Number</div>
                    <div className="form-group mt-2">
                      <input
                        type="number"
                        className="form-control withMaxbtn"
                        placeholder="Enter Speed"
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
                      />
                    </div>
                    <button
                      className="link"
                      style={{
                        background: 'white',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        guessRandomNumber(
                          guessContract,
                          account,
                          speed,
                          setSpeed
                        )
                      }
                    >
                      <img
                        src={arrowBlue}
                        alt="arrow"
                        className="mr-2"
                        width="15px"
                      />
                      <span>Generate</span>
                    </button>
                  </div>
                </div>
                <div className="col-md-6 pr-md-2">
                  <div className="box2">
                    <div className="f14-700">Choose Winner</div>
                    <button
                      className="link"
                      style={{
                        background: 'white',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() => chooseWinner(guessContract, account)}
                    >
                      <img
                        src={arrowBlue}
                        alt="arrow"
                        className="mr-2"
                        width="15px"
                      />
                      <span>Choose</span>
                    </button>
                  </div>
                </div>
                <div className="col-md-6 pl-md-2">
                  <div className="box2">
                    <div className="f14-700">Check Random Number</div>
                    <div className="f24-600 text-yellow pb-xl-5 pb-3">
                      {parseInt(checkRandomNumber) > 10000 ||
                      checkRandomNumber === null
                        ? 0
                        : checkRandomNumber}
                    </div>
                    <button
                      className="link"
                      style={{
                        background: 'white',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        lastRandomNumber(
                          guessContract,
                          account,
                          setCheckRandomNumber
                        )
                      }
                    >
                      <img
                        src={arrowBlue}
                        alt="arrow"
                        className="mr-2"
                        width="15px"
                      />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 pl-lg-0">
              <div className="f13-700 text-yellow text-uppercase pb-2">
                Recent Winners
              </div>
              <div className="scrollBox">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Winning Number</th>
                      <th width="145px">
                        <AddModal
                          date={date}
                          setDate={setDate}
                          winnerValue={winnerValue}
                          setWinnerValue={setWinnerValue}
                          pushWinnerNumber={pushWinnerNumber}
                          account={account}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>{setNumberArray()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
