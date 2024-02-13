import re
import timeit
import time

text = "Ransom text contains something like this"
pattern = "text"
print(re.search(pattern, text))


def string_nums(n):
    lst = [str(num) for num in range(n)]
    return lst


def int_nums(n):
    lst = [num for num in range(n)]
    return lst


n = 1000
start_time = time.time()
string_nums(n)
print((time.time() - start_time)*1000)

start_time = time.time()
int_nums(n)
print((time.time() - start_time)*1000)
