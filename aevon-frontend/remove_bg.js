const Jimp = require('jimp');

Jimp.read('public/logo.png')
  .then(image => {
    // Get top-left pixel color as the background color to remove
    const bg = Jimp.intToRGBA(image.getPixelColor(0, 0));
    
    // Scan all pixels
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // If pixel is very close to the background color, make it transparent
      const distance = Math.sqrt(Math.pow(r - bg.r, 2) + Math.pow(g - bg.g, 2) + Math.pow(b - bg.b, 2));
      
      if (distance < 30) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
      }
    });
    
    // Save over the original image
    return image.writeAsync('public/logo.png');
  })
  .then(() => {
    console.log("Background removed successfully!");
  })
  .catch(console.error);
