from flask import jsonify, request
from . import home
from app.models import Group, Article
from config import Config


@home.route('/Api/<int:page>', methods=['GET', 'POST'])
@home.route('/Api', methods=['GET', 'POST'])
def index(page=1):
    """
    主页显示组别
    """
    if request.method == 'POST':
        # 获取前端请求数据
        if not request.json or not 'group_id' in request.json:
            return jsonify({'code': 0, 'message': 'Missing Parameters'})
        group_id = request.get_json().get('group_id')
        try:
            articles = Article.query.filter_by(group_id=group_id, is_delete=0)
            urls = [Article.to_dict(article) for article in articles]
            if len(urls) < 1:
                return jsonify({'code': 0, 'message': 'Data Not Found'})
            return jsonify({'code': 1, 'urls': urls, 'message': 'Success'})
        except:
            return jsonify({'code': 0, 'message': 'Database query failed'})
    else:
        # 显示所有组别以及默认返回第一组的文章链接
        current_page = request.args.get('current_page', page)
        g_count = Config.GROUPCOUNT
        group_count = request.args.get('group_count', g_count)  # 默认一页显示10组
        try:
            pagination = Group.query.filter_by(is_delete=0).paginate(current_page, group_count, error_out=False)
            groups = pagination.items
            groups = [Group.to_dict(group) for group in groups]
            count = Group.query.filter_by(is_delete=0).count()
            group_id = (page - 1) * g_count + 1  # 比如点击第一页的时候默认显示第一组的文章链接，点击第二页的时候默认显示第十一组的文章链接
            articles = Article.query.filter_by(group_id=group_id, is_delete=0)
            urls = [Article.to_dict(article) for article in articles]
            if len(urls) < 1:
                urls = 'Data Not Found'
            return jsonify({'code': 1, 'groups': groups, 'count': count, 'urls': urls, 'message': 'Success'})
        except:
            return jsonify({'code': 0, 'message': 'Database query failed'})


