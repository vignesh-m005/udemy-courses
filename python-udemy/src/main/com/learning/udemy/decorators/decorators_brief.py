def hello(name="Vignesh"):
    print("function hello has been called")

    def greet():
        return "\tInside Greet function"

    def welcome():
        return "\tInside welcome method"

    if name == 'Vignesh':
        return greet
    else:
        return welcome


my_func = hello()

print(my_func())
