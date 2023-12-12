"""changed products and users

Revision ID: 17a571caf14a
Revises: 9c5183779992
Create Date: 2023-12-07 19:52:41.438588

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '17a571caf14a'
down_revision: Union[str, None] = '9c5183779992'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('products', sa.Column('price', sa.DECIMAL(precision=16, scale=4), nullable=False))
    op.alter_column('products', 'description',
                    existing_type=sa.VARCHAR(),
                    nullable=True)
    op.alter_column('users', 'language_code',
                    existing_type=sa.VARCHAR(length=255),
                    type_=sa.VARCHAR(length=10),
                    existing_nullable=False)
    # op.drop_column('users', 'username')
    # op.add_column('users', sa.Column('user_name', sa.VARCHAR(length=255), nullable=False))
    # Well! I actually renamed the column
    op.alter_column('users', 'username', new_column_name='user_name')
    # description: Mapped[Optional[str]] = mapped_column(VARCHAR(3000), nullable=True)
    op.alter_column('products', 'description', type_=sa.VARCHAR(length=3000))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    # op.add_column('users', sa.Column('username', sa.VARCHAR(length=255), autoincrement=False, nullable=False))
    op.alter_column('users', 'language_code',
                    existing_type=sa.VARCHAR(length=10),
                    type_=sa.VARCHAR(length=255),
                    existing_nullable=False)
    # op.drop_column('users', 'user_name')
    op.alter_column('products', 'description',
                    existing_type=sa.VARCHAR(),
                    nullable=False)
    op.alter_column('users', 'user_name', new_column_name='username')
    op.drop_column('products', 'price')
    op.alter_column('products', 'description', type_=sa.TEXT)
    # ### end Alembic commands ###
