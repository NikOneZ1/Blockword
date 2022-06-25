import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import plus from '../media/plus.svg';
import Footer from '../components/footer';
import AppHeader from '../components/app_header';
import MetaMaskOnboarding from '@metamask/onboarding';

const BlockwordApp = () => {
    const [account, setAccount] = useState();
    const [blockword_contract, setBlockwordContract] = useState();
    const [price, setPrice] = useState();
    const [passwordAccounts, setPasswordAccounts] = useState([]);
    const [network, setNetwork] = useState();

    useEffect(() => {
        const onClickInstall = () => {
            if(isMetaMaskInstalled()) {
                onClickConnect();
            }
            const onboarding = new MetaMaskOnboarding('http://localhost:9010');
            onboarding.startOnboarding();
        };

        const checkMetamask = () => {
            let onboardButton = document.getElementById('connect-wallet-button');
            if (!isMetaMaskInstalled()) {
                onboardButton.onclick = onClickInstall;
                onboardButton.disabled = false;
              } else {
                onboardButton.onclick = onClickConnect;
                onboardButton.disabled = false;
                const web3 = new Web3(Web3.givenProvider);
                web3.eth.getAccounts()
                    .then(async (addr) => {
                        if(addr[0]) {
                            if (await checkNetwork() === true) {
                                setAccount(addr[0]);
                                onboardButton.innerText = addr[0].slice(0,13) + '...';
                                onboardButton.disabled = true;
                                onboardButton.onclick = () => {};
                                let result = await fetch(process.env.REACT_APP_ABI_URL);
                                let abi = await result.json();
                                let blockword = new web3.eth.Contract(JSON.parse(abi.result), process.env.REACT_APP_SMART_CONTRACT_ADDRESS);
                                blockword.methods.get_accounts(addr[0]).call().then(result => setPasswordAccounts(result));
                                blockword.methods.get_price().call().then(result => setPrice(result));
                                setBlockwordContract(blockword);
                            } else {
                                await changeNetwork("0x13881");
                                setNetwork("0x13881");
                            }
                        }
                    });
              };
        }
        checkMetamask();
    }, [network]);

    const isMetaMaskInstalled = () => {
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };

    const onClickInstall = () => {
        if(isMetaMaskInstalled()) {
            onClickConnect();
        }
        const onboarding = new MetaMaskOnboarding('http://localhost:9010');
        onboarding.startOnboarding();
    };

    const onClickConnect = async () => {
        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
        setNetwork("");
    }

    const checkNetwork = async () => {
        let targetNetworkId = "0x13881";
        if (window.ethereum) {
            const currentChainId = await window.ethereum.request({
              method: 'eth_chainId',
            });
            if (currentChainId === targetNetworkId) {
                return true;
            }
            return false;
        }
    }
    
    const changeNetwork = async (targetNetworkId) => {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: targetNetworkId }],
        });
    }
  
    return (
        <div className="container-fluid d-flex flex-column min-vh-100" style={{padding: "0px"}}>
            <AppHeader/>
            <div className='container'>
                <div className='row mt-3'>
                    <div className='col-md-6'>
                        {passwordAccounts.slice(0, Math.ceil(passwordAccounts.length/2)).map((account, index) => 
                            <div className='account col-md-7 ms-auto' key={index}>
                                <p className='text-center account-name'>{account[0]}</p>
                                <p className='account-text'>login: {account[1]}</p>
                                <p className='account-text mb-4'>password: {account[2]}</p>
                                <div className='row justify-content-md-center'>
                                    <button className='account-button col-md-4 me-2'>Get</button>
                                    <button className='account-button col-md-4 ms-2'>Update</button>
                                </div>
                            </div>
                        )}
                        {passwordAccounts.length % 2 === 0 && 
                        <div className='account-add col-md-7 ms-auto d-flex align-items-center justify-content-center'>
                            <img src={plus} alt="Add pasword"></img>
                        </div>}
                    </div>
                    <div className='col-md-6'>
                        {passwordAccounts.slice(Math.ceil(passwordAccounts.length/2), passwordAccounts.length).map((account, index) =>
                            <div className='account col-md-7' key={index}>
                                <p className='text-center account-name'>{account[0]}</p>
                                <p className='account-text'>login: {account[1]}</p>
                                <p className='account-text mb-4'>password: {account[2]}</p>
                                <div className='row justify-content-md-center'>
                                    <button className='account-button col-md-4 me-2'>Get</button>
                                    <button className='account-button col-md-4 ms-2'>Update</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='mt-auto'>
                <Footer />
            </div>
        </div>
   )
}

export default BlockwordApp;