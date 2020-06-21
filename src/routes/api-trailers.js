const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cors = require('cors');
const path = require('path');

const {listar,visualizar,cargar,eliminar} = require('../controllers/trailers-controllers');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req,file,cb){
      cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename : function (req, file, cb){
      
      cb(null,  file.originalname)
  }
});

const uploadPortada = multer({ 
  storage: storage ,
}).single('hola');

router.get('/', auth,cors(),listar);

router.post('/me', auth, cors(), visualizar);

router.post('/cargar', auth, uploadPortada, cargar);

router.post('/eliminar', auth, cors(), eliminar);

module.exports = router;

/*


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage : storage });
There are two options available, destination and filename. 
They are both functions that determine where the file should be stored.


app.post('/rest/upload',
         upload.fields([{
           name: 'video', maxCount: 1
         }, {
           name: 'subtitles', maxCount: 1
         }]), function(req, res, next){
  // ...
}

-------------------- otra solucion --------------
https://github.com/expressjs/multer#any

-------------------- otra solucion --------------
///// IMPORT DEPENDENCIES
const path = require('path'); // for getting file extension
const multer = require('multer'); // for uploading files
const uuidv4 = require('uuidv4'); // for naming files with random characters

///// DEFINE FILESTORAGE AND FILEFILTER
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => { // setting destination of uploading files        
    if (file.fieldname === "resume") { // if uploading resume
      cb(null, 'resumes');
    } else { // else uploading image
      cb(null, 'images');
    }
  },
  filename: (req, file, cb) => { // naming file
    cb(null, file.fieldname+"-"+uuidv4()+path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") { // if uploading resume
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) { // check file type to be pdf, doc, or docx
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else { // else uploading image
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) { // check file type to be png, jpeg, or jpg
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  }
};




*/