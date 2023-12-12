import collections
from collections import defaultdict
from collections import namedtuple

my_list = [1, 2, 1, 2, 1, 2, 1, 3, 4, 3, 3, 2]

print(collections.Counter(my_list))
s = "aaaabbbbbccccdddwwwsxsssssssqjhsvssv"
print(collections.Counter(s))

sentence = "I think our projects will really benefit from the skills built in this course. I hope you’ll agree"
print(collections.Counter(sentence.split()))

c = collections.Counter(s)

print(c.most_common(3))  # Ordering by value
print(list(c))  # All keys

print("\n--------------------------------------------\n")

d = {'a': 10}
print(d['a'])
# print(d['b'])

d = defaultdict(lambda: 0)
d['correct'] = 100
print(d['correct'])

print(d['wrong'])

print("\n--------------------------------------------\n")

Dog = namedtuple('Dog', ['age', 'breed', 'name'])

sammy = Dog(age=5, breed='Husky', name='Sammy')
print(sammy)
