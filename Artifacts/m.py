import os, os.path, shutil

STATIC_DIR = 'img/'
root_directory = 'res'

# This is how you get all of the files and folders in a directory

os.makedirs(STATIC_DIR)


def copy_folder_files(root):
  directory_files = os.listdir(root)
  for name in directory_files:
    path = "{}/{}".format(root, name)
    # If the extension of the file matches some text followed by ext...
    if os.path.isfile(path):
      shutil.copyfile(path, STATIC_DIR + path.replace("/", "-"))
      # Make a directory with the extension name...
      # os.makedirs(ext)
      pass
    else:
      copy_folder_files(path)
      # Copy that file to the directory with that extension name
      #


copy_folder_files(root_directory)
