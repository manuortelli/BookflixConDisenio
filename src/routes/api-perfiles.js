const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cors = require('cors');
const {  visualizar,visualizarConId, likesLibros,visualizarPadre, likesCapitulos, visitadoLibro, visitadoCapitulo, likeLibro, likeCapitulo, historialLibro, historialCapitulo , recomendados } = require('../controllers/perfiles-controllers'); 


router.get('/me', auth, cors(), visualizar);
router.get('/meConId', auth, cors(), visualizarConId);

router.post('/visualizarPadre',auth,cors(),visualizarPadre)

router.post('/historialLibro',auth, cors(),historialLibro);

router.post('/historialCapitulo',auth, cors(),historialCapitulo);

router.post('likesLibros',auth,cors(),likesLibros);

router.post('likesCapitulos',auth,cors(),likesCapitulos);

router.post('/likeLibro',auth, cors(),likeLibro);

router.post('/likeCapitulo',auth, cors(),likeCapitulo);

router.post('/visitadoLibro',auth, cors(),visitadoLibro);

router.post('/visitadoCapitulo',auth,cors(),visitadoCapitulo)

router.post('/recomendados',auth, cors(),recomendados);

module.exports = router;