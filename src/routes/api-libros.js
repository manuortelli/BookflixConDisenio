const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cors = require('cors');
const path = require('path');
const {listar, visualizar, cargar, modificar, eliminar} = require('../controllers/libros-controllers');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname, '../../uploads/'));
    },
    filename : function (req, file, cb){
        
        cb(null,  file.originalname)
    }
});

/*
const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4)$/i)) {
        return cb(new Error('Solo se permiten formatos de imagen o de video!, no se guardó el archivo'), false);
    }
    cb(null, true);
};
*/

const uploadPortada = multer({ 
    storage: storage ,
    //limits: { fileSize: 1024 * 1024 * 5  },
    //fileFilter: imageFilter ,
}).single('portadaImg');

router.get('/',auth,cors(),listar);

router.post('/me',auth, cors(),visualizar);

router.post('/cargar',auth, uploadPortada, cargar);

router.post('/modificar',auth, uploadPortada, modificar);

router.post('/eliminar',auth, cors() ,eliminar);

module.exports = router;