const path = require('node:path');
const fs = require('fs');

function deleteImage(pathname) {
  const imagePath = path.join(__dirname, '../../uploads', pathname);

  fs.unlink(imagePath, () => {});
}

module.exports = deleteImage;