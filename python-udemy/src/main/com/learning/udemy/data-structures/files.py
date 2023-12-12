import random

myfile = open("myfile.txt")
# print(myfile.read())

with open("myfile.txt", mode="r") as current_file:
    contents = current_file.read()

print(contents)
print("--------------------------------------")

with open("myfile.txt", mode="a") as file:
    file.write("\n writing some random stuff")

print(myfile.read())

with open("newfile.txt", mode="w") as file:
    file.write("sample data")

myfile.close()

tempList = [[1, 2, 3], [3, 4, 5]]
for a, b, c in tempList:
    print(a)

tempDict = {"k1": 1, "k2": 2, "k3": 3}
#for key in tempDic:
#for key,value in tempDic:
for value in tempDict.values():
    print(value)
