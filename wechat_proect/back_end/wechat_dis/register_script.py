import requests
print('--------------------后台管理系统---------------------')
print('1:普通成员账号注册 2:管理员账户注册  3:修改密码 4:退出')
while 1:
    serial_number = input('请选择对应序号并输入:')
    try:
        serial_number = int(serial_number)
        if serial_number == 1:
            username = input('用户名：')
            password = input('密码：')
            url = 'http://192.168.1.199:8888/admin/Api/RAM/register'
            data = {
                'username': username,
                'password': password,
            }
            req = requests.post(url=url, json=data)
            response = req.json()
            print(response.get('message'))
        if serial_number == 2:
            username = input('用户名：')
            password = input('密码：')
            url = 'http://192.168.1.199:8888/admin/Api/RAM/register'
            data = {
                'username': username,
                'password': password,
                'is_admin': 1
            }
            req = requests.post(url=url, json=data)
            response = req.json()
            print(response.get('message'))
        if serial_number == 3:
            username = input('用户名：')
            new_password = input('新密码：')
            url = 'http://192.168.1.199:8888/admin/Api/retrievePassword'
            data = {
                'username': username,
                'new_password': new_password,
            }
            req = requests.post(url=url, json=data)
            response = req.json()
            print(response.get('message'))
        if serial_number == 4:
            break
    except:
        print('请输入整数:')
