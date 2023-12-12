import math
import pdb
# help(math)

value = 4.35

#pdb.set_trace()  # q to end debugger


print(math.ceil(value))
print(math.floor(value))
print(round(value))
print(round(4.5))
print(round(5.5))

# math.pi
# math.e
# math.inf
# math.nan


print(math.log(math.e))
print(math.degrees(math.pi / 2))
print(math.radians(180))
print(math.sin(math.pi / 2))  # 90 degrees

print("----------------------------------------------")

import random

print(random.randint(1, 100))

random.seed(101)
print(random.randint(1, 100))
print(random.randint(1, 100))

my_list = list(range(1, 20))

print(random.choice(my_list))

my_list.extend([1, 2, 1, 1, 2, 4, 4, 5])
print(random.choices(population=my_list, k=10))
print(random.sample(population=my_list, k=10))

random.shuffle(my_list)
