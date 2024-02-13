from sqlalchemy import create_engine, URL, orm, text

url = URL.create(
    drivername="postgresql+psycopg2",
    username="postgres",
    password="Vignesh@12",
    host="localhost",
    port=5432,
    database="sql_alembic"
)

engine = create_engine(url, echo=True)
session_pool = orm.sessionmaker(engine)

# session = session_pool()
# session.execute()
# session.commit()
# session.close()

with session_pool() as session:
    #session.execute(text('select 1'))
    # session.execute(text("""
    #
    #     CREATE TABLE users
    #     (
    #         telegram_id   BIGINT PRIMARY KEY,
    #         full_name     VARCHAR(255) NOT NULL,
    #         username      VARCHAR(255),
    #         language_code VARCHAR(255) NOT NULL,
    #         created_at    TIMESTAMP DEFAULT NOW(),
    #         referrer_id   BIGINT,
    #         FOREIGN KEY (referrer_id)
    #             REFERENCES users (telegram_id)
    #             ON DELETE SET NULL
    #     );
    #
    #     INSERT INTO users (telegram_id, full_name, username, language_code, referrer_id)
    #     VALUES (1, 'Vignesh M', 'vignesh_m', 'TAM', NULL),
    #           (2, 'Ramajayam M', 'ram_m', 'TAM', 1);
    # """))

    #result = session.execute(text("select * from users;"))
    session.commit()
    # for row in result:
    #     print(row)
    #     print(row.telegram_id)
    # rows = result.all()
    # print(rows)
    # row = result.scalar()            # fetches only one value
    # print(row)
    result = session.execute(text("""
        select * from users where telegram_id = :telegram_id
    """).params(telegram_id=1))
    print(result.all())

