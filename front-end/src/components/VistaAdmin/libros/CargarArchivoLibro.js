import React, { Component } from '../../../../node_modules/react'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DatePicker from '../../../../node_modules/react-datepicker';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import axios from '../../../../node_modules/axios';
import {  Redirect } from 'react-router-dom';


const cargar = 'http://localhost:4000/api/cargarlibro';

class CargarLibro extends Component {
    constructor(){
        super()
        this.state = {
            token: sessionStorage.getItem('token'),
            lanzamiento:new Date(),
            vencimiento:'',
            pdf:null,

        };
       
        this.getPdf=this.getPdf.bind(this);
        this.onInputChange=this.onInputChange.bind(this);
        this.onChangeFechaDeVencimiento=this.onChangeFechaDeVencimiento.bind(this);
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    getPdf(e){
        this.setState({
            pdf: e.target.files[0]
        })
    };

    onChangeFechaDeVencimiento = vencimiento => {
        this.setState({ vencimiento });
    };


    onSubmit = async (e) => {
        e.preventDefault();
 
        const formData = new FormData();
        formData.append('lanzamiento', this.state.lanzamiento);
        formData.append('vencimiento', this.state.vencimiento);
        formData.append('pdf', this.state.pdf);
    
        axios.post(cargar,formData,{
                headers: { 'xaccess':this.state.token }
            })
            .then(res => {
                alert(JSON.stringify(res.data));
                return( <Redirect to="http://localhost:3000/libros" />)
            })
    
            .catch(err => {
                alert(JSON.stringify(err.data))
            } );
    };

    render(){
        return (
        <div className="form-novedad" >
        
        <div className="col-md-6 offset-md-3">
        <div className="card card-body text-light bg-dark">
        <h3 className="card-header">
                Cargar Archivo
        </h3>
       
        <form onSubmit={this.onSubmit} >

            <label className="text-light">Archivo PDF</label>
            <div className="form-group">

               <input type='file' encType="multipart/form-data" name='pdf'>
               </input>
                
            </div >

            <label className="text-light">Fecha De Vencimiento (Opcional)</label>
            <div className="form-group">
               
                <DatePicker className="form-control"
                 selected={this.state.vencimiento}
                 name='fechaDePublicacion'
                 onChange={this.onChangeFechaDeVencimiento}
                 />
            </div>
            <div className="form-group">
                <button type ="submit" className="btn btn-success float-right"> Agregar </button>
            </div>

         </form>
         </div>
         </div>   
        
         </div> 

           
        )
    }


}

export default CargarLibro;