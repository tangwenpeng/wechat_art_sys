from app import db, create_app
from flask_script import Manager
from flask_migrate import MigrateCommand, Migrate

app = create_app('production')
manage = Manager(app)
Migrate(app, db)
manage.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manage.run()
