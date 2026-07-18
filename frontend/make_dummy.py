import base64
import os

img_data = b'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

images_dir = 'src/assets/images'
os.makedirs(images_dir, exist_ok=True)

files_to_create = [
    'ministry.hero.png', 'party.hero.png', 'about.hero.png', 'temple_bg.jpg', 'logo.png',
    'image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png', 'image6.png',
    'image7.png', 'image8.png', 'image9.png', 'image10.png', 'image11.png', 'image12.png',
    'image13.png', 'image14.png', 'image15.png'
]

for filename in files_to_create:
    with open(os.path.join(images_dir, filename), 'wb') as f:
        f.write(base64.b64decode(img_data))
