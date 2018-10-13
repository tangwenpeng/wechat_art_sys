from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


class BaseModel(object):
    '''创建时间和修改时间'''
    create_time = db.Column(db.DateTime, default=datetime.now)  # 创建的时间
    update_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)  # 记录的更新时间


class Article(db.Model, BaseModel):
    '''文章'''
    __tablename__ = 'article'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # 主键，自增长
    name = db.Column(db.String(20))  # 链接名称
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'))  # 组别
    url = db.Column(db.String(255))  # 文章链接
    is_delete = db.Column(db.String(1), default='0')  # 0：正常 1：删除

    def __repr__(self):
        return '<Article %r>' % self.name

    def to_dict(self):
        '''将对象转换为字典数据'''
        article_dict = {
            'article_id': self.id,
            'group_id': self.group_id,
            'article_name': self.name,
            'url': self.url,
            'create_time': self.create_time.strftime("%Y-%m-%d %H:%M:%S"),
            'update_time': self.update_time.strftime("%Y-%m-%d %H:%M:%S"),
        }
        return article_dict


class Group(db.Model, BaseModel):
    '''组别'''
    __tablename__ = 'group'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # 主键，自增长
    articles = db.relationship('Article', backref='group', lazy='dynamic')  # 文章，组和文章是一对多的关系
    name = db.Column(db.String(20))  # 组名
    is_delete = db.Column(db.String(1), default='0')  # 0：正常 1：删除

    def __repr__(self):
        return '<Group %r>' % self.name

    def to_dict(self):
        '''将对象转换为字典数据'''
        group_dict = {
            'group_id': self.id,
            'name': self.name,
        }
        return group_dict


class User(db.Model, BaseModel):
    '''用户表'''
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  # 主键，自增长
    username = db.Column(db.String(20))  # 用户名
    password = db.Column(db.String(20))  # 密码
    password_hash = db.Column(db.String(255))  # 密码哈希值
    is_admin = db.Column(db.String(1), default='0')  # 0：普通用户 1：管理员
    is_delete = db.Column(db.String(1), default='0')  # 0：正常 1：删除

    def __repr__(self):
        return '<User %r>' % self.username

    def set_password(self, password):
        '''在用户注册的时候使用，会调用generate_password_hash()并将password参数传给它，将它的返回值存储在列属性password_hash中'''
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        '''在用户验证的时候使用，会调用check_password_hash()并将数据库存储的哈希值和用户输入的密码传给它，并返回它的返回值，如果是True则表示密码正确'''
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        '''将对象转换为字典数据'''
        user_dict = {
            "user_id": self.id,
            "username": self.username,
            "create_time": self.create_time.strftime("%Y-%m-%d %H:%M:%S"),
            "is_admin":self.is_admin,
            "is_delete":self.is_delete
        }
        return user_dict
