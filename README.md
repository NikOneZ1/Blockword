# Blockword
Blockword is web3 application for password managing. Application uses crypto wallet to encrypt and decrypt your passwords. All data saves in blockhain that is the safest place for your passwords.

 Нou can try it on this link: https://blockword.herokuapp.com/

## How to deploy and test Blockword smart contract
Install python dependencies (you must have poetry installed)
```
poetry install
```
Change directory to 'smart_contract' folder
```
cd smart_contract
```
Install ganache-cli (you must have npm installed)
```
npm install ganache-cli
```
Create .env file with this content:
```
export WEB3_INFURA_PROJECT_ID=<your_project_id> # Your project id from infura.io only for testnet deployment
export ETHERSCAN_TOKEN=<your_etherscan_token> # Your token from etherscan.io only for testnet deployment
export PRICE=<your_price> # Your price for blockword smart contract operations
```
Deploy smart contract to ganache testnet
```
poetry run brownie run deploy
```
To deploy smart contract to other testnet you have to create brownie account
```
poetry run brownie accounts new blockword-account
```
To test smart contract you can run this command
```
poetry run brownie test
```

## How to run Blockword frontend
Install node dependencies (you must have npm installed)
```
npm install
```
Set env variables in .env file in root folder
```
REACT_APP_DB_API_KEY=<your_api_key> # restdb.io api key
REACT_APP_DB_URL=<your_db_url> # restdb.io url
REACT_APP_SMART_CONTRACT_ADDRESS=<your_smart_contract_address>
REACT_APP_ABI_URL=<your_abi_url> # url to your smart contract abi api
```
Run frontend
```
npm start
```
