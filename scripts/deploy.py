from brownie import accounts, Blockword, network, Contract

def get_account():
    if network.show_active() == "development":
        return accounts[0]
    else:
        return accounts.load('blockword-account')

def main():
    account = get_account()
    print(account)
    blockword = Blockword.deploy({'from': account}, publish_source=True)
