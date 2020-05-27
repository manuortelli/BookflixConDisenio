const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cors = require('cors');
const { listar, logout, visualizar, soyAdmin, login, registrar, modificar, eliminar} = require('../controllers/suscriptores-controllers');

router.get('/', listar);

router.post('/registrar', cors(), registrar);

router.post('/login', cors(), login);

router.get('/me', auth, cors(), visualizar);

router.get('/soyAdmin', auth, cors(), soyAdmin);

router.post('/modificar', auth, cors(), modificar);

router.post('/eliminar', auth, cors(), eliminar);

router.post('/logout', auth, cors(), logout);


module.exports = router;

