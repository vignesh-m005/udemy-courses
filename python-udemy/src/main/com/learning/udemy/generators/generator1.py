def create_cubes(n):
    for i in range(n):
        yield i ** 3


for j in create_cubes(10):
    print(j)


def generate_fibonaci(n):
    a = 0
    b = 1
    while a < n:
        yield a
        b, a = a, a + b


for i in generate_fibonaci(10):
    print(i)
