from flask import jsonify, request, session
from . import admin
from app.models import Group, Article, User
from .NumToCN import turn
from app import db
from .auth import generate_token, verify_token
import re


@admin.route('/Api/showGroup', methods=['GET', 'POST'])
def show_group():
    """
    显示组别且可以添加组
    """
    token = request.headers.get('Authorization')
    data = verify_token(token)  # 校验token
    if data == False:
        return jsonify({'code': 0, 'message': 'Token Certificate Failed'})

    if request.method == 'POST':
        # 获取前端请求数据，添加组
        if not request.json or not 'add_group' in request.json:
            return jsonify({'code': 0, 'message': 'Missing Parameters'})
        add_group = request.get_json().get('add_group')
        if add_group == '1':
            try:
                count = Group.query.count()
                num = int(count) + 1
                hans = turn(num)  # 转换成中文
                new_group = Group()
                new_group.name = hans + '组'
                db.session.add(new_group)
                try:
                    db.session.commit()
                except Exception as e:
                    db.session.rollback()
                    return jsonify({'code': 0, 'message': 'Server error'})
                return jsonify({'code': 1, 'message': 'Success'})
            except:
                return jsonify({'code': 0, 'message': 'Database query failed'})
        return jsonify({'code': 0, 'message': 'Parameter Error'})
    else:
        # 显示所有组别
        try:
            groups = Group.query.filter_by(is_delete=0)
            groups = [Group.to_dict(group) for group in groups]
            count = Group.query.filter_by(is_delete=0).count()
            return jsonify({'code': 1, 'groups': groups, 'count': count, 'message': 'Success'})
        except Exception as e:
            return jsonify({'code': 0, 'message': 'Database query failed'})


@admin.route('/Api/delGroup', methods=['POST'])
def del_group():
    """
    删除组且删掉该组下面的所有文章链接
    :return:
    """
    token = request.headers.get('Authorization')
    data = verify_token(token)  # 校验token
    if data == False:
        return jsonify({'code': 0, 'message': 'Token Certificate Failed'})

    if not request.json or not 'group_id' in request.json:
        return jsonify({'code': 0, 'message': 'Missing Parameters'})
    group_id = request.get_json().get('group_id')
    try:
        gruop = Group.query.filter_by(id=group_id).first()
        gruop.is_delete = 1
        db.session.add(gruop)
        articles = Article.query.filter_by(group_id=group_id)
        if articles != None:
            for article in articles:
                article.is_delete = 1
                db.session.add(article)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'code': '0', 'message': 'Server error'})
    return jsonify({'code': '1', 'message': 'Success'})


@admin.route('/Api/addUrl', methods=['POST'])
def add_url():
    """
    添加链接
    """
    token = request.headers.get('Authorization')
    data = verify_token(token)  # 校验token
    if data == False:
        return jsonify({'code': 0, 'message': 'Token Certificate Failed'})
    if not request.json or not 'group_id' in request.json or not 'url' in request.json:
        return jsonify({'code': 0, 'message': 'Missing Parameters'})
    url = request.get_json().get('url')
    pattern = re.compile(r'https://mp.weixin.qq.com/s/')  # 校验是否是微信文章的链接
    match = pattern.match(url)
    if not match:
        return jsonify({'code': '0', 'message': 'This link is not a WeChat article link'})
    group_id = request.get_json().get('group_id')
    group = Group.query.filter_by(id=group_id, is_delete=0).first()
    if not group:
        return jsonify({'code': '0', 'message': 'Data does not exist'})
    try:
        count = Article.query.filter_by(group_id=group_id).count()
    except Exception as e:
        return jsonify({'code': '0', 'message': 'Query Database Faid'})
    num = int(count) + 1
    hans = turn(num)  # 转换成中文
    new_article = Article()
    new_article.url = url
    new_article.name = '第' + group.name + '/' + '第' + hans + '篇'
    new_article.group_id = group_id
    try:
        db.session.add(new_article)
        db.session.commit()
    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({'code': '0', 'message': 'Server error'})
    return jsonify({'code': '1', 'message': 'Success'})


@admin.route('/Api/modifyUrl/<int:group_id>', methods=['POST', 'GET'])
@admin.route('/Api/modifyUrl', methods=['POST', 'GET'])
def modify_url(group_id=1):
    """
    根据文章显示名修改文章对应的链接
    :return:
    """
    token = request.headers.get('Authorization')
    data = verify_token(token)  # 校验token
    if data == False:
        return jsonify({'code': 0, 'message': 'Token Certificate Failed'})
    if request.method == 'POST':
        if not request.json or not 'article_id' in request.json or not 'url' in request.json:
            return jsonify({'code': 0, 'message': 'Missing Parameters'})
        article_id = request.get_json().get('article_id')
        url = request.get_json().get('url')
        pattern = re.compile(r'https://mp.weixin.qq.com/s/')  # 校验是否是微信文章的链接
        match = pattern.match(url)
        if not match:
            return jsonify({'code': '0', 'message': 'This link is not a WeChat article link'})
        try:
            article = Article.query.filter_by(id=article_id).first()
        except:
            return jsonify({'code': '0', 'message': 'Data Not Found'})
        article.url = url
        db.session.add(article)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return jsonify({'code': '0', 'message': 'Server error'})
        return jsonify({'code': '1', 'message': 'Success'})
    else:
        group_id = request.args.get('group_id', group_id)
        articles = Article.query.filter_by(group_id=group_id, is_delete=0)
        urls = [Article.to_dict(article) for article in articles]
        if len(urls) < 1:
            urls = 'Data Not Found'
        return jsonify({'code': 1, 'urls': urls, 'message': 'Success'})


