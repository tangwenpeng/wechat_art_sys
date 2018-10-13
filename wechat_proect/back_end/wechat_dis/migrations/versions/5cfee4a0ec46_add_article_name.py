"""add article name

Revision ID: 5cfee4a0ec46
Revises: 64134f126430
Create Date: 2018-10-05 09:36:40.487664

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5cfee4a0ec46'
down_revision = '64134f126430'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('article', sa.Column('name', sa.String(length=20), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('article', 'name')
    # ### end Alembic commands ###
