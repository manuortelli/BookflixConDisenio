const perfilesCtrl = {};
const Perfil = require('../models/Perfil');
const Libro = require('../models/Libro'); // para los recomendados
const Suscriptor = require('../models/Suscriptor');

perfilesCtrl.visualizar = async (req,res) => {
    const perfil = await Perfil.findById(req.body.id);
    console.log(perfil);
    res.send(perfil);
};

perfilesCtrl.visualizarPadre = async (req,res) =>{
    const suscriptorPadre = await Perfil.findById(req.body.id).suscriptor;
    res.send(suscriptorPadre);
}

perfilesCtrl.likeLibro = async (req,res) => {
    const perfil = await Perfil.findById(req.body.id);

    const likes = await perfil.likesLibros();

    if ( likes.some(req.body.libroId) ){
        await perfil.updateOne({
            $pull :{ likesLibros:req.body.libroId }
        })
        .then(res.send('Libro eliminado de favoritos'))
    }
    else{
            await perfil.updateOne({
            $push: { likesLibros: req.body.libroId}
        }).then(res.send('Libro agregado a la favoritos'))  
    }
};

perfilesCtrl.likeCapitulo  = async (req,res) => {
    const perfil = await Perfil.findById(req.body.id);

    const likes = await perfil.likesCapitulos();

    if ( likes.some(req.body.capituloId) ){
        await perfil.updateOne({
            $pull :{ likesCapitulos:req.body.capituloId }
        })
        .then(res.send('Capitulo eliminado de favoritos'))
    }
    else{
            await perfil.updateOne({
            $push: { likesCapitulos: req.body.capituloId}
        }).then(res.send('Capitulo agregado a la favoritos'))  
    }
};

perfilesCtrl.historialLibro = async (req,res) => {
    
    const perfil = await Perfil.findById(req.body.id);
    res.send(await perfil.historialLibro());

};

perfilesCtrl.historialCapitulo = async (req,res) => {
    const perfil = await Perfil.findById(req.body.id);
    res.send(await perfil.historialCapitulo());

};

perfilesCtrl.visitadoLibro = async (req,res) => {
    const perfil = await Perfil.findById(req.body.id);

    const historial = await perfil.historialLibros();

    if ( historial.some(req.body.libroId) ){
        await perfil.updateOne({
            $pull :{ historialLibros:req.body.libroId }
        })
        .then(res.send('Libro eliminado del historial'))
    }
    else{
            await perfil.updateOne({
            $push: { historialLibros: req.body.libroId}
        }).then(res.send('Libro agregado al historial'))  
    }
};

perfilesCtrl.visitadoCapitulo = async (req,res) => {

    const perfil = await Perfil.findById(req.body.id);
    const historial = await perfil.historialCapitulos();

    if ( historial.some(req.body.capituloId) ){
        await perfil.updateOne({
            $pull :{ historialCapitulos:req.body.capituloId }
        })
        .then(res.send('Capitulo eliminado del historial'))
    }
    else{
            await perfil.updateOne({
            $push: { historialCapitulos: req.body.capituloId}
        }).then(res.send('Capitulo agregado al historial'))  
    }
};

perfilesCtrl.likesLibros = async (req,res) => {
    const likes = await Perfil.findById(req.body.id).likesLibros();
    res.send(likes)

};

perfilesCtrl.likesCapitulos = async (req,res) => {
    const likes = await Perfil.findById(req.body.id).likesCapitulos();
    res.send(likes)

};

perfilesCtrl.recomendados = async (req,res) => {
    const perfil = await Perfil.findById(req.body.id);
    //res.send(await perfil.recomendados());

};

module.exports = perfilesCtrl;