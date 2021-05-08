const multer = require('multer');

const upload = multer({
    limits : {
        fileSize :3000000
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return cb(new Error('Please upload an image file'))
        }
        cb(undefined,true)
    }
})

module.exports = upload;