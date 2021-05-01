import React, { useContext, useEffect, useState } from 'react';
import Guess from './Components/Guess';
import Pagination from './Components/Pagination';
import { firebaseinit } from '../../FirebaseAuth';
import arrowWhite from '../../images/arrow-white.svg';
import { UserContext } from '../../Context/UserContext';
import { chooseNumbers } from '../../Functions/Web3';

const db = firebaseinit.database().ref('Binance');

export default function Main() {
  const { userData, account, guessContract } = useContext(UserContext);

  const array1 = [
    '001-1000',
    '1001-2000',
    '2001 - 3000',
    '3001 - 4000',
    '4001 - 5000',
    '5001 - 6000',
    '6001 - 7000',
    '7001 - 8000',
    '8001 - 9000',
    '9001 - 10000',
  ];

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [guessPerPage] = useState(200);
  const [selectedGuesses, setSelectedGuesses] = useState([]);
  const [checkboxId, setCheckboxId] = useState(new Map());
  const [choosedArray, setChoosedArray] = useState(new Map());
  const [rangeKey, setRangeKey] = useState(0);
  const [rangeValue, setRangeValue] = useState('001-1000');
  const [array2, setArray2] = useState([
    '001-200',
    '201-400',
    '401 - 600',
    '601 - 800',
    '801 - 1000',
  ]);

  useEffect(() => {
    function range(start, end) {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    }
    var result = range(1, 1000);

    setGuesses(result);

    const getDataFromFirebase = async () => {
      setLoading(true);
      await db.on('value', async (snapshot) => {
        const temp = snapshot.val();

        if (temp === null) {
          await db.child('ChoosedArray').update([-1]);
        }
        if (temp === undefined) {
          await db.child('ChoosedArray').update([-1]);
        }

        await db.on('value', async (snapshot) => {
          const data = snapshot.val().ChoosedArray;

          if (data === undefined) {
            await db.child('ChoosedArray').update([-1]);
          }

          await db.on('value', async (snapshot) => {
            const data = snapshot.val().ChoosedArray;
            for (var i = 0; i < data.length; i++) {
              choosedArray.set(parseInt(data[i]), true);
            }
          });
        });
        setLoading(false);
      });
    };

    getDataFromFirebase();
  }, []);

  useEffect(() => {
    setArray2([
      `${rangeKey * 1000 + 1}-${rangeKey * 1000 + 200}`,
      `${rangeKey * 1000 + 201}-${rangeKey * 1000 + 400}`,
      `${rangeKey * 1000 + 401}-${rangeKey * 1000 + 600}`,
      `${rangeKey * 1000 + 601}-${rangeKey * 1000 + 800}`,
      `${rangeKey * 1000 + 801}-${rangeKey * 1000 + 1000}`,
    ]);
    function range(start, end) {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    }
    var result = range(rangeKey * 1000 + 1, rangeKey * 1000 + 1000);

    setGuesses(result);
  }, [rangeKey]);

  // get Current Guess
  const indexOfLastGuess = currentPage * guessPerPage;
  const indexOfFirstGuess = indexOfLastGuess - guessPerPage;
  const currentGuess = guesses.slice(indexOfFirstGuess, indexOfLastGuess);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRangeCheckbox = (key) => {
    setChecked(key);
  };

  return (
    <div>
      <main className="padding-top h-100vh position-relative">
        <div className="blur_bg"></div>
        <div className="container z-index2">
          <div className="row">
            <div className="col-lg-9 col-md-8 pr-md-0">
              <div className="f13-700 text-yellow text-uppercase pb-2">
                Transaction History
              </div>

              <div className="scrollBox2">
                <Pagination
                  array1={array1}
                  array2={array2}
                  paginate={paginate}
                  handleRangeCheckbox={handleRangeCheckbox}
                  checked={checked}
                  rangeValue={rangeValue}
                  setRangeValue={setRangeValue}
                  rangeKey={rangeKey}
                  setRangeKey={setRangeKey}
                />
                <Guess
                  guesses={currentGuess}
                  setSelectedGuesses={setSelectedGuesses}
                  selectedGuesses={selectedGuesses}
                  checkboxId={checkboxId}
                  setCheckboxId={setCheckboxId}
                  choosedArray={choosedArray}
                  setChoosedArray={setChoosedArray}
                  loading={loading}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4 pr-">
              <div className="f13-700 text-yellow text-uppercase pb-2">
                Numbers
              </div>
              <div className="box2 h-370">
                <div className="f14-700">Chosen Numbers</div>
                <div className="f24-600 text-yellow pb-xl-5 pb-3">
                  {selectedGuesses.map((data, key) => {
                    if (key === selectedGuesses.length - 1) {
                      return <>{`${data} `}</>;
                    }
                    return <>{`${data}, `}</>;
                  })}
                </div>
                <span>
                  {selectedGuesses.length === 0 ? (
                    <></>
                  ) : (
                    <button
                      className="btn-gr"
                      onClick={(e) => {
                        e.preventDefault();
                        chooseNumbers(
                          guessContract,
                          account,
                          selectedGuesses,
                          setSelectedGuesses,
                          setCheckboxId
                        );
                      }}
                    >
                      <img
                        src={arrowWhite}
                        alt="content"
                        className="mr-2"
                        width="15px"
                      />
                      <span>Submit</span>
                    </button>
                  )}
                </span>
              </div>
              <div className="box2 h-auto">
                <div className="f14-700">Available Balance to Choose</div>
                <div className="f24-600 text-yellow ">
                  {userData.remainingNumbersToSet}
                </div>
              </div>
              <div className="box2 h-auto">
                <div className="f14-700">Total Limit</div>
                <div className="f24-600 text-yellow ">
                  {userData.maxNumberUserCanSelect}
                </div>
              </div>
              <div className="box2 h-auto">
                <div className="f14-700">Running $RAND in Pool</div>
                <div className="f24-600 text-yellow ">
                  {userData.totalTokenStakedInContract}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
