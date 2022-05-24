from smart_contracts.tests.conftest import deploy_contract


def test_deploy(deploy_contract):
    print(type(deploy_contract))
    assert 1