@admin.route('/Api/delUrl', methods=['POST'])
def del_url():
    """
    删除文章链接
    :return:
    """
    token = request.headers.get('Authorization')
    data = verify_token(token)  # 校验token
    if data == False:
        return jsonify({'code': 0, 'message': 'Token Certificate Failed'})
    if not request.json or not 'article_id' in request.json:
        return jsonify({'code': 0, 'message': 'Missing Parameters'})
    article_id = request.get_json().get('article_id')
    try:
        article = Article.query.filter_by(id=article_id).first()
    except Exception as e:
        return jsonify({'code': '0', 'message': 'Server Eroor'})
    article.is_delete = 1
    db.session.add(article)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'code': '0', 'message': 'Server error'})
    return jsonify({'code': '1', 'message': 'Success'})


@admin.route('/Api/RAM/register', methods=['POST'])
def register():
    """
    后台注册
    """
    if not request.json or not 'username' in request.json or not 'password' in request.json:
        return jsonify({'code': 0, 'message': 'Missing Parameters'})
    username = request.get_json().get('username')
    password = request.get_json().get('password')
    if username == "" or password == "":
        return jsonify({'code': 0, 'message': 'username and password can not be empty '})
    try:
        user = User.query.filter_by(username=username).first()
        if user:
            return jsonify({'code': '0', 'message': 'User Already Exist'})
    except Exception as e:
        return jsonify({'code': '0', 'message': 'Server Eroor'})
    new_user = User()
    new_user.username = username
    new_user.set_password(password)
    if 'is_admin' in request.json:
        is_admin = request.get_json().get('is_admin')
        if is_admin == '1':
            new_user.is_admin = 1
    db.session.add(new_user)
    try:
        db.session.commit()
    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({'code': '0', 'message': 'Register Error'})
    return jsonify({'code': '1', 'message': 'Register Success'})


@admin.route('/Api/login', methods=['POST'])
def login():
    """
    后台登录
    """
    if not request.json or not 'username' in request.json or not 'password' in request.json:
        return jsonify({'code': 0, 'message': 'Missing Parameters'})
    username = request.get_json().get('username')
    password = request.get_json().get('password')
    try:
        user = User.query.filter_by(username=username).first()
    except Exception as e:
        return jsonify({'code': '0', 'message': 'User Not Exist'})
    if not user.check_password(password):
        return jsonify({'code': '0', 'message': 'password error'})
    session["username"] = username
    session["user_id"] = user.id
    session.permanent = True
    # 登录验证成功后生成一个token存在redis中，设置了有效期24h，并返回
    token = generate_token(username=username).decode('ascii')
    data = {
        'user_id': user.id,
        'username': user.username,
        'token': token,
        'is_admin': user.is_admin
    }
    return jsonify({'code': '1', 'data': data, 'message': 'Login Success'})


@admin.route('/Api/logout', methods=['GET'])
def logout():
    """
    注销
    :return:
    """
    session.clear()
    return jsonify({'code': '1', 'message': 'Logout Success'})


@admin.route('/Api/retrievePassword', methods=['POST'])
def retrieve_password():
    """
    忘记密码并重置密码
    """
    if not request.json or not 'username' in request.json or not 'new_password' in request.json:
        return jsonify({'code': 0, 'message': 'Missing Parameters'})
    username = request.get_json().get('username')
    new_password = request.get_json().get('new_password')
    try:
        user = User.query.filter_by(username=username).first()
        if user:
            user.password = new_password
            db.session.add(user)
            try:
                db.session.commit()
            except:
                db.session.rollback()
                return jsonify({'code': '0', 'message': 'Failed Commit'})
        else:
            return jsonify({'code': '0', 'message': 'User Not Exist'})
    except Exception as e:
        return jsonify({'code': '0', 'message': 'Database query failed'})
    return jsonify({'code': '1', 'message': 'Modify Success'})


@admin.route('/Api/showUsers', methods=['POST', 'GET'])
def show_users():
    """
    查看所有用户以及删除用户
    :return:
    """
    token = request.headers.get('Authorization')
    data = verify_token(token)  # 校验token
    if data == False:
        return jsonify({'code': 0, 'message': 'Token Certificate Failed'})
    username = session.get('username')
    try:
        user = User.query.filter_by(username=username).first()
    except Exception as e:
        return jsonify({'code': '0', 'message': 'Database query failed'})
    if user.is_admin == '1':
        if request.method == 'POST':
            if not request.json or not 'user_id' in request.json:
                return jsonify({'code': 0, 'message': 'Missing Parameters'})
            user_id = request.get_json().get('user_id')
            try:
                user = User.query.filter_by(id=user_id, is_delete=0).first()
            except Exception as e:
                return jsonify({'code': '0', 'message': 'Database query failed'})
            user.is_delete = 1
            db.session.add(user)
            try:
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                return jsonify({'code': '0', 'message': 'Delete failed'})
            return jsonify({'code': '1', 'message': 'Delete Success'})
        else:
            users = User.query.all()
            users_info = [User.to_dict(user) for user in users]
            return jsonify({'code': '1', 'users': users_info, 'message': 'Query Success'})
    else:
        return jsonify({'code': '1', 'message': 'Permission denied'})
