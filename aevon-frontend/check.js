const Jimp = require('jimp');

Jimp.read('C:/Users/zakar/Downloads/ChatGPT Image 13 juil. 2026, 17_35_57.png')
  .then(image => {
    const color = Jimp.intToRGBA(image.getPixelColor(0, 0));
    console.log(`Downloads Top-left pixel: R=${color.r}, G=${color.g}, B=${color.b}, A=${color.a}`);
  })
  .catch(console.error);
