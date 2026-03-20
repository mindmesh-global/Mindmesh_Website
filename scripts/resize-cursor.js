const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const input = path.join(__dirname, '..', 'public', 'custom-cursor.png');
const temp = path.join(__dirname, '..', 'public', 'custom-cursor-32.png');

sharp(input)
  .resize(32, 32)
  .png()
  .toFile(temp)
  .then(() => {
    fs.renameSync(temp, input);
    console.log('Resized to 32x32 - cursor should now display');
  })
  .catch((err) => console.error(err));
