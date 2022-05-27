import pytest

@pytest.fixture
def price() -> int:
    return 10000

@pytest.fixture
def owner(accounts) -> str:
    return accounts[0]

@pytest.fixture
def deployed_blockword(owner, price, Blockword):
    blockword = Blockword.deploy(price, {'from': owner})
    return blockword

@pytest.fixture
def account_data() -> dict:
    data = {
        '_account_name': 'Account',
        '_login_hash': 'user_hash',
        '_password_hash': '12345_hash'
    }
    return data

@pytest.fixture
def account_updated_data() -> dict:
    updated_data = {
        '_account_name': 'updated_Account',
        '_login_hash': 'uodated_user_hash',
        '_password_hash': 'updated_12345_hash'
    }
    return updated_data
