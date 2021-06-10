import Web3 from 'web3';
import TokenABI from '../Contract/Token.json';
import GuessABI from '../Contract/GuessContract.json';
import { firebaseinit } from '../FirebaseAuth';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import error from '../images/error.png';
import success from '../images/success.png';
import loader2 from '../images/loader2.png';

const db = firebaseinit.database().ref('Binance');
const userdb = firebaseinit.database().ref('Binance/Users');

const TokenContractAddress = '0xA87405088e0F7F0Af0E2E57C1a095B6453271Ce4';
const GuessContractAddress = '0xF1DB13CCd885D257863F60Cedf83FfAD8E86B8c0';
const adminPublicKey = '0x435a4787Af28293934161F5e22f4F7368B10D2Af';

/////////// CHECK IF BROWSER IS ENABLED WITH Web3 //////////////

const loadWeb3 = async () => {
  try {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      // window.alert('Non-Ethereum browser detected. you should consider trying MetaMask')
    }
  } catch (err) {
    console.log('error', err);
  }
};

////////// GET METAMASK ACCOUNT AND CREATE CONTRACT INSTANCES ////////////////

const loadBlockChainData = async (
  setAccount,
  setNetworkId,
  setTokenContract,
  setConnectTag,
  setGuessContract
) => {
  try {
    const web3 = window.web3;
    // Load Account
    const accounts = await web3.eth.getAccounts();

    await setAccount(accounts[0]);
    localStorage.account = accounts[0] || '';

    setConnectTag(
      localStorage.account.slice(0, 4) +
        '...' +
        localStorage.account.slice(38, 42)
    );

    // listen the Network ID
    const networkId = await web3.eth.net.getId();
    await setNetworkId(networkId);
    localStorage.networkId = networkId;
    const tokenContract = await new web3.eth.Contract(
      TokenABI,
      TokenContractAddress
    );

    const guessContract = await new web3.eth.Contract(
      GuessABI,
      GuessContractAddress
    );
    await setTokenContract(tokenContract);

    await setGuessContract(guessContract);
  } catch (err) {
    console.log(err);
  }
};

////////// CHECK IF USER SELECTED A DIFFERENT ACCOUNT IN METAMASK ///////////////

const listenAccountChange = async (setAccount, setConnectTag) => {
  try {
    const web3 = window.web3;
    window.ethereum.on('accountsChanged', async () => {
      const accounts = await web3.eth.getAccounts();
      await setAccount(accounts[0]);
      localStorage.account = accounts[0] || '';

      setConnectTag(
        localStorage.account.slice(0, 4) +
          '...' +
          localStorage.account.slice(39, 42)
      );
    });
  } catch (err) {
    console.log(err);
  }
};

////////// CHECK IF USER SELECTED A DIFFERENT NETWORK ////////////

const listenNetworkChange = async (setNetworkId) => {
  const web3 = window.web3;
  window.ethereum.on('networkChanged', async () => {
    const networkId = await web3.eth.net.getId();
    await setNetworkId(networkId);
    localStorage.networkId = networkId;
  });
};

/////////// GET ALL THE DETAILS OF AN ACCOUNT /////////////////

const accountDetails = async (account, userData, setUserData, setLoading) => {
  try {
    setLoading(true);
    const web3 = window.web3;

    const tokenContract = await new web3.eth.Contract(
      TokenABI,
      TokenContractAddress
    );

    const guessContract = await new web3.eth.Contract(
      GuessABI,
      GuessContractAddress
    );

    const approvedAmount = await tokenContract.methods
      .allowance(account, GuessContractAddress)
      .call({ from: account });
    const stochBalance = await tokenContract.methods
      .balanceOf(account)
      .call({ from: account });
    const isUserStaking = await guessContract.methods
      .isUserStaking()
      .call({ from: account });
    const checkStakingBalance = await guessContract.methods
      .checkStakingBalance()
      .call({ from: account });
    const maxNumberUserCanSelect = await guessContract.methods
      .maxNumberUserCanSelect()
      .call({ from: account });
    const remainingNumbersToSet = await guessContract.methods
      .remainingNumbersToSet()
      .call({ from: account });
    const totalTokenStakedInContract = await guessContract.methods
      .totalTokenStakedInContract()
      .call({ from: account });
    const lastWinsTime = await guessContract.methods
      .lastWinsTime()
      .call({ from: account });

    const calculateCurrentTokenAmount = await guessContract.methods
      .calculateCurrentTokenAmount()
      .call({ from: account });

    await setUserData({
      ...userData,
      stochBalance: stochBalance,
      approvedAmount: approvedAmount,
      isUserStaking: isUserStaking,
      checkStakingBalance: checkStakingBalance,
      maxNumberUserCanSelect: maxNumberUserCanSelect,
      remainingNumbersToSet: remainingNumbersToSet,
      totalTokenStakedInContract: totalTokenStakedInContract,
      lastWinsTime: lastWinsTime,
      calculateCurrentTokenAmount: calculateCurrentTokenAmount,
    });

    setLoading(false);
  } catch (err) {}
};

