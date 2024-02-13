from datetime import datetime
from typing import Optional, List

from sqlalchemy import BIGINT, VARCHAR, func, ForeignKey, Integer, DECIMAL
from sqlalchemy.dialects.postgresql import TIMESTAMP
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, declared_attr, relationship
from typing_extensions import Annotated


class Base(DeclarativeBase):
    pass


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, nullable=False, server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP, nullable=False, server_default=func.now(), onupdate=func.now()
    )


class TableNameMixin:

    @declared_attr.directive
    def __tablename__(cls) -> str:
        return cls.__name__.lower() + "s"


"""
CREATE TABLE users
(
    telegram_id   BIGINT PRIMARY KEY,
    full_name     VARCHAR(255) NOT NULL,
    username      VARCHAR(255),
    language_code VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP DEFAULT NOW(),
    referrer_id   BIGINT,
    FOREIGN KEY (referrer_id)
        REFERENCES users (telegram_id)
        ON DELETE SET NULL
);
"""

"""
class User(Base, TimestampMixin, TableNameMixin):
    #__tablename__ = 'users'

    telegram_id: Mapped[int] = mapped_column(BIGINT, primary_key=True, nullable=False)
    full_name: Mapped[str] = mapped_column(VARCHAR(255))
    username: Mapped[str] = mapped_column(VARCHAR(255), nullable=True)
    language_code: Mapped[str] = mapped_column(VARCHAR(255), nullable=False)
    referrer_id: Optional[Mapped[int]] = mapped_column(BIGINT, ForeignKey(
        'users.telegram_id', ondelete='SET NULL'), nullable=True
                                                       )

    referrer: relationship("User")
"""

int_pk = Annotated[int, mapped_column(Integer, primary_key=True, nullable=False)]

user_fk = Annotated[int, mapped_column(BIGINT, ForeignKey("users.telegram_id", ondelete="SET NULL"))]

str_255 = Annotated[str, mapped_column(VARCHAR(255), nullable=False)]


class User(Base, TimestampMixin, TableNameMixin):
    telegram_id: Mapped[int] = mapped_column(BIGINT, primary_key=True, autoincrement=False)
    full_name: Mapped[str_255]
    user_name: Mapped[Optional[str_255]]
    # language_code: Mapped[str_255]
    language_code: Mapped[str] = mapped_column(VARCHAR(10), nullable=False)
    referrer_id: Mapped[Optional[user_fk]]

    orders: Mapped[List["Order"]] = relationship(back_populates="user")

"""
CREATE TABLE products
(
    product_id  SERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    created_at  TIMESTAMP DEFAULT NOW()
);
"""


class Product(Base, TimestampMixin, TableNameMixin):
    product_id: Mapped[int_pk]
    title: Mapped[str_255]
    # description: Mapped[Optional[str]]
    description: Mapped[Optional[str]] = mapped_column(VARCHAR(3000), nullable=True)
    price: Mapped[float] = mapped_column(DECIMAL(precision=16, scale=4))


"""
CREATE TABLE orders
(
    order_id   SERIAL PRIMARY KEY,
    user_id    BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id)
        REFERENCES users (telegram_id)
        ON DELETE CASCADE
);
"""


class Order(Base, TimestampMixin, TableNameMixin):
    order_id: Mapped[int_pk]
    user_id: Mapped[user_fk]

    products: Mapped[List["OrderProduct"]] = relationship()
    user: Mapped["User"] = relationship(back_populates="orders")

"""
CREATE TABLE order_products
(
    order_id   INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity   INTEGER NOT NULL,
    FOREIGN KEY (order_id)
        REFERENCES orders (order_id)
        ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES products (product_id)
        ON DELETE RESTRICT
);
"""


class OrderProduct(Base, TableNameMixin):
    order_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("orders.order_id", ondelete="CASCADE"), primary_key=True
    )
    product_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("products.product_id", ondelete="RESTRICT"), primary_key=True
    )
    quantity: Mapped[int]

    product: Mapped["Product"] = relationship()
