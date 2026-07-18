const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dapavb1fs',
  api_key: '477333398271669',
  api_secret: '-AN8M-4iEIDR1q0mTppZECjDDx8',
});

async function fixCloudinary() {
  try {
    let next_cursor = null;
    let allResources = [];
    
    // Fetch all resources
    do {
      const result = await cloudinary.search
        .expression('folder=""') // Only root folder images
        .max_results(500)
        .next_cursor(next_cursor)
        .execute();
      
      allResources = allResources.concat(result.resources);
      next_cursor = result.next_cursor;
    } while (next_cursor);
    
    console.log(`Found ${allResources.length} images to process.`);
    
    // Rename each resource
    let successCount = 0;
    let errorCount = 0;
    
    for (const res of allResources) {
      const publicId = res.public_id;
      
      // Remove the Cloudinary random suffix (_[a-z0-9]{6})
      const cleanName = publicId.replace(/_[a-z0-9]{6}$/, '');
      const newPublicId = `dr-tk/${cleanName}`;
      
      try {
        console.log(`Renaming: ${publicId} -> ${newPublicId}`);
        await cloudinary.uploader.rename(publicId, newPublicId, {
          overwrite: true,
          invalidate: true
        });
        successCount++;
      } catch (err) {
        console.error(`Error renaming ${publicId}:`, err.message);
        errorCount++;
      }
    }
    
    console.log(`Finished! Successfully renamed ${successCount} images. Errors: ${errorCount}`);
  } catch (error) {
    console.error('Script Error:', error);
  }
}

fixCloudinary();
