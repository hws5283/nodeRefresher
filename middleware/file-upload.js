const multer = require('multer');
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

//configuring multer object 
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');

module.exports = multerUploads;