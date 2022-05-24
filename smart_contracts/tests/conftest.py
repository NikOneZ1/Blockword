import pytest

@pytest.fixture
def price():
    return 10000

@pytest.fixture
def owner(accounts):
    return accounts[0]

@pytest.fixture(autouse=True)
def deployed_blockword(owner, price, Blockword):
    blockword = Blockword.deploy(price, {'from': owner})
    return blockword
