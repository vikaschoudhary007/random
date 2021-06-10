import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import DashboardPage from './Pages/DashboardPage';
import ChooseNumberPage from './Pages/ChooseNumberPage';
import AdminPage from './Pages/AdminPage';
import { UserProvider } from './Context/UserContext';
import Swal from 'sweetalert2';
import logo from './images/warning.png';
import {
  loadWeb3,
  loadBlockChainData,
  listenAccountChange,
  listenNetworkChange,
  accountDetails,
} from './Functions/Web3';

export default function Routes() {
  const [loading, setLoading] = useState(false);
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);
  const [account, setAccount] = useState('');
  const [networkId, setNetworkId] = useState('');
  const [tokenContract, setTokenContract] = useState('');
  const [guessContract, setGuessContract] = useState('');
  const [connectTag, setConnectTag] = useState('');
  const [userData, setUserData] = useState({
    stochBalance: 0,
    approvedAmount: 0,
    isUserStaking: false,
    checkStakingBalance: 0,
    maxNumberUserCanSelect: 0,
    remainingNumbersToSet: 0,
    totalTokenStakedInContract: 0,
    lastWinsTime: '',
    calculateCurrentTokenAmount: 0,
  });
  const [checkRandomNumber, setCheckRandomNumber] = useState(0);

  useEffect(() => {
    const metaMaskInstalled = typeof window.web3 !== 'undefined';
    setMetaMaskInstalled(metaMaskInstalled);

    if (metaMaskInstalled) {
      loadWeb3(setMetaMaskInstalled);
      loadBlockChainData(
        setAccount,
        setNetworkId,
        setTokenContract,
        setConnectTag,
        setGuessContract
      );
      listenAccountChange(setAccount, setConnectTag);
      listenNetworkChange(setNetworkId);
      accountDetails(account, userData, setUserData, setLoading);
    } else {
      Swal.fire({
        width: 400,
        background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,
        iconColor: '#4F94CD',
        title: `<span style='color:white'>Non-Ethereum browser detected</span> `,
        text: `You should consider MetaMask`,
        footer: `<a target="_blank" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">Install MetaMask</a>`,
        showConfirmButton: false,
        showCloseButton: true,
        imageUrl: `${logo}`,
        imageHeight: 80,
        imageWidth: 80,
      });
    }
  }, []);

  useEffect(() => {
    accountDetails(account, userData, setUserData, setLoading);
  }, [account, userData]);

  const handleConnect = () => {
    const metaMaskInstalled = typeof window.web3 !== 'undefined';
    setMetaMaskInstalled(metaMaskInstalled);

    if (metaMaskInstalled) {
      loadWeb3(setMetaMaskInstalled);
      loadBlockChainData(
        setAccount,
        setNetworkId,
        setTokenContract,
        setConnectTag,
        setGuessContract
      );
      listenAccountChange(setAccount, setConnectTag);
      listenNetworkChange(setNetworkId);
    } else {
      Swal.fire({
        width: 400,
        background: `transparent linear-gradient(135deg, #ff7519 0%, #118fef 100%) 0% 0% no-repeat padding-box`,
        iconColor: '#4F94CD',
        title: `<span style='color:white'>Non-Ethereum browser detected</span> `,
        text: `You should consider MetaMask`,
        footer: `<a target="_blank" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">Install MetaMask</a>`,
        showConfirmButton: false,
        showCloseButton: true,
        imageUrl: `${logo}`,
        imageHeight: 80,
        imageWidth: 80,
      });
    }
  };

  return (
    <UserProvider
      value={{
        metaMaskInstalled,
        setMetaMaskInstalled,
        account,
        setAccount,
        networkId,
        setNetworkId,
        tokenContract,
        guessContract,
        setTokenContract,
        loadWeb3,
        loadBlockChainData,
        listenAccountChange,
        listenNetworkChange,
        connectTag,
        handleConnect,
        userData,
        loading,
        setUserData,
        checkRandomNumber,
        setCheckRandomNumber,
      }}
    >
      <Router>
        <Switch>
          <Route exect path="/dashboard" component={DashboardPage} />
          <Route exect path="/select_numbers" component={ChooseNumberPage} />
          <Route exect path="/admin" component={AdminPage} />
          <Route exect path="/" component={LandingPage} />
        </Switch>
      </Router>
    </UserProvider>
  );
}
