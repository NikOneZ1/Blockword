from brownie import exceptions


def test_set_account(deployed_blockword, price, accounts):
    data = {
        '_account_name': 'Account',
        '_login_hash': 'user_hash',
        '_password_hash': '12345_hash'
    }
    account = accounts[1]
    try:
        tx = deployed_blockword.set_account(data['_account_name'], data['_login_hash'], 
                                            data['_password_hash'], {'amount': price, 'from': account})
        tx.wait(1)
    except AttributeError:
        assert True
    else:
        assert False

def test_pay_set_account(deployed_blockword, price, accounts):
    data = {
        '_account_name': 'Account',
        '_login_hash': 'user_hash',
        '_password_hash': '12345_hash'
    }
    account = accounts[1]
    tx = deployed_blockword.pay_set_account(data['_account_name'], data['_login_hash'], 
                                            data['_password_hash'], {'amount': price, 'from': account})
    tx.wait(1)
    retrieved_accounts = deployed_blockword.get_accounts(account)
    assert retrieved_accounts[0] == tuple(data.values())

def test_pay_set_account_other_price(deployed_blockword, price, accounts):
    data = {
        '_account_name': 'Account',
        '_login_hash': 'user_hash',
        '_password_hash': '12345_hash'
    }
    account = accounts[1]
    try:
        tx = deployed_blockword.pay_set_account(data['_account_name'], data['_login_hash'], 
                                                data['_password_hash'], {'amount': price-1, 'from': account})
        tx.wait(1)
    except exceptions.VirtualMachineError:
        assert True
    else:
        assert False

def test_update_account(deployed_blockword, price, accounts):
    data = {
        '_account_name': 'Account',
        '_login_hash': 'user_hash',
        '_password_hash': '12345_hash'
    }
    updated_data = {
        '_account_name': 'Account',
        '_login_hash': 'user_hash',
        '_password_hash': '12345_hash'
    }
    account = accounts[1]
    tx = deployed_blockword.pay_set_account(data['_account_name'], data['_login_hash'], 
                                            data['_password_hash'], {'amount': price, 'from': account})
    tx.wait(1)
    try:
        tx = deployed_blockword.update_account(0, data['_account_name'], data['_login_hash'], 
                                               data['_password_hash'], {'amount': price, 'from': account})
        tx.wait(1)
    except AttributeError:
        assert True
    else:
        assert False
