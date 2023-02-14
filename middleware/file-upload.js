const multer = require('multer');
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

//configuring multer object 
const fileUpload = multer({
    limits: 500000, //(500kb upload ceiling)
    storage: multer.diskStorage({
        desitination: (req,file,cb)=>{         //where is the file going?
            cb(null, '../uploads/images');
        },
        filename:(req,file,cb)=>{
            const ext = MIME_TYPE_MAP[file.mimetype] //get extension
            cb(null, 'upload' + '.' + ext);
        }
    }),
    fileFilter: (req, file, cb) =>{                     //checking file type here (only accept png,jpeg, or jpg)
        const isValid = !!MIME_TYPE_MAP[file.mimetype]; // check mapping 
        let error = isValid ? null : new Error('invalid mime type');
        cb(error, isValid);   // -> true accept the file
    }
});

module.exports = fileUpload;