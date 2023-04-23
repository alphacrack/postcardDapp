import React from 'react';
import ReactDOM from 'react-dom';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import App from './App';

async function init() {
  const provider = await detectEthereumProvider();
  if (provider) {
    window.ethereum.enable();
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
  } else {
    console.error('Please install MetaMask!');
  }

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

init();
