from brownie import accounts, Blockword, network, config

def get_account() -> str:
    if network.show_active() == "development":
        return accounts[0]
    else:
        return accounts.load('blockword-account')

def main():
    account = get_account()
    print(f"Account: {account}")
    publish_source = False if network.show_active() == "development" else True
    blockword = Blockword.deploy(config["price"], {'from': account}, publish_source=publish_source)
