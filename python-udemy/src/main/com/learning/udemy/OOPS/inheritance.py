class Animal:

    def __init__(self):
        print("Animal created")

    def eat(self):
        print("I'm eating")

    def who_am_i(self):
        print("I'm an animal")


class Mammal:

    def __init__(self):
        print("Mammal created")

    def who_am_i(self):
        print("I'm an Dog")


class Dog(Animal, Mammal):

    def __init__(self):
        Animal.__init__(self)
        Mammal.__init__(self)
        print("Dog created")

    # def who_am_i(self):
    #     print("I'm a Dog")


dog = Dog()

dog.eat()
dog.who_am_i()
