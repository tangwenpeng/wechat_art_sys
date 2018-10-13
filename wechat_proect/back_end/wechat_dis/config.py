import logging
import redis
import pymysql
from datetime import timedelta


class Config(object):
    """项目配置信息类"""
    SECRET_KEY = "EjpNVSNQTyGi1VvWECj9TvC/+kq3oujee2kTfQUs8yCM6xX9Yjq52v54g+HVoknA"

    DEBUG = True

    # 数据库的配置信息
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:mysql@127.0.0.1:3306/wechat_dis"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # redis配置
    REDIS_HOST = "127.0.0.1"
    REDIS_PORT = 6379

    # session存储的配置信息
    SESSION_TYPE = "redis"
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT)
    # PERMANENT_SESSION_LIFETIME = 86400
    PERMANENT_SESSION_LIFETIME = timedelta(days=1)  # 设置过期时间为1天
    LOG_LEVEL = logging.DEBUG

    # 默认显示组数
    GROUPCOUNT = 10  # 默认显示10组


class DevelopementConfig(Config):
    DEBUG = True
    logging.DEBUG


class ProductionConfig(Config):
    DEBUG = True
    logging.WARNING


config_dict = {
    "development": DevelopementConfig,
    "production": ProductionConfig
}
