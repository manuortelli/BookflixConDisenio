const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cors = require('cors');
const { listar, visualizar, cargar, modificar, eliminar} = require('../controllers/editoriales-controllers');

router.get('/', auth, cors(),listar);

router.post('/me',auth, cors(),visualizar);

router.post('/cargar',auth,cors(), cargar );

router.post('/modificar',auth,cors(),modificar);

router.post('/eliminar',auth,cors(), eliminar );




module.exports = router;