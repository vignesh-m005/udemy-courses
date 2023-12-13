l = [1, 2, 3]
print(l)
l.append([4, 5])
print(l)
print(l.count(1))
l.extend([6, 7])
print(l)
print(l.index(2))
print("----------------")
print(l)
l.insert(3, 4) # index, object
print(l)
print(l.pop())
l.remove(4) # object value
print(l)

# lst = ['a','b','c']
# lst.remove(1)    Error, removing  Not based on index

print("----------------")
l.reverse()
print(l)

# l.sort()
# print(l)
