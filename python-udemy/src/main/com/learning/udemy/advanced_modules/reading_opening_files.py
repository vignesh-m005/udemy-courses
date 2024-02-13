import os
import shutil
import time

import send2trash

f = open('practice.txt', 'w+')
f.write("This is testing")
f.close()

#print(os.getcwd())
#shutil.move('practice.txt','D:\OneDrive - MKS VISION PVT LTD\PROJECTS\Spring boot\python-udemy\src\main\com\learning')

#os.unlink('D:\OneDrive - MKS VISION PVT LTD\PROJECTS\Spring boot\python-udemy\src\main\com\learning\practice.txt')

send2trash.send2trash("practice.txt")
file_path = "D:\OneDrive - MKS VISION PVT LTD\PROJECTS\Spring boot\python-udemy"
for folder, sub_folders, files in os.walk(file_path):
    print(f"Currently looking at {folder}\n")
    print("The sub folders are: ")
    for sub_folder in sub_folders:
        print(f"Subfolder: {sub_folder}")
    print("\n")
    print("The files are: ")
    for file in files:
        print(f"\tFile: {file}")
    print("\n")


