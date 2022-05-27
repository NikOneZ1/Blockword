from brownie import exceptions

def test_not_owner_withdraw(deployed_blockword, accounts, account_data, price):
    account = accounts[1]
    tx = deployed_blockword.pay_set_account(*account_data.values(), {'amount': price, 'from': account})
    tx.wait(1)
    try:
        tx = deployed_blockword.withdraw({'from': account})
        tx.wait(1)
    except exceptions.VirtualMachineError:
        assert True
    else:
        assert False

def test_owner_withdraw(deployed_blockword, owner, account_data, price, accounts):
    account = accounts[1]
    initial_owner_balance = owner.balance()
    tx = deployed_blockword.pay_set_account(*account_data.values(), {'amount': price, 'from': account})
    tx.wait(1)
    tx = deployed_blockword.withdraw({'from': owner})
    tx.wait(1)
    owner_balance_after_withdraw = owner.balance()
    assert owner_balance_after_withdraw > initial_owner_balance

def test_not_owner_new_price(deployed_blockword, accounts):
    account = accounts[1]
    price_in_contract = deployed_blockword.get_price()
    updated_price = price_in_contract - 10
    try:
        tx = deployed_blockword.update_price(updated_price, {'from': account})
        tx.wait(1)
    except exceptions.VirtualMachineError:
        assert True
    else:
        assert False

def test_owner_new_price(deployed_blockword, owner):
    price_in_contract = deployed_blockword.get_price()
    updated_price = price_in_contract - 10
    tx = deployed_blockword.update_price(updated_price, {'from': owner})
    tx.wait(1)
    new_price_in_contract = deployed_blockword.get_price()
    assert new_price_in_contract == updated_price

def test_not_owner_transfer_ownership(deployed_blockword, accounts):
    account = accounts[1]
    new_owner = accounts[2]
    try:
        tx = deployed_blockword.transfer_ownership(new_owner, {'from': account})
        tx.wait(1)
    except exceptions.VirtualMachineError:
        assert True
    else:
        assert False

def test_owner_transfer_ownership(deployed_blockword, accounts, owner):
    new_owner = accounts[1]
    tx = deployed_blockword.transfer_ownership(new_owner, {'from': owner})
    tx.wait(1)
    tx = deployed_blockword.withdraw({'from': new_owner})
    tx.wait(1)
    assert True
