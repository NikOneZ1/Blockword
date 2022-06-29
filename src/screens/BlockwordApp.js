import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import plus from '../media/plus.svg';
import Footer from '../components/footer';
import AppHeader from '../components/app_header';
import MetaMaskOnboarding from '@metamask/onboarding';
import {encrypt} from '@metamask/eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';

const BlockwordApp = () => {
    const [account, setAccount] = useState();
    const [blockword_contract, setBlockwordContract] = useState();
    const [price, setPrice] = useState();
    const [passwordAccounts, setPasswordAccounts] = useState([]);
    const [network, setNetwork] = useState();
    const [showAddModal, setShowAddModal] = useState(false);
    const [createPasswordName, setCreatePasswordName] = useState('');
    const [createPasswordLogin, setCreatePasswordLogin] = useState('');
    const [createPasswordPassword, setCreatePasswordPassword] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [encryptionPublicKey, setEncryptionPublicKey] = useState('');

    useEffect(() => {
        const onClickInstall = () => {
            if(isMetaMaskInstalled()) {
                onClickConnect();
            }
            const onboarding = new MetaMaskOnboarding('http://localhost:9010');
            onboarding.startOnboarding();
        };

        const filterAccounts = accounts => {
            accounts = [...accounts];
            for( var i = 0; i < accounts.length; i++){ 
                if (accounts[i][0] === '' && accounts[i][1] === '') {
                    accounts.splice(i, 1);
                }
                setPasswordAccounts(accounts);
            }
        }

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
                                blockword.methods.get_accounts(addr[0]).call().then(result => filterAccounts(result));
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

    useEffect(() => {
        if (encryptionPublicKey) {
            createPassword();
        }
    }, [encryptionPublicKey])

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

    const showHideAddModal = () => {
        setShowAddModal(!showAddModal);
        if(!showAddModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }

    const filterAccounts = accounts => {
        accounts = [...accounts];
        for( var i = 0; i < accounts.length; i++){ 
            if (accounts[i][0] === '' && accounts[i][1] === '') {
                accounts.splice(i, 1);
            }
            setPasswordAccounts(accounts);
        }
    }
    
    const getEncryptionPublicKey = async () => {
        await window.ethereum.request({method: 'eth_getEncryptionPublicKey', params: [account]}).then((result) => {
            setEncryptionPublicKey(result);
        }).catch((error) => {
            return false;
        });
    }

    const setDecryptedPassword = (index, password, ) => {
        let account_list_copy = [...passwordAccounts];
        console.log(account_list_copy);
        let account_copy = [...account_list_copy[index]];
        account_copy[2] = password;
        account_list_copy[index] = account_copy;
        setPasswordAccounts(account_list_copy);
    }

    const setDecryptedLogin = (index, login, ) => {
        let account_list_copy = [...passwordAccounts];
        console.log(account_list_copy);
        let account_copy = [...account_list_copy[index]];
        account_copy[1] = login;
        account_list_copy[index] = account_copy;
        setPasswordAccounts(account_list_copy);
    }

    const setDecryptedData = (login, password, index) => {
        let account_list_copy = [...passwordAccounts];
        let account_copy = [...account_list_copy[index]];
        account_copy[1] = login;
        account_copy[2] = password;
        account_list_copy[index] = account_copy;
        setPasswordAccounts(account_list_copy);
    }

    const decryptPassword = async (decrypted_login, password, index) => {
        window.ethereum.request({method: 'eth_decrypt', params: [password, account]}).then((decryptedMessage) => 
        setDecryptedData(decrypted_login, decryptedMessage, index)).catch((error) => console.log(error.message));
    }

    const decryptData = async (login, password, index) => {
        window.ethereum.request({method: 'eth_decrypt', params: [login, account]}).then((decryptedMessage) => 
        decryptPassword(decryptedMessage, password, index)).catch((error) => console.log(error.message));
    }

    // TODO implement update function

    // TODO implement delete function

    // TODO implement search function

    // TODO implement encryption and decryption functions

    const createPassword = async () => {
        setShowMessage(true);
        setMessageText('Your password will be added after a successful transaction');
        showHideAddModal();
        let encrypted_password = bufferToHex(Buffer.from(JSON.stringify(
                encrypt({publicKey: encryptionPublicKey, data: createPasswordPassword, version: 'x25519-xsalsa20-poly1305'})
            ), 'utf8'));
        let encrypted_login = bufferToHex(Buffer.from(JSON.stringify(
                encrypt({publicKey: encryptionPublicKey, data: createPasswordLogin, version: 'x25519-xsalsa20-poly1305'})
            ), 'utf8'));
        setEncryptionPublicKey(false);
        let result = await blockword_contract.methods.pay_set_account(createPasswordName, encrypted_login, encrypted_password).send({ from: account, value: price })
        .on("receipt", function(receipt) {
            blockword_contract.methods.get_accounts(account).call().then(result => filterAccounts(result));
            showHideAddModal();
        })
        .on("error", function(error) {
            setMessageText('An error occurred while processing the transaction');
            setShowMessage(true);
        });
        // TODO encrypt password before creating
        // TODO add form validation
    }
  
    return (
        <div className="container-fluid d-flex flex-column min-vh-100" style={{padding: "0px"}}>
            <AppHeader/>
            {showMessage &&
            <div className='row justify-content-center'>
                <div className="alert d-flex flex-wrap align-items-center justify-content-beetween alert-warning alert-dismissible fade show col-md-8 mt-1" style={{backgroundColor: "black", color: "white", border: "0px", borderRadius: '15px'}}>
                    <p id="message-text" className='account-text' style={{padding: '0', fontSize: '20px', margin: '0'}}>{messageText}</p>
                    <button type="button" onClick={() => {setShowMessage(false)}} className="close-alert-btn col-md-2 ms-auto">Close</button>
                </div>
            </div>
            }
            <div className='container' id='app-page'>
                <div className='row mt-3'>
                    <div className='col-md-6'>
                        {passwordAccounts.slice(0, Math.ceil(passwordAccounts.length/2)).map((account, index) => 
                            <div className='account col-md-7 ms-auto' key={index}>
                                <p className='text-center account-name'>{account[0]}</p>
                                <p className='account-text'>login: {account[1]}</p>
                                <p className='account-text mb-4'>password: {account[2]}</p>
                                <div className='row justify-content-md-center'>
                                    <button className='account-button col-md-4 me-2' onClick={() => {decryptData(account[1], account[2], index)}}>Get</button>
                                    <button className='account-button col-md-4 ms-2'>Update</button>
                                </div>
                            </div>
                        )}
                        {passwordAccounts.length % 2 === 0 && 
                        <div onClick={showHideAddModal} className='account-add col-md-7 ms-auto d-flex align-items-center justify-content-center'>
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
                                    <button className='account-button col-md-4 me-2' onClick={() => {decryptData(account[1], account[2], Math.ceil(passwordAccounts.length/2)+index)}}>Get</button>
                                    <button className='account-button col-md-4 ms-2'>Update</button>
                                </div>
                            </div>
                        )}
                        {passwordAccounts.length % 2 !== 0 && 
                        <div onClick={showHideAddModal} className='account-add col-md-7 d-flex align-items-center justify-content-center'>
                            <img src={plus} alt="Add pasword"></img>
                        </div>}
                    </div>
                </div>
            </div>
            <div className='overlay' onClick={showHideAddModal} style={showAddModal === true ?
                {display: "block"} :
                {display: "none"}
            }></div>
            <div className={showAddModal ===true ? 'add-modal col-md-4 d-flex justify-content-center' : ''} id="add-modal" style={showAddModal === true ?
                {display: "block"} :
                {display: "none"}
            }>
                <div className='col-md-10 mt-5 mb-5 text-center'>
                    <p className='modal-text'>NAME</p>
                    <input className='modal-input col-md-10 text-center' id="name" type="text" name="name" onChange={(e) => setCreatePasswordName(e.target.value)}/>
                    <p className='modal-text mt-4'>LOGIN</p>
                    <input className='modal-input col-md-10 text-center' id="login" type="text" name="login" onChange={(e) => setCreatePasswordLogin(e.target.value)}/>
                    <p className='modal-text mt-4'>PASSWORD</p>
                    <input className='modal-input col-md-10 text-center' id="password" type="text" name="password" onChange={(e) => setCreatePasswordPassword(e.target.value)}/>
                    <button className='account-button col-md-4 mt-5' onClick={getEncryptionPublicKey}>Create</button>
                </div>
            </div>
            <div className='mt-auto'>
                <Footer />
            </div>
        </div>
   )
}

export default BlockwordApp;