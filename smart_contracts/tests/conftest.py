import py
import pytest

@pytest.fixture
def deploy_contract(accounts, Blockword):
    account = accounts[0]
    blockword = Blockword.deploy(100000, {'from': account})
    return blockword
