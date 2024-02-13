import random


def random_num(n):
    min_number = int(input("Enter min number\n"))
    max_number = int(input("Enter max number\n"))

    while n > 0:
        yield random.randint(min_number, max_number)
        n -= 1


for x in random_num(5):
    print(x)
