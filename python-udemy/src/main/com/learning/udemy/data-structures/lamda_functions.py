def square(num):
    return num ** 2


my_list = [1, 2, 3, 4, 5]
# list(map(square, my_list))
for item in map(square, my_list):
    print(item)


def splicer(name):
    if len(name) % 2 == 0:
        return "EVEN"
    else:
        return name[0]


names = ["Vignesh", "Dinesh", "Makesh", "Ram"]
print(list(map(splicer, names)))


# ---------------------------- filter() -------------------------------------

def check_even(num):
    return num % 2 == 0


print(list(filter(check_even, [1, 2, 3, 4, 5, 6])))

# ------------------------------ lamda -----------------------------------------------


square_root = lambda num: num ** 0.5

print(square_root(25))

print(list(map(lambda num: num ** 2, [1, 2, 3, 4, 5])))  # get square

print(list(filter(lambda num: num % 2 == 0, [1, 2, 3, 4, 5, 6])))  # filter even

print(list(map(lambda name: name[0], names))) # Get first character

print(list(map(lambda name: name[::-1], names))) # Reverse the name