const approveFunction = async (
  tokenContract,
  amount,
  account,
  setError,
  setApproveValue,
  setShow
) => {
  try {
    const web3 = window.web3;

    const tokens = web3.utils.toWei(amount.toString(), 'ether').toString();

    if (amount === 0) {
      setError(true);
      return;
    }

    setError(false);
    await tokenContract.methods
      .approve(GuessContractAddress, tokens)
      .send({ from: account })
      .on('transactionHash', async () => {
        Swal.fire({
          width: 400,
          background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

          title: `<span style='color:white'>Transaction Processing...</span>`,
          showConfirmButton: false,
          showCloseButton: false,
          customClass: {
            confirmButton: 'swal-button',
            loader: 'swal-loader',
          },
          allowOutsideClick: false,
          buttonsStyling: false,
          onOpen: () => {
            Swal.showLoading();
          },
          imageUrl: `${loader2}`,
          imageHeight: 80,
          imageWidth: 80,
        });
      });

    await userdb.once('value', async (snapshot) => {
      const temp = snapshot.val();

      let countValue;
      if (temp == null) {
        await userdb.child(account).child('Transactions').set({
          count: 0,
        });

        await userdb
          .child(account)
          .child('Transactions/count')
          .once('value', async (result) => {
            countValue = result.val();
          });
      }
      await userdb
        .child(account)
        .child('Transactions/count')
        .once('value', async (result) => {
          countValue = result.val();
        });

      if (countValue === null) {
        await userdb.child(account).child('Transactions').set({
          count: 0,
        });

        await userdb
          .child(account)
          .child('Transactions/count')
          .once('value', async (result) => {
            countValue = result.val();
          });
      }

      await userdb
        .child(account)
        .child('Transactions')
        .child(countValue)
        .update({
          date: new Date().toISOString().slice(0, 10),
          approveAmount: amount,
          type: 'APPROVE',
        })
        .then(async () => {
          await userdb
            .child(account)
            .child('Transactions')
            .child('count')
            .set(countValue + 1)
            .then(async () => {
              await setApproveValue(0);
              Swal.fire({
                width: 400,
                background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0%
                  0% no-repeat padding-box`,

                title: `<span style='color:white'>Transaction Successful</span>`,
                showConfirmButton: true,
                showCloseButton: false,
                confirmButtonText: 'Close',

                customClass: {
                  confirmButton: 'swal-button',
                },
                buttonsStyling: false,
                imageUrl: `${success}`,
                imageHeight: 80,
                imageWidth: 80,
              });
              setShow(false);
            });
        });
    });
  } catch (err) {
    Swal.fire({
      width: 400,
      background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

      title: `<span style='color:white'>Oops! Something went wrong</span>`,
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: 'Close',

      customClass: {
        confirmButton: 'swal-button',
      },
      buttonsStyling: false,
      imageUrl: `${error}`,
      imageHeight: 80,
      imageWidth: 80,
    });
    setApproveValue(0);
    setShow(false);
    console.log(err);
  }
};

//////////////////// APPROVE FOR ADMIN /////////////////////////////////////////

const approveForAdminFunction = async (
  tokenContract,
  amount,
  account,
  setError,
  setApproveValue,
  setShow
) => {
  try {
    const web3 = window.web3;

    if (account !== adminPublicKey) {
      Swal.fire({
        width: 400,
        background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

        title: `<span style='color:white'>Not Authorized</span>`,
        showConfirmButton: true,
        showCloseButton: false,
        confirmButtonText: 'Close',

        customClass: {
          confirmButton: 'swal-button',
        },
        buttonsStyling: false,
        imageUrl: `${error}`,
        imageHeight: 80,
        imageWidth: 80,
      });
      setShow(false);
      setApproveValue(0);
      return;
    }

    const tokens = web3.utils.toWei(amount.toString(), 'ether').toString();

    if (amount === 0) {
      setError(true);
      return;
    }

    setError(false);
    await tokenContract.methods
      .approve(GuessContractAddress, tokens)
      .send({ from: account })
      .on('transactionHash', async () => {
        Swal.fire({
          width: 400,
          background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

          title: `<span style='color:white'>Transaction Processing...</span>`,
          showConfirmButton: false,
          showCloseButton: false,

          customClass: {
            confirmButton: 'swal-button',
            loader: 'swal-loader',
          },
          allowOutsideClick: false,
          buttonsStyling: false,
          onOpen: () => {
            Swal.showLoading();
          },
          imageUrl: `${loader2}`,
          imageHeight: 80,
          imageWidth: 80,
        });
      });

    await userdb.once('value', async (snapshot) => {
      const temp = snapshot.val();

      let countValue;
      if (temp == null) {
        await userdb.child(account).child('Transactions').set({
          count: 0,
        });

        await userdb
          .child(account)
          .child('Transactions/count')
          .once('value', async (result) => {
            countValue = result.val();
          });
      }
      await userdb
        .child(account)
        .child('Transactions/count')
        .once('value', async (result) => {
          countValue = result.val();
        });

      if (countValue === null) {
        await userdb.child(account).child('Transactions').set({
          count: 0,
        });

        await userdb
          .child(account)
          .child('Transactions/count')
          .once('value', async (result) => {
            countValue = result.val();
          });
      }

      await userdb
        .child(account)
        .child('Transactions')
        .child(countValue)
        .update({
          date: new Date().toISOString().slice(0, 10),
          approveAmount: amount,
          type: 'APPROVE',
        })
        .then(async () => {
          await userdb
            .child(account)
            .child('Transactions')
            .child('count')
            .set(countValue + 1)
            .then(async () => {
              await setApproveValue(0);
              Swal.fire({
                width: 400,
                background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

                title: `<span style='color:white'>Transaction Successful</span>`,
                showConfirmButton: true,
                showCloseButton: false,
                confirmButtonText: 'Close',

                customClass: {
                  confirmButton: 'swal-button',
                },
                buttonsStyling: false,
                imageUrl: `${success}`,
                imageHeight: 80,
                imageWidth: 80,
              });
            });
          setShow(false);
        });
    });
  } catch (err) {
    Swal.fire({
      width: 400,
      background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

      title: `<span style='color:white'>Oops! Something went wrong</span>`,
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: 'Close',

      customClass: {
        confirmButton: 'swal-button',
      },
      buttonsStyling: false,
      imageUrl: `${error}`,
      imageHeight: 80,
      imageWidth: 80,
    });
    setApproveValue(0);
    setShow(false);
    console.log(err);
  }
};

//////////////// HANDLE STAKETOKEN FUNCTION OF GUESS CONTARCT //////////////////////

const stakeTokens = async (
  guessContract,
  amount,
  account,
  setError,
  setError2,
  setStakeValue,
  maxAmount,
  setShow
) => {
  try {
    const tokens = amount.toString();

    if (amount === 0) {
      setError(true);
      return;
    }

    if (amount > maxAmount) {
      setError2(true);
      return;
    }

    await guessContract.methods
      .stakeTokens(tokens)
      .send({ from: account })
      .on('transactionHash', async () => {
        Swal.fire({
          width: 400,
          background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

          title: `<span style='color:white'>Transaction Processing...</span>`,
          showConfirmButton: false,
          showCloseButton: false,

          customClass: {
            confirmButton: 'swal-button',
            loader: 'swal-loader',
          },
          allowOutsideClick: false,
          buttonsStyling: false,
          onOpen: () => {
            Swal.showLoading();
          },
          imageUrl: `${loader2}`,
          imageHeight: 80,
          imageWidth: 80,
        });
      });

    setError(false);
    setError2(false);

    await userdb.once('value', async (snapshot) => {
      const temp = snapshot.val();

      let countValue;
      if (temp == null) {
        await userdb.child(account).child('Transactions').set({
          count: 0,
        });

        await userdb
          .child(account)
          .child('Transactions/count')
          .once('value', async (result) => {
            countValue = result.val();
          });
      }
      await userdb
        .child(account)
        .child('Transactions/count')
        .once('value', async (result) => {
          countValue = result.val();
        });

      if (countValue === null) {
        await userdb.child(account).child('Transactions').set({
          count: 0,
        });

        await userdb
          .child(account)
          .child('Transactions/count')
          .once('value', async (result) => {
            countValue = result.val();
          });
      }

      await userdb
        .child(account)
        .child('Transactions')
        .child(countValue)
        .update({
          date: new Date().toISOString().slice(0, 10),
          stakingAmount: amount,
          type: 'STAKE',
        })
        .then(async () => {
          await userdb
            .child(account)
            .child('Transactions')
            .child('count')
            .set(countValue + 1)
            .then(() => {
              setStakeValue(0);
              Swal.fire({
                width: 400,
                background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

                title: `<span style='color:white'>Transaction Successful</span>`,
                showConfirmButton: true,
                showCloseButton: false,
                confirmButtonText: 'Close',

                customClass: {
                  confirmButton: 'swal-button',
                },
                buttonsStyling: false,
                imageUrl: `${success}`,
                imageHeight: 80,
                imageWidth: 80,
              });
              setShow(false);
            });
        });
    });
  } catch (err) {
    Swal.fire({
      width: 400,
      background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

      title: `<span style='color:white'>Oops! Something went wrong</span>`,
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: 'Close',

      customClass: {
        confirmButton: 'swal-button',
      },
      buttonsStyling: false,
      imageUrl: `${error}`,
      imageHeight: 80,
      imageWidth: 80,
    });
    setStakeValue(0);
    setShow(false);
  }
};

//////////// HANDLE CHOOSENUMBER FUNCTION OF GUESS CONTRACT ///////////////////

const chooseNumbers = async (
  guessContract,
  account,
  dataArray,
  setSelectedGuesses,
  setCheckboxId
) => {
  try {
    const result = await guessContract.methods
      .isRandomNumberGenerated()
      .call({ from: account });

    if (result === true) {
      Swal.fire({
        width: 400,
        background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

        title: `<span style='color:white'>Random number is generated...can't select now</span>`,
        showConfirmButton: true,
        showCloseButton: false,
        confirmButtonText: 'Close',

        customClass: {
          confirmButton: 'swal-button',
        },
        buttonsStyling: false,
        imageUrl: `${error}`,
        imageHeight: 80,
        imageWidth: 80,
      });
      setSelectedGuesses([]);
      setCheckboxId(new Map());

      return;
    }

    await guessContract.methods
      .chooseNumbers(dataArray)
      .send({ from: account })
      .on('transactionHash', async () => {
        Swal.fire({
          width: 400,
          background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

          title: `<span style='color:white'>Transaction Processing...</span>`,
          showConfirmButton: false,
          showCloseButton: false,

          customClass: {
            confirmButton: 'swal-button',
            loader: 'swal-loader',
          },
          allowOutsideClick: false,
          buttonsStyling: false,
          onOpen: () => {
            Swal.showLoading();
          },
          imageUrl: `${loader2}`,
          imageHeight: 80,
          imageWidth: 80,
        });
      });

    let temp1;
    let temp2;
    let countValue;

    await db
      .child('ChoosedArray')
      .once('value', (snapshot) => {
        const data = snapshot.val();
        temp1 = data.concat(dataArray);
      })
      .then(async () => {
        await db.update({
          ChoosedArray: temp1,
        });
      });

    await userdb.once('value', async (snapshot) => {
      const temp = snapshot.val();

      if (temp === null) {
        await userdb.child(account).child('Transactions').set({
          count: 0,
        });

        await userdb
          .child(account)
          .child('Transactions/count')
          .once('value', async (result) => {
            countValue = result.val();
          });
      }

      await userdb
        .child(account)
        .child('Transactions/count')
        .once('value', async (result) => {
          countValue = result.val();
        });

      if (countValue === null) {
        await userdb.child(account).child('Transactions').set({
          count: 0,
        });

        await userdb
          .child(account)
          .child('Transactions/count')
          .once('value', async (result) => {
            countValue = result.val();
          });
      }
    });

    await userdb
      .child(account)
      .once('value', async (snapshot) => {
        const data = snapshot.val().SelectedArray;

        if (data === undefined) {
          await userdb
            .child(account)
            .update({
              SelectedArray: [-1],
            })
            .then(async () => {
              await userdb.child(account).once('value', async (snapshot) => {
                const temp = snapshot.val().SelectedArray;
                temp2 = temp.concat(dataArray);
              });
            });
          return;
        }
      })
      .then(async () => {
        await userdb.child(account).once('value', async (snapshot) => {
          const temp = snapshot.val().SelectedArray;
          temp2 = temp.concat(dataArray);
        });
      })
      .then(async () => {
        await userdb.child(account).update({
          SelectedArray: temp2,
        });
      });

    await userdb
      .child(account)
      .child('Transactions')
      .child(countValue)
      .update({
        date: new Date().toISOString().slice(0, 10),
        choosenNumber: dataArray,
        type: 'SELECTIONS',
      })
      .then(async () => {
        await userdb
          .child(account)
          .child('Transactions')
          .child('count')
          .set(countValue + 1)
          .then(() => {
            Swal.fire({
              width: 400,
              background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

              title: `<span style='color:white'>Transaction Successful</span>`,
              showConfirmButton: true,
              showCloseButton: false,
              confirmButtonText: 'Close',

              customClass: {
                confirmButton: 'swal-button',
              },
              buttonsStyling: false,
              imageUrl: `${success}`,
              imageHeight: 80,
              imageWidth: 80,
            }).then(() => {
              setSelectedGuesses([]);
              setCheckboxId(new Map());
            });
          });
      });
  } catch (err) {
    Swal.fire({
      width: 400,
      background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

      title: `<span style='color:white'>Oops! Something went wrong</span>`,
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: 'Close',

      customClass: {
        confirmButton: 'swal-button',
      },
      buttonsStyling: false,
      imageUrl: `${error}`,
      imageHeight: 80,
      imageWidth: 80,
    });
  }
};

//////////////// HANLDE UNSTAKE FUNCTION OF GUESS CONTRACT ///////////////////////

const unstakeTokens = async (guessContract, account) => {
  try {
    await guessContract.methods
      .unstakeTokens()
      .send({ from: account })
      .on('transactionHash', async () => {
        Swal.fire({
          width: 400,
          background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

          title: `<span style='color:white'>Transaction Processing...</span>`,

          showConfirmButton: false,
          showCloseButton: false,

          customClass: {
            confirmButton: 'swal-button',
            loader: 'swal-loader',
          },
          allowOutsideClick: false,
          buttonsStyling: false,
          onOpen: () => {
            Swal.showLoading();
          },
          imageUrl: `${loader2}`,
          imageHeight: 80,
          imageWidth: 80,
        });
      });

    ///////////////////////////////////////////

    await db.child('ChoosedArray').once('value', async (snapshot) => {
      let array1;
      let array2;
      array1 = snapshot.val();

      await userdb
        .child(account)
        .child('SelectedArray')
        .once('value', async (snapshot) => {
          array2 = snapshot.val();
        });

      array1 = await array1.filter((val) => !array2.includes(val));

      await userdb
        .child(account)
        .update({
          SelectedArray: [-1],
        })
        .then(async () => {
          await db.update({
            ChoosedArray: array1.concat([-1]),
          });
        });
    });

    ////////////////////////////////////////////

    await userdb.once('value', async (snapshot) => {
      const temp = snapshot.val();

      let countValue;
      if (temp == null) {
        await userdb.child(account).child('Transactions').set({
          count: 0,
        });

        await userdb
          .child(account)
          .child('Transactions/count')
          .once('value', async (result) => {
            countValue = result.val();
          });
      }
      await userdb
        .child(account)
        .child('Transactions/count')
        .once('value', async (result) => {
          countValue = result.val();
        });

      if (countValue === null) {
        await userdb.child(account).child('Transactions').set({
          count: 0,
        });

        await userdb
          .child(account)
          .child('Transactions/count')
          .once('value', async (result) => {
            countValue = result.val();
          });
      }

      await userdb
        .child(account)
        .child('Transactions')
        .child(countValue)
        .update({
          date: new Date().toISOString().slice(0, 10),
          type: 'UNSTAKE',
        })
        .then(async () => {
          await userdb
            .child(account)
            .child('Transactions')
            .child('count')
            .set(countValue + 1)
            .then(() => {
              Swal.fire({
                width: 400,
                background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

                title: `<span style='color:white'>Transaction Successful</span>`,
                showConfirmButton: true,
                showCloseButton: false,
                confirmButtonText: 'Close',

                customClass: {
                  confirmButton: 'swal-button',
                },
                buttonsStyling: false,
                imageUrl: `${success}`,
                imageHeight: 80,
                imageWidth: 80,
              });
            });
        });
    });
  } catch (err) {
    Swal.fire({
      width: 400,
      background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

      title: `<span style='color:white'>Oops! Something went wrong</span>`,
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: 'Close',

      customClass: {
        confirmButton: 'swal-button',
      },
      buttonsStyling: false,
      imageUrl: `${error}`,
      imageHeight: 80,
      imageWidth: 80,
    });
  }
};

/////////////////////////// STAGGERED UNSTAKE FUNCTION ////////////////////////

const staggeredUnstake = async (guessContract, account, choosedArray) => {
  try {
    if (choosedArray.length === 0) {
      Swal.fire({
        width: 400,
        background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

        title: `<span style='color:white'>please choose numbers to unstake</span>`,
        showConfirmButton: true,
        showCloseButton: false,

        customClass: {
          confirmButton: 'swal-button',
        },
        buttonsStyling: false,
        imageUrl: `${error}`,
        imageHeight: 80,
        imageWidth: 80,
      });
      return;
    }

    if (choosedArray.length > 100) {
      Swal.fire({
        width: 400,
        background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

        title: `<span style='color:white'>Maxiumum 100 in one go</span>`,
        showConfirmButton: true,
        showCloseButton: false,

        customClass: {
          confirmButton: 'swal-button',
        },
        buttonsStyling: false,
        imageUrl: `${error}`,
        imageHeight: 80,
        imageWidth: 80,
      });
      return;
    }

    console.log(choosedArray);
    await guessContract.methods
      .staggeredUnstake(choosedArray)
      .send({ from: account })
      .on('transactionHash', async () => {
        Swal.fire({
          width: 400,
          background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

          title: `<span style='color:white'>Transaction Processing...</span>`,

          showConfirmButton: false,
          showCloseButton: false,

          customClass: {
            confirmButton: 'swal-button',
            loader: 'swal-loader',
          },
          allowOutsideClick: false,
          buttonsStyling: false,
          onOpen: () => {
            Swal.showLoading();
          },
          imageUrl: `${loader2}`,
          imageHeight: 80,
          imageWidth: 80,
        });
      });

    ///////////////////////////////////////////

    await db.child('ChoosedArray').once('value', async (snapshot) => {
      let array1;
      let array2;
      array1 = snapshot.val();

      await userdb
        .child(account)
        .child('SelectedArray')
        .once('value', async (snapshot) => {
          array2 = snapshot.val();
        });

      array1 = await array1.filter((val) => !choosedArray.includes(val));
      array2 = await array2.filter((val) => !choosedArray.includes(val));

      await userdb
        .child(account)
        .update({
          SelectedArray: array2,
        })
        .then(async () => {
          await db.update({
            ChoosedArray: array1,
          });
        });
    });

    ////////////////////////////////////////////

    await userdb.once('value', async (snapshot) => {
      const temp = snapshot.val();

      let countValue;
      if (temp == null) {
        await userdb.child(account).child('Transactions').set({
          count: 0,
        });

        await userdb
          .child(account)
          .child('Transactions/count')
          .once('value', async (result) => {
            countValue = result.val();
          });
      }
      await userdb
        .child(account)
        .child('Transactions/count')
        .once('value', async (result) => {
          countValue = result.val();
        });

      if (countValue === null) {
        await userdb.child(account).child('Transactions').set({
          count: 0,
        });

        await userdb
          .child(account)
          .child('Transactions/count')
          .once('value', async (result) => {
            countValue = result.val();
          });
      }

      await userdb
        .child(account)
        .child('Transactions')
        .child(countValue)
        .update({
          date: new Date().toISOString().slice(0, 10),
          choosenNumber: choosedArray,
          stakingAmount: choosedArray.length * 100,
          type: 'STAGGERED UNSTAKE',
        })
        .then(async () => {
          await userdb
            .child(account)
            .child('Transactions')
            .child('count')
            .set(countValue + 1)
            .then(() => {
              Swal.fire({
                width: 400,
                background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

                title: `<span style='color:white'>Transaction Successful</span>`,
                showConfirmButton: true,
                showCloseButton: false,
                confirmButtonText: 'Close',

                customClass: {
                  confirmButton: 'swal-button',
                },
                buttonsStyling: false,
                imageUrl: `${success}`,
                imageHeight: 80,
                imageWidth: 80,
              });
            });
        });
    });
  } catch (err) {
    Swal.fire({
      width: 400,
      background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

      title: `<span style='color:white'>Oops! Something went wrong</span>`,
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: 'Close',

      customClass: {
        confirmButton: 'swal-button',
      },
      buttonsStyling: false,
      imageUrl: `${error}`,
      imageHeight: 80,
      imageWidth: 80,
    });

    console.log(err);
  }
};

/////////////////////////// ADMIN FUNCTIONS ///////////////////////////////////

const guessRandomNumber = async (
  guessContract,
  account,
  userProvidedSeed,
  setSpeed
) => {
  try {
    if (userProvidedSeed === '') {
      Swal.fire({
        width: 400,
        background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

        title: `<span style='color:white'>Please enter seed first</span>`,
        showConfirmButton: true,
        showCloseButton: false,

        customClass: {
          confirmButton: 'swal-button',
        },
        buttonsStyling: false,
        imageUrl: `${error}`,
        imageHeight: 80,
        imageWidth: 80,
      });
      setSpeed('');

      return;
    }

    await guessContract.methods
      .guessRandomNumber(userProvidedSeed)
      .send({
        from: account,
      })
      .on('transactionHash', async () => {
        Swal.fire({
          width: 400,
          background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

          title: `<span style='color:white'>Transaction Processing...</span>`,

          showConfirmButton: false,
          showCloseButton: false,

          customClass: {
            confirmButton: 'swal-button',
            loader: 'swal-loader',
          },
          allowOutsideClick: false,
          buttonsStyling: false,
          onOpen: () => {
            Swal.showLoading();
          },
          imageUrl: `${loader2}`,
          imageHeight: 80,
          imageWidth: 80,
        });
      });

    await setSpeed('');
    Swal.fire({
      width: 400,
      background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

      title: `<span style='color:white'>Transaction Successful</span>`,
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: 'Close',

      customClass: {
        confirmButton: 'swal-button',
      },
      buttonsStyling: false,
      imageUrl: `${success}`,
      imageHeight: 80,
      imageWidth: 80,
    });
  } catch (err) {
    Swal.fire({
      width: 400,
      background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

      title: `<span style='color:white'>Oops! Something went wrong</span>`,
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: 'Close',

      customClass: {
        confirmButton: 'swal-button',
      },
      buttonsStyling: false,
      imageUrl: `${error}`,
      imageHeight: 80,
      imageWidth: 80,
    });
    await setSpeed('');
  }
};

const chooseWinner = async (guessContract, account) => {
  try {
    console.log(guessContract);
    await guessContract.methods
      .chooseWinner()
      .send({ from: account })
      .on('transactionHash', async () => {
        Swal.fire({
          width: 400,
          background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

          title: `<span style='color:white'>Transaction Processing...</span>`,

          showConfirmButton: false,
          showCloseButton: false,

          customClass: {
            confirmButton: 'swal-button',
            loader: 'swal-loader',
          },
          allowOutsideClick: false,
          buttonsStyling: false,
          onOpen: () => {
            Swal.showLoading();
          },
          imageUrl: `${loader2}`,
          imageHeight: 80,
          imageWidth: 80,
        });
      });

    Swal.fire({
      width: 400,
      background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

      title: `<span style='color:white'>Transaction Successful</span>`,
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: 'Close',

      customClass: {
        confirmButton: 'swal-button',
      },
      buttonsStyling: false,
      imageUrl: `${success}`,
      imageHeight: 80,
      imageWidth: 80,
    });
  } catch (err) {
    Swal.fire({
      width: 400,
      background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

      title: `<span style='color:white'>Oops! Something went wrong</span>`,
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: 'Close',

      customClass: {
        confirmButton: 'swal-button',
      },
      buttonsStyling: false,
      imageUrl: `${error}`,
      imageHeight: 80,
      imageWidth: 80,
    });
    console.log(err);
  }
};

const emitEveryWeekTokens = async (tokenContract, account) => {
  try {
    await tokenContract.methods
      .emitEveryWeekTokens()
      .send({ from: account })
      .on('transactionHash', async () => {
        Swal.fire({
          width: 400,
          background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

          title: `<span style='color:white'>Transaction Processing...</span>`,

          showConfirmButton: false,
          showCloseButton: false,

          customClass: {
            confirmButton: 'swal-button',
            loader: 'swal-loader',
          },
          allowOutsideClick: false,
          buttonsStyling: false,
          onOpen: () => {
            Swal.showLoading();
          },
          imageUrl: `${loader2}`,
          imageHeight: 80,
          imageWidth: 80,
        });
      });

    Swal.fire({
      width: 400,
      background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

      title: `<span style='color:white'>Transaction Successful</span>`,
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: 'Close',

      customClass: {
        confirmButton: 'swal-button',
      },
      buttonsStyling: false,
      imageUrl: `${success}`,
      imageHeight: 80,
      imageWidth: 80,
    });
  } catch (err) {
    Swal.fire({
      width: 400,
      background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

      title: `<span style='color:white'>Oops! Something went wrong</span>`,
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: 'Close',

      customClass: {
        confirmButton: 'swal-button',
      },
      buttonsStyling: false,
      imageUrl: `${error}`,
      imageHeight: 80,
      imageWidth: 80,
    });
  }
};

const lastRandomNumber = async (
  guessContract,
  account,
  setCheckRandomNumber
) => {
  const checkRandomNumber = await guessContract.methods
    .checkRandomNumber()
    .call({ from: account });

  await setCheckRandomNumber(checkRandomNumber);
};

const pushWinnerNumber = async (
  winnerNumber,
  date,
  setWinnerNumber,
  setDate,
  account,
  setError,
  setShow
) => {
  try {
    if (account !== adminPublicKey) {
      Swal.fire({
        width: 400,
        background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

        title: `<span style='color:white'>Connect the admin wallet first</span>`,
        showConfirmButton: true,
        showCloseButton: false,
        confirmButtonText: 'Close',

        customClass: {
          confirmButton: 'swal-button',
        },
        buttonsStyling: false,
        imageUrl: `${error}`,
        imageHeight: 80,
        imageWidth: 80,
      });
      setShow(false);
      return;
    }

    if (winnerNumber === '' || date === '') {
      setError(true);
      return;
    }

    const uuid = uuidv4();
    await db
      .child('winnerNumbers')
      .child(uuid)
      .set({
        id: uuid,
        date: date,
        number: winnerNumber,
      })
      .then(async () => {
        await setWinnerNumber('');
        await setDate('');
        Swal.fire({
          width: 400,
          background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0%0% no-repeat padding-box`,

          title: `<span style='color:white'>Added Successfully</span>`,
          showConfirmButton: true,
          showCloseButton: false,
          confirmButtonText: 'Close',

          customClass: {
            confirmButton: 'swal-button',
          },
          buttonsStyling: false,
          imageUrl: `${success}`,
          imageHeight: 80,
          imageWidth: 80,
        });
        setShow(false);
      });
  } catch (err) {
    Swal.fire({
      width: 400,
      background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

      title: `<span style='color:white'>Oops! Something went wrong</span>`,
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: 'Close',

      customClass: {
        confirmButton: 'swal-button',
      },
      buttonsStyling: false,
      imageUrl: `${error}`,
      imageHeight: 80,
      imageWidth: 80,
    });
    await setWinnerNumber('');
    await setDate('');
    setShow(false);
  }
};

const editWinnerNumber = async (
  winnerValue,
  date,
  setWinnerValue,
  setDate,
  id,
  setError,
  account,
  setShow
) => {
  try {
    if (account !== adminPublicKey) {
      Swal.fire({
        width: 400,
        background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

        title: `<span style='color:white'>Connect the admin wallet first</span>`,
        showConfirmButton: true,
        showCloseButton: false,
        confirmButtonText: 'Close',

        customClass: {
          confirmButton: 'swal-button',
        },
        buttonsStyling: false,
        imageUrl: `${error}`,
        imageHeight: 80,
        imageWidth: 80,
      });
      setShow(false);
      return;
    }

    if (winnerValue === '' || date === '') {
      setError(true);
      return;
    }
    setError(false);
    let uid;
    await db
      .child('winnerNumbers')
      .once('value', async (snapshot) => {
        snapshot.forEach((childsnapshot) => {
          if (childsnapshot.val().id === id) {
            uid = id;
          }
        });
      })
      .then(async () => {
        await db.child('winnerNumbers').child(uid).update({
          date: date,
          number: winnerValue,
        });
      })
      .then(async () => {
        await setWinnerValue('');
        await setDate('');
        Swal.fire({
          width: 400,
          background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

          title: `<span style='color:white'>Changed Successfully</span>`,
          showConfirmButton: true,
          showCloseButton: false,
          confirmButtonText: 'Close',

          customClass: {
            confirmButton: 'swal-button',
          },
          buttonsStyling: false,
          imageUrl: `${success}`,
          imageHeight: 80,
          imageWidth: 80,
        });
        setShow(false);
      });
  } catch (err) {
    Swal.fire({
      width: 400,
      background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,

      title: `<span style='color:white'>Oops! Something went wrong</span>`,
      showConfirmButton: true,
      showCloseButton: false,
      confirmButtonText: 'Close',

      customClass: {
        confirmButton: 'swal-button',
      },
      buttonsStyling: false,
      imageUrl: `${error}`,
      imageHeight: 80,
      imageWidth: 80,
    });
    await setWinnerValue('');
    await setDate('');
    setShow(false);
  }
};

export {
  loadWeb3,
  loadBlockChainData,
  listenAccountChange,
  listenNetworkChange,
  accountDetails,
  approveFunction,
  approveForAdminFunction,
  stakeTokens,
  chooseNumbers,
  unstakeTokens,
  guessRandomNumber,
  chooseWinner,
  emitEveryWeekTokens,
  lastRandomNumber,
  pushWinnerNumber,
  editWinnerNumber,
  staggeredUnstake,
};
