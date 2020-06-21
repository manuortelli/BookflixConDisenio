import React, { Component } from '../../../../node_modules/react'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DatePicker from '../../../../node_modules/react-datepicker';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import axios from '../../../../node_modules/axios';

const autores = 'http://localhost:4000/api/autores/';
const generos = 'http://localhost:4000/api/generos/';
const editoriales = 'http://localhost:4000/api/editoriales/';

const me='http://localhost:4000/api/libros/me';

const modificar='http://localhost:4000/api/libros/modificar';

const portada = 'http://localhost:4000/uploads/';

class ModificarUnLibro extends Component {
    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,

            token: sessionStorage.getItem('token'),
            titulo:'',
            ISBN:'',
            portadaImg: null,
            autor:'',
            editorial:'',
            genero:'',
            //fechaDeExpiracion: new Date(), 
            //fechaDePublicacion: new Date(), 
           // fechaDeHoy: new Date(),
    
            generos:[],
            autores:[],
            editoriales:[],

           


        }
        
    }

    setAutores(res){
        this.setState({
            autores:res
        });
    }
    setGeneros(res){
        this.setState({
            generos:res
        });
    }
    
    setEditoriales(res){   
        this.setState({
            editoriales:res
        });
       
    }

    setLibro = async (libro)=>{
        

        this.setState({
            id:libro._id,
            titulo:libro.titulo,
            ISBN:libro.isbn,
            portadaImg: libro.portada,
            autor:libro.autor,
            editorial: libro.editorial,
            genero: libro.genero , 
            //fechaDePublicacion: new Date(libro.lanzamiento),


        })
        
/*

        if(libro.expiracion){
            this.setState({
                fechaDeExpiracion: new Date(libro.expiracion),
            })
        }else{
            this.setState({
                fechaDeExpiracion: new Date,
            })
        }
        */



    }
    
    getData = async () => {
        
       
        await axios.get(autores,{
            
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            this.setAutores(res.data)
        })
        .catch(err =>{console.log(err)});

        await axios.get(generos,{
            
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            this.setGeneros(res.data)
        })
        .catch(err =>{console.log(err)});

        await axios.get(editoriales,{
            
            headers:{'xaccess': this.state.token}  
        })
        .then(res =>{
            this.setEditoriales(res.data)
        })
        .catch(err =>{console.log(err)});


        await axios.post(me,
          { id: this.state.id },
          { headers:{'xaccess': this.state.token}}
        ).then(res =>{

            console.log(res.data);
            this.setLibro(res.data);
        })
        .catch(err =>{console.log(err)})
      
    }

    async componentDidMount(){
        this.getData();
    }
   
    

    onSubmit = async (e) => {
        e.preventDefault();
/*
        if(this.state.fechaDePublicacion < this.state.fechaDeHoy){
            return alert('La fecha de publicación no debe ser menor a la fecha actual')
        }

        if(this.state.fechaDeExpiracion !=''){
            if(this.state.fechaDeExpiracion < this.state.fechaDePublicacion){
                return alert('La fecha de expiracion debe ser mayor a la de publicacion')
                
            }
        }
*/
        const formData = new FormData();
        formData.append('id', this.state.id);
        formData.append('titulo', this.state.titulo);
        formData.append('isbn',this.state.ISBN);
        formData.append('autor', this.state.autor);
        formData.append('editorial', this.state.editorial);
        formData.append('genero', this.state.genero);
        //formData.append('lanzamiento', this.state.fechaDePublicacion);
        formData.append('portadaImg', this.state.portadaImg);
        //formData.append('expiracion',this.state.fechaDeExpiracion)
    
        axios.post(modificar,formData,{
                headers: { 'xaccess':this.state.token }
            })
            .then(res => {
                alert(JSON.stringify(res.data));
            })
    
            .catch(err => {
                alert(JSON.stringify(err.data))
            } );
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onChangeFechaDePublicacion = fechaDePublicacion => {
        this.setState({ fechaDePublicacion });
    };

    onChangeFechaDeExpiracion = fechaDeExpiracion => {
        this.setState({ fechaDeExpiracion });
    };

    getPortada=(e)=>{
        this.setState({
            portadaImg: e.target.files[0]
        })

    }


  
    
    render() {

        const id=this.state.id;
        console.log('modificar libro');
        console.log(id)

        return (
            <div className="form-novedad" >
        
        <div className="col-md-6 offset-md-3">
        <div className="card card-body text-light bg-dark">
       
        
        <form onSubmit={this.onSubmit} >
            <h2 className="card-header">Modificar Libro</h2>
            <div className="form-group">
            <h5>Titulo</h5>
                <input 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    name ="titulo"
                    onChange={this.onInputChange}
                    value={this.state.titulo}
                    placeholder="Título"
                    required>
                </input>
            </div>
            <div className="form-group">
            <h5>ISBN</h5>
                <input 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    name ="ISBN"
                    onChange={this.onInputChange}
                    value={this.state.ISBN}
                    placeholder="ISBN"
                    required>
                </input>
            </div>

            <div className="form-group">
            <h5>Autor</h5>
                <select className="form-control"   
                    onChange={this.onInputChange} 
                    id="exampleFormControlSelect1" 
                    name="autor"
                    required>    
               
                {this.state.autores.map(autor =>
                <option selected={ autor._id=== this.state.autor  } key={autor._id} value={autor._id} >{autor.nombre} {autor.apellido}</option>
                        )}
                </select>
            </div>

            <div className="form-group">
            <h5>Genero</h5>
                    <select className="form-control"  onChange={this.onInputChange}  id="exampleFormControlSelect1" name="genero" required>
                    
                        {this.state.generos.map(ge =>
                        <option selected={ ge._id === this.state.genero  } key={ge._id} value={ge._id} >{ge.nombre}</option>
                        )}
                    </select>
            </div>

            <div className="form-group">
            <h5>Editorial</h5>
                    <select className="form-control"  onChange={this.onInputChange} id="exampleFormControlSelect1" name="editorial" required>
                    <option selected>Editorial</option>
                    {this.state.editoriales.map(ed =>
                    <option selected={ ed._id=== this.state.editorial  }  key={ed.id} value={ed._id} >{ed.nombre}</option>
                    )}
                    </select>
            </div>
            
           


            <label className="text-light">Portada Anterior</label>
            <div className="form-group">
            <img width="280px" height="auto" src={portada + `${this.state.portadaImg}`} />            
            </div>

            <label className="text-light">Portada:</label>
            <div className="form-group">

               <input type='file' encType="multipart/form-data" name='portadaImg' onChange={this.getPortada}>
               </input>
                
            </div >
    
            
            <div className="form-group">
                <button type ="submit" className="btn btn-success float-right"> Modificar </button>
            </div>
         </form>
         </div>
         </div>   
        
         </div> 
        )
    }
};



export default ModificarUnLibro;
/*
 <label className="text-light">Fecha De Publicacion</label>
            <div className="form-group">
               
                <DatePicker className="form-control"
                 selected={this.state.fechaDePublicacion}
                 name='fechaDePublicacion'
                 onChange={this.onChangeFechaDePublicacion}
                 required/>
            </div>
            
            <label className="text-light"> Fecha De Expiración</label>
            <div className="form-group">
               
                <DatePicker className="form-control"
                 selected={this.state.fechaDeExpiracion}
                 name='fechaDeExpiracion'
                 onChange={this.onChangeFechaDeExpiracion}
                />
            </div>
            */