import zipfile

f = open("fileone.txt", 'w+')
f.write("First one")
f.close()

f = open("filetwo.txt", 'w+')
f.write("Second file")
f.close()

comp_file = zipfile.ZipFile('comp_file.zip', 'w')
comp_file.write('fileone.txt', compress_type=zipfile.ZIP_DEFLATED)
comp_file.write('filetwo.txt', compress_type=zipfile.ZIP_DEFLATED)

comp_file.close()

# ----------------------------- UNZIP ---------------------------------

zip_object = zipfile.ZipFile('comp_file.zip', 'r')
zip_object.extractall('extracted_folder')

# ---------------------------------------------------------------------
import shutil

directory_to_zip = "D:/OneDrive - MKS VISION PVT LTD/PROJECTS/Spring boot/python-udemy/src/main/com/learning/udemy/decorators"

output_file = 'example'

shutil.make_archive(output_file, 'zip', directory_to_zip)
