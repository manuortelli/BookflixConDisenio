import React, { Component } from 'react';
import axios from 'axios';
import NavegacionAdmin from '../NavegacionAdmin'




const getAutores = 'http://localhost:4000/api/autores/';
const cargar = 'http://localhost:4000/api/autores/cargar';
const borrar = 'http://localhost:4000/api/autores/eliminar/';
const modificar = 'http://localhost:4000/api/autores/modificar/';


class Autor extends Component {
    constructor() {
        super();
        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            
            autores: [],
            nombre: '',
            nombre2:'',
            apellido:'',
            apellido2: '',
            id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.agregarAutor = this.agregarAutor.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.eliminarAutor = this.eliminarAutor.bind(this);
        this.modificarAutor = this.modificarAutor.bind(this);
    }
    async getData() {
        await axios.get(getAutores, 
            { headers: { 'xaccess': this.state.token }
        })
            .then(res => {
                this.setState({
                    autores: res.data
                });
            })
            .catch(err => {
                alert(err)
            });

    }
    async componentDidMount() {
        await this.getData();
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleChange2 = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    onInputChange2 = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            id: e.target.value
        })
    };

    agregarAutor = async (e) => {
        e.preventDefault();

        await axios.post(cargar,
            { nombre: this.state.nombre,
                apellido: this.state.apellido },
            { headers: { 'xaccess': this.state.token } }

        ).then(res => {
            alert(JSON.stringify(res.data));
            this.getData()
        })

        .catch(err => {
            alert(JSON.stringify(err.data))
        } );

    };


    eliminarAutor = async (e) => {
        e.preventDefault();

        await axios.post(borrar ,
            { id: this.state.id },
            { headers: { 'xaccess': this.state.token } }

        ).then(res => {
            alert(JSON.stringify(res.data));
            this.getData();
        })
            .catch(err => { 
                alert(JSON.stringify(err.response.data.msg))
        });
    };

    onInputChange3 = (e) => {
        this.setState({
            id: e.target.value
        });
    };

    modificarAutor = async (e) => {
        e.preventDefault();

        await axios.post(modificar,
            { id: this.state.id,
            nombre: this.state.nombre2,
            apellido: this.state.apellido2},
            { headers: { 'xaccess': this.state.token } }

        ).then(res => {
            this.getData();
            alert(JSON.stringify(res.data));
        })
        .catch(err => {
            alert(JSON.stringify(err.data))
        });

    };


    render() {
        return (
            <div><NavegacionAdmin/>
            
                <div className="row">
                <div className="form-input-field">
                    <form onSubmit={this.agregarAutor} >

                        <div className="cardAutor offset-md-1">
                        <div className="card-header">
				            <h5>Agregar Autor</h5>
                            </div>
                            <div className="card-body">
                                <label className="text-light">Ingrese Nombre y Apellido</label>
                                <input className="form-control col s12"
                                    id="nombre"
                                    name="nombre"
                                    value={this.state.nombre}
                                    onChange={this.handleChange}
                                    placeholder="Nombre"
                                    required>
                                </input>
                                
                                <input className="form-control col s12"
                                    id="apellido"
                                    name="apellido"
                                    value={this.state.apellido}
                                    onChange={this.handleChange}
                                    placeholder="Apellido"
                                    required>
                                </input>
                                
                            </div>
                            <div className="form-group col s12 ">
                                <button type="submit" className="btn btn-success float-right " > Agregar Autor/a </button>
                                </div>
                        </div>
                    </form>
               
               
                   
                
              

                    <form onSubmit={this.eliminarAutor}>
                        <div className="cardEliminarAutor offset-md-1">
                        <div className="card-header">
				            <h5>Eliminar Autor</h5>
                            </div>
                        <div className="card-body">  
                            <select className="form-control col s12" onChange={this.onInputChange2} id="exampleFormControlSelect1" name="editorial">
                            <option selected>Seleccione un autor/a para eliminar</option>
                                {this.state.autores.map(a =>
                                    <option key={a.id} value={a._id} >{a.nombre} {a.apellido}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group col s12 ">
                            <button type="submit" className="btn btn-success float-right" > Eliminar Autor/a </button>
                        </div>
                        </div>
                    </form>


                    
                

                    <form onSubmit={this.modificarAutor}>
                        

                        <div className="cardEditarAutor offset-md-1">
                        <div className="card-header">
				            <h5>Modificar Autor</h5>
                            </div>
                        <div className="card-body">
                            <select required className="form-control" onChange={this.onInputChange3} id="exampleFormControlSelect1" name="editorial">
                            <option selected>Seleccione un/a Autor/a para editar</option>
                                {this.state.autores.map(a =>
                                    <option key={a.id} value={a._id} >{a.nombre} {a.apellido}</option>
                                )}
                            </select>
                            <label className="text-light">Ingrese los nuevos datos</label>
                            <input className="form-control col s12"
                                    id="nombre2"
                                    name="nombre2"
                                    value={this.state.nombre2}
                                    onChange={this.handleChange2}
                                    placeholder="Nombre"
                                    required>
                                </input>
                                <input className="form-control col s12"
                                    id="apellido2"
                                    name="apellido2"
                                    value={this.state.apellido2}
                                    onChange={this.handleChange2}
                                    placeholder="Apellido"
                                    required>
                                </input>
                        </div>

                                    
                        <div className="form-group col s12 ">
                            <button type="submit" className="btn btn-success float-right " >
                                Actualizar Autor/a
                            </button>
                        </div>

                        </div>
                    </form>


                </div>


                <div className="col-md-4">
                    {this.state.autores.map(a =>
                        <div class="card col-md-12 offset-md-5 text-light bg-dark" >
                            <div class="card-body">
                    
                                <h5 class="card-title" onChange={this.onInputChange2} >{a.nombre} {a.apellido}</h5>
                    
                            </div>
                        </div>
                    )}
                </div>
            
            </div>
            </div>
        )
    }
}
export default Autor;