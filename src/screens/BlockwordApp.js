import React, {useEffect, useState} from 'react';
import Web3 from 'web3';

const BlockwordApp = () => {
    const [account, setAccount] = useState();
    const [blockword_contract, setBlockwordContract] = useState();

    useEffect(() => {
        const checkConnection = async () => {
 
            // Check if browser is running Metamask
            let web3;
            if (window.ethereum) {
                web3 = new Web3(window.ethereum);
            } else if (window.web3) {
                web3 = new Web3(window.web3.currentProvider);
            };
 
            // Check if User is already connected by retrieving the accounts
            web3.eth.getAccounts()
                .then(async (addr) => {
                    setAccount(addr[0]);
                });
        };
        checkConnection();
    }, []);
  
    async function connect_wallet() {
        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.requestAccounts();
        let result = await fetch(process.env.REACT_APP_ABI_URL);
        let abi = await result.json();
        console.log(abi.result);
        console.log(process.env.REACT_APP_SMART_CONTRACT_ADDRESS);
        let blockword = new web3.eth.Contract(JSON.parse(abi.result), process.env.REACT_APP_SMART_CONTRACT_ADDRESS);
        console.log(blockword);
        setBlockwordContract(blockword);
        setAccount(accounts[0]);
    }
  
    return (
        <div>
            <button onClick={connect_wallet}>Connect MetaMask Wallet</button>
            Your account is: {account}
        </div>
   )
}

export default BlockwordApp;