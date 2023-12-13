s = set()
s.add(1)
s.add(2)
print(s)
s.add(2)
print(s)
# s.clear()
# print(s)

sc = s.copy()

s.add(3)

print(s.difference(sc))
s = {1, 2, 3}
sc = {1, 4, 5}
s.difference_update(sc)
print(s)

sc.discard(4)
sc.discard(2)

print(sc)
print("----------------")
s = {1, 2, 3}
s1 = {1, 2, 5}
print(s.intersection(s1))
s.intersection_update(s1)
print(s)
print("----------------")
s2 = {7, 6}
print(s1.isdisjoint(s2)) # is intersection not there
print(s.isdisjoint(s1))

print("----------------")
print(sc.issubset(s))
print(sc.issuperset(s))
s = {1, 2, 3}
print(s1.symmetric_difference(s))
print(s.union(s1))
s.update(s1)
print(s)
