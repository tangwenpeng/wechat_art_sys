import logging
from logging.handlers import RotatingFileHandler

import redis
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from config import Config, config_dict
from flask_cors import CORS

db = SQLAlchemy()
redis_store = None


def create_app(config_name):
    # 创建Flask应用程序实例
    app = Flask(__name__)

    config_cls = config_dict[config_name]

    # 加载项目配置信息
    app.config.from_object(config_cls)
    db.init_app(app)
    # 创建redis链接对象

    global redis_store
    redis_store = redis.StrictRedis(host=Config.REDIS_HOST, port=Config.REDIS_PORT)
    # 创建Session对象
    Session(app)
    setup_logging(config_cls.LOG_LEVEL)
    # 解决跨域(全局方式)
    CORS(app, supports_credentials=True)


    from app.home import home as home_blu
    from app.admin import admin as admin_blu
    # 注册蓝图
    app.register_blueprint(home_blu)
    app.register_blueprint(admin_blu, url_prefix='/admin')

    return app


def setup_logging(log_level):
    """日志相关配置"""
    logging.basicConfig(level=log_level)
    file_log_handler = RotatingFileHandler("logs/log", maxBytes=1024 * 1024 * 100, backupCount=10)
    formatter = logging.Formatter('%(levelname)s %(filename)s:%(lineno)d %(message)s')
    file_log_handler.setFormatter(formatter)
    logging.getLogger().addHandler(file_log_handler)
