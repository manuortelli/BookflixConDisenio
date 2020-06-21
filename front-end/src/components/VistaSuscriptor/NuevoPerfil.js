import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {  Redirect } from 'react-router-dom';

//Constante a la cual hacemos la consulta
const suscriptores = 'http://localhost:4000/api/suscriptores/me';
const cargar = 'http://localhost:4000/api/suscriptores/agregarPerfil';

export default class NuevoPerfil extends Component {
    constructor() {
        super();
        this.state = {
            token: sessionStorage.getItem('token'),
            user: sessionStorage.getItem('user'),
            nombre: '',
            miSuscripcion: []

        };
        this.onInputChange=this.onInputChange.bind(this);

    }

    
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    setSusripcion(res){
        this.setState({
            miSuscripcion:res
        });
    }

    getData = async () =>{
        await axios.get(suscriptores,{
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            this.setSusripcion(res.data)
        })
        .catch(err =>{
            alert(err.response)});

    }
    async componentDidMount(){

        this.getData();
    }


    onSubmit = async (e) => {
        e.preventDefault();
 
        const formData = new FormData();
        formData.append('_id', this.state.miSuscripcion._id);
        formData.append('vencimiento', this.state.nombre);
    
        axios.post(cargar,formData,{
                headers: { 'xaccess':this.state.token }
            })
            .then(res => {
                alert(JSON.stringify(res.data));
                return( <Redirect to="http://localhost:3000/suscriptor/suscripcion/perfiles" />)
            })
    
            .catch(err => {
                alert(JSON.stringify(err.data))
            } );
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
    render() {
        return (
            <div className="container">
                <div className="cardVS col-md-6 offset-md-3 text-light bg-dark" >
                   
                    <div className="card-body">
                        <div className="form-group">
                            <h5>Nombre del perfil</h5>
                            <textarea className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="1"
                                name="nombre"
                                onChange={this.onInputChange}
                                value={this.state.nombre}
                                placeholder="Nombre del nuevo perfil"
                                required >
                            </textarea>
                        </div>
                    </div>
                    <button type="submit" className='btn login_btn float-right'>Agregar Perfil</button>
                </div>


            </div>





        )
    }
}