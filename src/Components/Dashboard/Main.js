import React, { useContext, useEffect, useState } from 'react';
import arrowBlue from '../../images/arrow-blue.svg';
import arrowWhite from '../../images/arrow-white.svg';
import logo from '../../images/logo.svg';
import close from '../../images/close.svg';
import { UserContext } from '../../Context/UserContext';
import { firebaseinit } from '../../FirebaseAuth';
import {
  approveFunction,
  guessRandomNumber,
  stakeTokens,
  unstakeTokens,
} from '../../Functions/Web3';
import ApproveModal from './ApproveModal';
import StakeModal from './StakeModal';

const database = firebaseinit.database().ref('Binance');
const db = firebaseinit.database().ref('Binance/Users');

export default function Main() {
  const {
    userData,
    account,
    tokenContract,
    guessContract,
    checkRandomNumber,
    setCheckRandomNumber,
  } = useContext(UserContext);
  const [transactions, setTransactions] = useState({});
  const [winnerNumbers, setWinnerNumbers] = useState({});
  const [approveValue, setApproveValue] = useState(0);
  const [stakeValue, setStakeValue] = useState(0);
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        setLoading(true);

        await db
          .child(account)
          .child('Transactions')
          .on('value', async (snapshot) => {
            setTransactions(snapshot.val());
          });

        await database.child('winnerNumbers').on('value', async (snapshot) => {
          setWinnerNumbers(snapshot.val());
        });

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getAllTransactions();
  }, []);

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        setLoading(true);

        await db
          .child(account)
          .child('Transactions')
          .on('value', async (snapshot) => {
            setTransactions(snapshot.val());
          });

        await database.child('winnerNumbers').on('value', async (snapshot) => {
          setWinnerNumbers(snapshot.val());
        });

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getAllTransactions();
  }, [account]);

  const setArray = () => {
    const Items = [];

    if (transactions === null) {
      return <p>No Transactions Yet</p>;
    }

    Object.entries(transactions).map(([key, object]) => {
      Items.push(object);
    });

    Items.splice(-1, 1);

    return loading ? (
      <p>Loading...</p>
    ) : (
      Items.reverse().map((item) => {
        Items.forEach((item) => {
          if (item.choosenNumber === undefined) {
            item.choosenNumber = '-';
          }
        });

        return (
          <tr>
            <td>{item.date}</td>
            <td>{`${item.choosenNumber}`}</td>
            <td>{item.stakingAmount || item.approveAmount || '-'}</td>
            <td>{item.type || '-'}</td>
          </tr>
        );
      })
    );
  };

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
          </tr>
        );
      })
    );
  };

  return (
    <div>
      <main className="padding-top h-100vh position-relative">
        <div className="blur_bg"></div>
        <div className="container z-index2">
          <div className="row">
            <div className="col-xl-2 col-md-4 pr-md-0">
              <div className="f13-700 text-yellow text-uppercase pb-2">
                Balance
              </div>
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
                  approveFunction={approveFunction}
                  userData={userData}
                  tokenContract={tokenContract}
                />
              </div>
              <div className="box2">
                <div className="f14-700">Current Stake</div>
                <div className="f24-600 text-yellow pb-xl-5 pb-3">
                  {parseFloat(userData.checkStakingBalance.toString()).toFixed(
                    2
                  )}
                </div>
                <StakeModal
                  stakeValue={stakeValue}
                  setStakeValue={setStakeValue}
                  account={account}
                  stakeTokens={stakeTokens}
                  userData={userData}
                  guessContract={guessContract}
                />
              </div>
              <div className="box2">
                <div className="f14-700">Unstake</div>
                <div className="f24-600 text-yellow pb-xl-5 pb-3"></div>
                <a
                  className="link"
                  style={{
                    background: 'white',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => unstakeTokens(guessContract, account)}
                >
                  <img
                    src={arrowBlue}
                    alt="arrow"
                    className="mr-2"
                    width="15px"
                  />
                  <span className="unstake">Unstake</span>
                </a>
              </div>
              <div className="box2">
                <div className="f14-700">Running $RAND in Pool</div>
                <div className="f24-600 text-yellow pb-xl-5 pb-3">
                  {userData.totalTokenStakedInContract}
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-8">
              <div className="f13-700 text-yellow text-uppercase pb-2">
                Transaction History
              </div>
              <div className="scrollBox">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Chosen Numbers</th>
                      <th>Staked/Approved</th>
                      <th>Transaction Type</th>
                    </tr>
                  </thead>
                  <tbody>{setArray()}</tbody>
                </table>
              </div>
            </div>
            <div className="col-xl-4 pl-xl-0 col-lg-12 col-md-12">
              <div className="f13-700 text-yellow text-uppercase pb-2">
                Last Winning Numbers
              </div>
              <div className="scrollBox">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Winning Number</th>
                    </tr>
                  </thead>
                  <tbody>{setNumberArray()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
