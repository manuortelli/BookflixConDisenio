import React, { Component } from '../../../../node_modules/react'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DatePicker from '../../../../node_modules/react-datepicker';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import axios from '../../../../node_modules/axios';
import {  Redirect } from 'react-router-dom';

const cargar = 'http://localhost:4000/api/trailers/cargar';

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
                pdf: null, 
                video: null,
    };
        this.getPdf=this.getPdf.bind(this);
        this.getVideo=this.getVideo.bind(this);
    }
    
    

    onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titulo', this.state.titulo);
        formData.append('descripcion', this.state.descripcion);
        if (this.state.pdf == null){
        formData.append('portadaImg',this.state.video);   }
        else {
        formData.append('portadaImg',this.state.pdf); }

  

    
        axios.post(cargar,formData,{
                headers: { 'xaccess':this.state.token }
            })
            .then(res => {
                alert(JSON.stringify(res.data));
                return( <Redirect to="http://localhost:3000/novedad" />)
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
    

    getPdf(e){
        
        this.setState({
            pdf: e.target.files[0]
        })

    }

    getVideo(e){
        
        this.setState({
            video: e.target.files[0]
        })

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
        
            <label className="text-light">Seleccione Archivo PDF (Opcional)</label>
            <div className="form-group">

               <input type='file' encType="multipart/form-data" name='ArchivoPDF' onChange={this.getPdf}>
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