const fs = require('fs');
const path = require('path');

const walk = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(file => {
      file = path.resolve(dir, file);
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          if (file.endsWith('.jsx')) results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

walk('/Users/yuvraj/Downloads/Dr.TK_project/frontend/src/pages', (err, files) => {
  if (err) throw err;
  
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    if (content.includes('<div className="page-fade-in">') && content.includes('<Navbar />')) {
      content = content.replace(/<div className="page-fade-in">\s*<Navbar \/>\s*<main(\s[^>]*)?>/, '<>\n      <Navbar />\n      <main$1 className="page-fade-in">');
      
      content = content.replace(/<\/main>\s*<Footer \/>\s*<\/div>/g, '</main>\n      <Footer />\n    </>');
      
      // Specifically for Gallery which has extra stuff after Footer
      if (file.includes('Gallery.jsx') || file.includes('InternshipPage.jsx')) {
         content = content.replace(/<\/main>\s*<Footer \/>\s*(?:{selectedImage[^}]*})?\s*<\/div>/, (match) => {
           return match.replace('</div>', '</>');
         });
         // The regex might not be perfect for Gallery, let's do a simple string replace for Gallery end:
         content = content.replace(/<Footer \/>\s*{selectedImage[^{]*{\s*<div[^>]*>[\s\S]*<\/div>,\s*document\.body\s*}\)\s*}\s*<\/div>/, (match) => {
             return match.replace(/<\/div>$/, '</>');
         });
      }

      // Simple closing tag replacements
      content = content.replace('</main>\n      <Footer />\n    </div>', '</main>\n      <Footer />\n    </>');
      
      fs.writeFileSync(file, content);
      console.log('Fixed', file);
    }
  });
});
