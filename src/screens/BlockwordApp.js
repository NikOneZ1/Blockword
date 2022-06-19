import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import Footer from '../components/footer';
import AppHeader from '../components/app_header';

const BlockwordApp = () => {
    const [account, setAccount] = useState();
    const [blockword_contract, setBlockwordContract] = useState();
    const [price, setPrice] = useState();

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
                    let result = await fetch(process.env.REACT_APP_ABI_URL);
                    let abi = await result.json();
                    let blockword = new web3.eth.Contract(JSON.parse(abi.result), process.env.REACT_APP_SMART_CONTRACT_ADDRESS);
                    blockword.methods.get_accounts(addr[0]).call().then(result => console.log(result));
                    setBlockwordContract(blockword);
                    blockword.methods.get_price().call().then(result => setPrice(result));
                });
        };
        checkConnection();
    }, []);
  
    async function connect_wallet() {
        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.requestAccounts();
        let result = await fetch(process.env.REACT_APP_ABI_URL);
        let abi = await result.json();
        let blockword = new web3.eth.Contract(JSON.parse(abi.result), process.env.REACT_APP_SMART_CONTRACT_ADDRESS);
        blockword.methods.get_accounts(accounts[0]).call().then(result => console.log(result));
        setBlockwordContract(blockword);
        setAccount(accounts[0]);
        blockword.methods.pay_set_account("account_name", "login_hash", "password_hash").send({
            from: accounts[0],
            value: price
        }).on("receipt", function(receipt){
            console.log(receipt);
            blockword.methods.get_accounts(accounts[0]).call().then(result => console.log(result));
        });
    }
  
    return (
        <div className="container-fluid d-flex flex-column min-vh-100" style={{padding: "0px"}}>
            <AppHeader />
            <button onClick={connect_wallet}>Connect MetaMask Wallet</button>
            Your account is: {account}
            <div className='mt-auto'>
                <Footer />
            </div>
        </div>
   )
}

export default BlockwordApp;