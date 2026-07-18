import os
import re

pages_dir = '/Users/yuvraj/Downloads/Dr.TK_project/frontend/src/pages'

for root, _, files in os.walk(pages_dir):
    for file in files:
        if file.endswith('.jsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            # Simple replacement of <main> and <main className="...">
            if '<main>' in content:
                content = content.replace('<main>', '<main className="page-fade-in">')
            elif '<main className="' in content and 'page-fade-in' not in content:
                content = content.replace('<main className="', '<main className="page-fade-in ')
            
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"Added page-fade-in to {file}")
