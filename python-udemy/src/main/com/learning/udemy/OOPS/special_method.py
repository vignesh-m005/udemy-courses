class Book:

    def __init__(self, name, author, pages):
        self.name = name
        self.author = author
        self.pages = pages

    def __str__(self):
        return f"{self.name} by {self.author} has {self.pages} pages"

    def __len__(self):
        return self.pages

    def __del__(self):
        print("A book object has been deleted " + self.name)
        del self


b = Book("Thirukkural", "Thiruvalluvar", 133)

print(b)

print(len(b))

del b

#print(b)
