const Jimp = require('jimp');

Jimp.read('public/logo.png')
  .then(image => {
    let counts = {};
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      const a = this.bitmap.data[idx + 3];
      const key = `${r},${g},${b},${a}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    console.log("Most common colors:", sorted);
  })
  .catch(console.error);
