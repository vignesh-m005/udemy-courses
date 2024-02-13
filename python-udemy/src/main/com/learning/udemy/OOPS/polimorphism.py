
class Animal:

    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError("This abstract method must be implemented in the sub class")


class Cat(Animal):

    def speak(self):
        return self.name + " says meow!!"


class Dog(Animal):

    def speak(self):
        return self.name + " says woff!!"


kabali = Dog("Kabali")

meena = Cat("Meena")

print(kabali.speak())
print(meena.speak())
