import random

from typing import List

from create_table_class.table_class import User, Order, Product, OrderProduct
from sqlalchemy.orm import Session, sessionmaker, aliased
from sqlalchemy import URL, create_engine, select, delete, or_, func, update, bindparam
from environs import Env
from sqlalchemy.dialects.postgresql import insert
from faker import Faker

"""
insert into users(telegram_id,full_name,language_code,username) 
values(2,'Vignesh M', 'TAmil English', 'vignesh');
"""


class Repository:
    def __init__(self, session: Session):
        self.session: Session = session

    def add_user(self, telegram_id, full_name, language_code, username=None, referrer_id=None) -> User:
        # statement = (insert(User).values(
        #     telegram_id=telegram_id,
        #     full_name=full_name,
        #     language_code=language_code,
        #     user_name=username,
        #     referrer_id=referrer_id
        # ))

        stmt = select(User).from_statement(
            insert(User)
            .values(
                telegram_id=telegram_id,
                full_name=full_name,
                language_code=language_code,
                user_name=username,
                referrer_id=referrer_id
            ).returning(
                User
            ).on_conflict_do_update(
                index_elements=[User.telegram_id],
                set_=dict(user_name=username,
                          full_name=full_name)
            )
        )
        # self.session.execute(statement=statement)
        # self.session.commit()

        result = self.session.scalars(stmt).first()
        self.session.commit()
        return result

    def get_user_by_id(self, telegram_id: int) -> User:
        stmt = select(User).where(User.telegram_id == telegram_id)
        result = self.session.execute(stmt)
        return result.scalar()

    def get_all_users(self):
        stmt = select(
            User
        ).where(
            # or_(User.language_code == 'TAM', User.language_code == 'tam'),
            User.full_name.ilike('%a%')
        ).order_by(
            User.created_at.desc()
        ).limit(
            10
        )
        result = self.session.scalars(stmt)
        return result.all()

    def get_user_language(self, telegram_id: int):
        stmt = select(User.language_code).where(User.telegram_id == telegram_id)
        result = self.session.execute(stmt)
        return result.scalars().first()

    def delete_user_by_id(self, telegram_id: int):
        stmt = delete(User).where(User.telegram_id == telegram_id)
        self.session.execute(stmt)
        self.session.commit()

    def add_order(self, user_id) -> Order:
        stmt = select(Order).from_statement(
            insert(Order).values(user_id=user_id).returning(Order)
        )
        result = self.session.scalars(stmt)
        self.session.commit()
        return result.first()

    def add_product(self, product_id: int, title: str, description: str, price: float) -> Product:
        stmt = select(Product).from_statement(
            insert(Product)
            .values(
                product_id=product_id,
                title=title,
                description=description,
                price=price
            )
            .returning(Product)
        )
        result = self.session.scalars(stmt)
        self.session.commit()
        return result.first()

    def add_product_to_order(self, product_id, order_id, quantity) -> OrderProduct:
        stmt = select(OrderProduct).from_statement(
            insert(OrderProduct)
            .values(
                product_id=product_id,
                order_id=order_id,
                quantity=quantity
            )
            .returning(OrderProduct)
        )
        result = self.session.scalars(stmt)
        self.session.commit()
        return result.first()

    def test(self, user_id):
        stmt = select(User).where(User.telegram_id == user_id);
        result = self.session.scalars(stmt)
        return result.first()

    def select_all_invited_users(self):
        parent_referrer = aliased(User)
        referral_user = aliased(User)
        stmt = (
            select(parent_referrer.full_name.label("parent_name"),
                   referral_user.full_name.label("referral_name"))
        ).join(
            referral_user, parent_referrer.telegram_id == referral_user.referrer_id
        )
        return self.session.execute(stmt).all()

    def get_all_user_orders(self, telegram_id: int):
        stmt = (
            select(Order, User, Product)
            .join(User.orders)
            .join(Order.products)
            .join(Product)
            .where(User.telegram_id == telegram_id)
        )
        result = self.session.execute(stmt)
        return result.all()

    def get_total_number_orders(self, telegram_id=None):
        if telegram_id is None:
            print("-------------------")
            stmt = (select(func.count(Order.order_id), User.full_name)
                    .join(User)
                    .group_by(User.telegram_id)
                    )
            result = self.session.execute(stmt)
            return result.all()
        stmt = select(func.count(Order.order_id)).where(Order.user_id == telegram_id)
        result = self.session.execute(stmt)
        return result.scalar()

    def get_total_number_products(self):
        stmt = (select(func.sum(OrderProduct.quantity), User.full_name)
                .join(Order, Order.order_id == OrderProduct.order_id)
                .join(User, Order.user_id == User.telegram_id)
                .group_by(User.telegram_id)
                )
        result = self.session.execute(stmt)
        return result.all()

    def update_referrer(self, telegram_id, referrer_id):
        stmt = (
            update(User)
            .where(User.telegram_id == telegram_id)
            .values(referrer_id=referrer_id)
        )
        self.session.execute(statement=stmt)
        self.session.commit()

    def create_new_order_id(self, user_id):
        stmt = insert(Order).values(user_id=user_id).returning(Order.order_id)
        return self.session.scalar(stmt)

    def add_products_to_order(self, order_id: int, products: List[dict]):
        stmt = (
            insert(OrderProduct).values(
                order_id=order_id,
                product_id=bindparam("product_id"),
                quantity=bindparam("quantity")
            )
        )
        self.session.execute(stmt, products)
        self.session.commit()


