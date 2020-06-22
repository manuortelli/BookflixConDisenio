const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cors = require('cors');
const { listar, visualizar, cargar, modificar, eliminar } = require('../controllers/autores-controllers'); 


router.get('/', auth, cors(), listar);

router.post('/me',auth, cors(),visualizar);

router.post('/cargar', auth,cors(), cargar);

router.post('/eliminar', auth, cors(),eliminar);

router.post('/modificar', auth,cors(), modificar);


module.exports = router;