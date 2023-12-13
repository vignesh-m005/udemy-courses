d = {"k1": 1, "k2": 2}

print({x: x**2 for x in range(10)})

for e in (d.items(), d.keys(), d.values()):
    print(e)
