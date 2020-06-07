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
        return res.send('El número de ISBN ya se encuentra en uso')
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
    /*if(!req.body.lanzamiento){
        return res.status(401).json({msg:'Ingrese una fecha de lanzamiento'})
    }*/

    const libroNuevo = await new Libro({
        titulo: req.body.titulo,
        portada: req.file.filename,
        isbn: req.body.isbn,
        autor:req.body.autor,
        editorial:req.body.editorial,
        genero:req.body.genero,
        //lanzamiento: req.body.lanzamiento
    });
    /*
    if(req.body.expiracion){
        await libroNuevo.update({expiracion: req.body.expiracion})
    }*/
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

        if(req.file){
            await libroViejo.updateOne({portada: req.file.filename})
        }/*
        if(req.body.expiracion){
            await libroViejo.updateOne({expiracion: req.body.expiracion})
        }*/ 
        await libroViejo.updateOne({
            titulo: req.body.titulo,
            
            isbn: req.body.isbn,
            autor:req.body.autor,
            editorial:req.body.editorial,
            genero:req.body.genero,
            //lanzamiento: req.body.lanzamiento,
            
            })
            .then(res.send('Libro modificado con éxito'))
            .catch(err=> res.json(err))
    }
    

};

librosCtrl.cargarArchivoLibro = async (req,res)=>{
        
    const libro = await Libro.findById(req.body.id);

        if(req.file){
            await libro.updateOne({archivo: req.file.filename})
        }else{
            res.send('Debe ingresar un archivo .pdf')
        }
        if(req.lanzamiento){
            await libro.updateOne({lanzamiento: req.body.lanzamiento})
        }else{
            res.send('Debe indicar una fecha de lanzamiento');
        }
        if(req.body.expiracion){
            await libro.updateOne({expiracion: req.body.expiracion})
        } 
      
           res.send('Archivo de Libro cargado con éxito')
}; 

librosCtrl.cargarArchivoCapitulo = async (req,res)=>{
        
    const libro = await Libro.findById(req.body.id);

        if(req.file){
            const index = libro.capitulos.length;
            await libro.updateOne({
                capitulos:{
                    n: index+1,
                    archivo: req.file.filename
                } 
            })
        }else{
            res.send('Debe ingresar un archivo .pdf')
        }
        if(req.lanzamiento){
            await libro.updateOne({lanzamiento: req.body.lanzamiento})
        }else{
            res.send('Debe indicar una fecha de lanzamiento');
        }
        if(req.body.expiracion){
            await libro.updateOne({expiracion: req.body.expiracion})
        } 
      
           res.send('Archivo de capítulo cargado con éxito')
}; 

librosCtrl.eliminar = async (req,res)=>{
    
    await Libro.findByIdAndRemove(req.body.id)
        .then(res.send('Libro eliminado')).catch(err=> res.json(err));
    
};


module.exports = librosCtrl;