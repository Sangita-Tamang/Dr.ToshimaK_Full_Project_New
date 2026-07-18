require('dotenv').config();
const cloudinary = require('./config/cloudinary');

async function test() {
  try {
    const res = await cloudinary.search
      .expression('folder="dr-tk"')
      .max_results(100)
      .execute();
    console.log("Images in dr-tk:", res.resources.map(r => r.public_id));

    const res2 = await cloudinary.search
      .expression('folder=""')
      .max_results(100)
      .execute();
    console.log("Images in root:", res2.resources.map(r => r.public_id));
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
