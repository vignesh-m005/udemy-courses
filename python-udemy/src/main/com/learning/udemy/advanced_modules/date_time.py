import datetime

my_time = datetime.time(2, 20)

print(my_time)
print(my_time.hour)
print(my_time.minute)

my_time = datetime.time(15, 24, 46, 200)
print(my_time)
print(my_time.microsecond)

my_date = datetime.date.today()
print(my_date)
# my_date.day
# my_date.month
# my_date.year

my_date_time = datetime.datetime(2022, 10, 3, 14, 20, 1)
print(my_date_time)

my_date_time = my_date_time.replace(year=2023)
print(my_date_time)

