from sqlalchemy import create_engine, URL
from create_table_class.table_class import Base
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

url = URL.create(
    drivername="postgresql+psycopg2",
    username="postgres",
    password="Vignesh@12",
    host="localhost",
    port=5432,
    database="sql_alembic"
)
print("----------------------")
print(str(url))
engine = create_engine(url, echo=True)
Base.metadata.drop_all(engine)
# Base.metadata.create_all(engine)

# engine = create_async_engine(url, echo=True) # for async
# session_pool = async_sessionmaker
# async with session_pool

