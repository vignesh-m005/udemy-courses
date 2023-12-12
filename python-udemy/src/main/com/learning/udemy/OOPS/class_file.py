class Dog:
    # Class Object attribute
    # Same for any instance of the class
    species = "mammal"

    def __init__(self, breed, name, spots):
        # Attributes
        # We take in the arguments
        # Assign it using self.attribute_name
        self.breed = breed
        self.name = name

        # Expect True/False
        self.spots = spots

    # Operations/ Actions -------> Methods
    def bark(self, number):
        print("WOOOOFFFFF!!! My name is {} and the number is {}".format(self.name, number))


dog = Dog("Rajapalayam", "Sammy", False)

print(dog.breed)
print(dog.name)
print(dog.species)

dog.bark(2)