def seed_fake_data(repository: Repository):
    Faker.seed(0)
    fake = Faker()
    users = []
    orders = []
    products = []

    for _ in range(10):
        referrer_id = None if not users else users[-1].telegram_id
        user = repository.add_user(
            telegram_id=fake.pyint(),
            full_name=fake.name(),
            language_code=fake.language_code(),
            username=fake.user_name(),
            referrer_id=referrer_id
        )
        users.append(user)

    for _ in range(10):
        order = repository.add_order(
            user_id=random.choice(users).telegram_id
        )
        orders.append(order)

        product = repository.add_product(
            product_id=fake.pyint(),
            title=fake.word(),
            description=fake.sentence(),
            price=fake.pyint()
        )
        products.append(product)

    for order in orders:
        for _ in range(3):
            repository.add_product_to_order(
                order_id=order.order_id,
                product_id=random.choice(products).product_id,
                quantity=fake.pyint()
            )


if __name__ == "__main__":
    env = Env()
    env.read_env('.env')

    url = URL.create(
        drivername=env.str("POSTGRES_DRIVER"),
        username=env.str("POSTGRES_USER"),
        password=env.str("POSTGRES_PASSWORD"),
        host=env.str("POSTGRES_HOST"),
        port=env.str("POSTGRES_PORT"),
        database=env.str("POSTGRES_DATABASE")
    ).render_as_string(hide_password=False)

    engine = create_engine(url, echo=True)
    session_pool = sessionmaker(engine, expire_on_commit=False)
    with session_pool() as session:
        repo = Repository(session)
        # repo.add_user(4, "Ramajayam M", 'TAM', 'ram_j')
        # user = repo.get_user_by_id(3)
        # print(user.user_name)
        # print(repo.delete_user_by_id(3))
        # print("------------")
        # users = repo.get_all_users()
        # lang = repo.get_user_language(1)
        # print(lang)
        # seed_fake_data(repo)

        # result = repo.test(9882)
        # print(len(result.orders))

        # for row in repo.select_all_invited_users():
        #     print(f"Parent: {row.parent_name}, Referral:{row.referral_name}")

        # for user in repo.get_all_users():
        #     print(f"User: {user.full_name}")
        #     for order in user.orders:
        #         print(f"order: {order.order_id}")
        #         for product in order.products:
        #             print(f"product: {product.product.title}")
        #     print("------------------")

        # user_orders = repo.get_all_user_orders(9882)
        # # for order, user in user_orders:
        # #     print(f"order_id: {order.order_id} - {user.user_name}")
        # for row in user_orders:
        #     print(f"order: {row.Order.order_id} - user: {row.User.full_name} product: {row.Product.title}")

        # count = repo.get_total_number_orders(9882)
        # print(count)

        # order_count = repo.get_total_number_orders()
        # for count, name in order_count:
        #     print(f"user: {name}, - {count}")

        # product_sum = repo.get_total_number_products()
        # for row in product_sum:
        #     print(f"{row}")

        # repo.update_referrer(9882, 18)

        order_id = repo.create_new_order_id(9882)
        products = [{"product_id": 951, "quantity": 2},
                    {"product_id": 741, "quantity": 5},
                    {"product_id": 2133, "quantity": 6}
                    ]
        repo.add_products_to_order(order_id, products)
