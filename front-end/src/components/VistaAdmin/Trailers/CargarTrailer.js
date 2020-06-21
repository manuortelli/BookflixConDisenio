import React, { Component } from '../../../../node_modules/react'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DatePicker from '../../../../node_modules/react-datepicker';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import axios from '../../../../node_modules/axios';
import {  Redirect } from 'react-router-dom';

const cargar = 'http://localhost:4000/api/trailers/cargar';
const libros = 'http://localhost:4000/api/libros';

/*CARGAR TRAILER
- cargar trailer-> muy parecido a la novedad
- titulo y descripcion obligatorios
- libro asociado maximo y opcional
- se puede cargar un pdf - opcional
- se puede cargar un video - opcional*/ 

class CargarTrailer extends Component {

    constructor(){
        super();
            this.state = {
                user: JSON.parse(sessionStorage.getItem('user')),
                token: sessionStorage.getItem('token'),
                titulo: '',
                descripcion: '',
                libros: [ ],
                archivo:null,
                libroseleccionado:null,
                video:null,

                
    };
        this.getPdf=this.getPdf.bind(this);
        this.getVideo=this.getVideo.bind(this);
        this.getLibros=this.getLibros.bind(this);
        this.onInputChangeLibro=this.onInputChangeLibro.bind(this);
        this.onInputChange=this.onInputChange.bind(this);
    }
    
 

    onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titulo', this.state.titulo);
        formData.append('descripcion', this.state.descripcion);
        if (this.state.libro != null){
            formData.append('libro', this.state.libro);}
        if (this.archivo !== null){
            formData.append('archivo', this.state.archivo);
        }
        if (this.video !== null){
            formData.append('video', this.state.video);
        }
        for (var value of formData.values()) {
            console.log(value); }
        axios.post(cargar,formData,{
                headers: { 'xaccess':this.state.token }
            })
            .then(res => {
                alert("Trailer cargado con exito");
            })
            .catch(err => {
                alert(JSON.stringify(err.response.data.msg))
            } );
            
    };

    onInputChangeLibro =  async (e) => {
        this.setState({
            libroseleccionado: e.target.value
        })
        console.log(this.state.libroseleccionado)
    };


    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    getPdf = (e) => {
            if (this.state.archivo != null)
            { return alert ("Ya se ha cargado un video, no se pueden cargar ammbos")}
            else {
            this.state.video="no";
            this.state.archivo= e.target.files[0].name;}
        console.log(this.state.video, this.state.archivo)
    }
    

    getVideo = (e) => {
        if (this.state.archivo != null)
        { return alert ("Ya se ha cargado un pdf, no se pueden cargar ammbos")}
        else {
            this.state.video='si';
            this.state.archivo= e.target.files[0].name;
           }
       
        
    }

    getLibros = async () => {
            const {user} = this.state.user;
            await axios.get(libros,{
                user: user,
                headers:{'xaccess':this.state.token}  
            })
            .then(res =>{
                    this.setState({ libros :res.data
                    })
            })
            .catch();
    
    
    
        }
    

    componentDidMount = async () => {
        this.getLibros();
    }

    render(){
        return (
        <div className="form-novedad" >
        
        <div className="col-md-6 offset-md-3">
        <div className="card card-body text-light bg-dark">
        <h2 className="card-header">Cargar Trailer</h2>
        
        <form onSubmit={this.onSubmit} >
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
            <h5>Descripción</h5>
                <textarea className="form-control" 
                    id="exampleFormControlTextarea1" 
                    rows="3"
                    name ="descripcion"
                    onChange={this.onInputChange}
                    value={this.state.descripcion}
                    placeholder="Descripción"
                    required >
                </textarea> 
            </div>

            <label className="text-light">Seleccione un libro asociado (Opcional)</label>

            <div className="form-group">
            <select className="form-control"  onChange={this.onInputChangeLibro}  id="exampleFormControlSelect1" name="libros">
            <option value="" selected>Libro Para seleccionar</option>
                {this.state.libros.map(libro =>
                <option key={libro._id} value={libro._id} >{libro.titulo}</option>
                )}
            </select>
            </div>
        
            
       
            <label className="text-light">Seleccione Archivo PDF (Opcional)</label>
            <div className="form-group">

               <input type='file' encType="multipart/form-data" name='ArchivoPDF' onChange={this.getPdf} accept=".pdf">
               </input>
                
            </div >

            <label className="text-light">Seleccione un Video (Opcional)</label>
            <div className="form-group">

               <input type='file' encType="multipart/form-data" name='Video' onChange={this.getVideo}>
               </input>
                
            </div >
            

            <div className="form-group">
                <button type ="submit" className="btn btn-success float-right">
                    Agregar          
                </button>
            </div>
                    
          
         </form>
         </div>
         </div>   
         </div>
        )
    }
}


export default CargarTrailer;