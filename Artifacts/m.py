import os, os.path, shutil

STATIC_DIR = 'img/'
root_directory = 'res'

# This is how you get all of the files and folders in a directory

os.makedirs(STATIC_DIR)

img_template = '''<div class="thumbnail">
        <img src="{name}" alt="Corsican">
        <div class="caption">
            <h4>{name}</h4>
        </div>
    </div>'''

html_items = ""


def copy_folder_files(root):
  global html_items
  directory_files = os.listdir(root)
  for name in directory_files:
    path = "{}/{}".format(root, name)
    # If the extension of the file matches some text followed by ext...
    if os.path.isfile(path):
      if path.split('.')[-1] != "ini":
        ff = STATIC_DIR + path.replace("/", "-")
        shutil.copyfile(path, ff.lower())
        html_items = html_items + (img_template.format(**{'name': ff}))
    else:
      copy_folder_files(path)


copy_folder_files(root_directory)
with open('index.html', 'w', encoding='UTF-8') as f:
  f.write(html_items)
