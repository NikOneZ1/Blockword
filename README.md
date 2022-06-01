# Blockword
Blockword is web3 application for password managing. Application uses crypto wallet to encrypt and decrypt your passwords. All data saves in blockhain that is the safest place for your passwords.

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
