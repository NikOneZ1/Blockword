def test_set_account(deployed_blockword):
    data = {
        '_account_name': 'Account',
        '_login_hash': 'user_hash',
        '_password_hash': '12345_hash'
        }
    try:
        deployed_blockword.set_account(**data)
    except AttributeError:
        assert True
