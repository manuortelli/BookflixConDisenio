const librosCtrl = {};
const Libro = require('../models/Libro');


librosCtrl.listar = async (req,res)=>{
    const libros = await Libro.find();
    res.json(libros);
};

librosCtrl.visualizar = async (req,res)=>{
    
    await Libro.findById(req.body.id)
        .then(lib=>{ res.json(lib)})
        .catch(err=> res.json(err))
    
};

librosCtrl.visualizarCapitulos = async (req,res)=>{
    await Libro.findById(req.body.id)
        .then(capitulos=>{ res.json(capitulos.capitulos)})
        .catch(err=> res.json(err))
    
};

librosCtrl.cargar = async (req,res)=>{
    const libroI = await Libro.findOne({ isbn: req.body.isbn});
   
    
    if (libroI){
        return res.status(401).json({msg:'El número de ISBN ya se encuentra en uso'});
    } else{
        const libroT = await Libro.findOne( {titulo: req.body.titulo });
        if(libroT){
            return res.status(401).json({msg:'El título ya se encuentra en uso por otro libro.'})
        }
    }
    if((req.body.isbn.length< 13) || (req.body.isbn.length > 16)){
        return res.status(401).json({msg:'El numero de ISBN debe contener entre 13 y 16 dígitos'})
    }

    if(!req.body.genero){
        return res.status(401).json({msg:'La carga de género es obligatoria'})
    }

    if(!req.body.autor){
        return res.status(401).json({msg:'La carga de Autor/a es obligatoria'})
    }

    if(!req.body.editorial){
        return res.status(401).json({msg:'La carga de editorial es obligatoria'})
    }
    if(!req.file){
        return res.status(401).json({msg:'La carga de imagen de portada es obligatoria'})
    }

    const libroNuevo = await new Libro({
        titulo: req.body.titulo,
        portada: req.file.filename,
        isbn: req.body.isbn,
        autor:req.body.autor,
        editorial:req.body.editorial,
        genero:req.body.genero,

    });
    libroNuevo.save()
            .then(lib => {
                res.send('Libro cargado con éxito')            
            })
            .catch(err =>{
                res.json(err)
            })

};

librosCtrl.modificar = async (req,res)=>{
    
    
    const libroNuevo = await Libro.findOne({ isbn: req.body.isbn });
    if(libroNuevo && (libroNuevo._id != req.body.id)){
            return res.send('El número de isbn ya se encuentra en uso por otro libro')
    } 
    
    const libroT = await Libro.findOne( {titulo: req.body.titulo });

    console.log(libroT);

    if(libroT && (libroT._id != req.body.id)){
        return res.send('El título ya se encuentra en uso por otro libro.')
    }

    if((req.body.isbn.length< 13) || (req.body.isbn.length > 16)){
        return res.send('El numero de ISBN debe contener entre 13 y 16 dígitos')
    }
       

    else{
        const libroViejo=await Libro.findById(req.body.id);
        //MODIFICAR LAS FECHAS FALTA
        // TANTO PARA ELLOS COMO PARA LOS CAPITULOS
        if(req.file){
            await libroViejo.updateOne({portada: req.file.filename})
        }
        await libroViejo.updateOne({
            titulo: req.body.titulo,
            isbn: req.body.isbn,
            autor:req.body.autor,
            editorial:req.body.editorial,
            genero:req.body.genero,
            
            })
            .then(res.send('Libro modificado con éxito'))
            .catch(err=> res.json(err))
    }
    

};

librosCtrl.cargarArchivoLibro = async (req,res)=>{
    console.log(req.body.id);
    const libro = await Libro.findById(req.body.id);
    
    if(req.file){
        await libro.updateOne({archivo: req.file.filename})
    }else{
        return res.status(401).json({msg:'Debe ingresar un archivo'});
    }
    /*if(req.lanzamiento){
        await libro.updateOne({lanzamiento: req.body.lanzamiento})
    }else{
        return res.status(401).json({msg:'Debe indicar una fecha de lanzamiento'});
        
    }*/
    if(req.body.expiracion){
        await libro.updateOne({expiracion: req.body.expiracion})
    } 
    return res.status(401).json({msg:'Archivo de Libro cargado con éxito'});
    
}; 

librosCtrl.cargarArchivoCapitulo = async (req,res)=>{
        
    const libro = await Libro.findById(req.body.id);

    if(req.file){
        await libro.updateOne({
            capitulos:{
                archivo: req.file.filename,
                n:req.body.n
            } 
        })
    }else{
        return res.status(401).json({msg:'Debe ingresar un archivo'});
    }
    if(req.lanzamiento){
        await libro.updateOne({lanzamiento: req.body.lanzamiento})
    }else{
        return res.status(401).json({msg:'Debe indicar una fecha de lanzamiento'});
    
    }
    if(req.body.expiracion){
        await libro.updateOne({expiracion: req.body.expiracion})
    } 
    
    return res.status(401).json({msg:'Archivo de capítulo cargado con éxito'});
}; 

librosCtrl.eliminar = async (req,res)=>{
    
    await Libro.findByIdAndRemove(req.body.id)
        .then(res.send('Libro eliminado')).catch(err=> res.json(err));
    
};


module.exports = librosCtrl;