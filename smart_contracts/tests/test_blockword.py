from brownie import exceptions


def test_set_account(deployed_blockword, price, accounts, account_data):
    account = accounts[1]
    try:
        tx = deployed_blockword.set_account(*account_data.values(), {'amount': price, 'from': account})
        tx.wait(1)
    except AttributeError:
        assert True
    else:
        assert False

def test_pay_set_account(deployed_blockword, price, accounts, account_data):
    account = accounts[1]
    tx = deployed_blockword.pay_set_account(*account_data.values(), {'amount': price, 'from': account})
    tx.wait(1)
    retrieved_accounts = deployed_blockword.get_accounts(account)
    assert retrieved_accounts[0] == tuple(account_data.values())

def test_pay_set_account_other_price(deployed_blockword, price, accounts, account_data):
    account = accounts[1]
    try:
        tx = deployed_blockword.pay_set_account(*account_data.values(), {'amount': price-1, 'from': account})
        tx.wait(1)
    except exceptions.VirtualMachineError:
        assert True
    else:
        assert False

def test_update_account(deployed_blockword, price, accounts, account_data, account_updated_data):
    account = accounts[1]
    tx = deployed_blockword.pay_set_account(*account_data.values(), {'amount': price, 'from': account})
    tx.wait(1)
    try:
        tx = deployed_blockword.update_account(0, *account_updated_data.values(), {'amount': price, 'from': account})
        tx.wait(1)
    except AttributeError:
        assert True
    else:
        assert False

def test_pay_update_account(deployed_blockword, price, accounts, account_data, account_updated_data):
    account = accounts[1]
    tx = deployed_blockword.pay_set_account(*account_data.values(), {'amount': price, 'from': account})
    tx.wait(1)
    tx = deployed_blockword.pay_update_account(0,*account_updated_data.values(), {'amount': price, 'from': account})
    tx.wait(1)
    retrieved_accounts = deployed_blockword.get_accounts(account)
    assert retrieved_accounts[0] == tuple(account_updated_data.values())

def test_pay_update_account_other_price(deployed_blockword, price, accounts, account_data, account_updated_data):
    account = accounts[1]
    tx = deployed_blockword.pay_set_account(*account_data.values(), {'amount': price, 'from': account})
    tx.wait(1)
    try:
        tx = deployed_blockword.pay_update_account(0, *account_updated_data.values(), {'amount': price-1, 'from': account})
        tx.wait(1)
    except exceptions.VirtualMachineError:
        assert True
    else:
        assert False

def test_delete_account(deployed_blockword, price, accounts, account_data):
    deleted_account = ('', '', '')
    account = accounts[1]
    tx = deployed_blockword.pay_set_account(*account_data.values(), {'amount': price, 'from': account})
    tx.wait(1)
    retrieved_accounts = deployed_blockword.get_accounts(account)
    assert retrieved_accounts[0] == tuple(account_data.values())
    tx = deployed_blockword.delete_account(0, {'from': account})
    tx.wait(1)
    retrieved_accounts = deployed_blockword.get_accounts(account)
    assert retrieved_accounts[0] == deleted_account
