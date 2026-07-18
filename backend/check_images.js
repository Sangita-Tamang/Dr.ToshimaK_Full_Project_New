const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dapavb1fs',
  api_key: '477333398271669',
  api_secret: '-AN8M-4iEIDR1q0mTppZECjDDx8',
});

async function test() {
  try {
    const res = await cloudinary.search
      .expression('folder="dr-tk"')
      .max_results(10)
      .execute();
    console.log("Images in dr-tk:", res.resources.map(r => r.public_id));

    const res2 = await cloudinary.search
      .expression('folder=""')
      .max_results(10)
      .execute();
    console.log("Images in root:", res2.resources.map(r => r.public_id));
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
