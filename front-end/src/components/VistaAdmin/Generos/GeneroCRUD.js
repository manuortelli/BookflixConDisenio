import React, { Component } from 'react';
import axios from 'axios';
import NavegacionAdmin from '../NavegacionAdmin'

const generos = 'http://localhost:4000/api/generos/';
const cargar = 'http://localhost:4000/api/generos/cargar';
const borrar = 'http://localhost:4000/api/generos/eliminar/';
const modificar = 'http://localhost:4000/api/generos/modificar/';


class Generos extends Component {
    constructor() {
        super();
        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            
            generos: [],
            nombre: '',
            nombre2:'',
            id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.agregarGenero = this.agregarGenero.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        

    }
    async getData() {
        await axios.get(generos, 
            { headers: { 'xaccess': this.state.token }
        })
            .then(res => {
                this.setState({
                    generos: res.data
                });
            })
            .catch(err => {
                alert(err)
            });

    }
    async componentDidMount() {
        await this.getData();
    };
    
    handleChange= (e) => {
        
        this.setState({
            [e.target.name]: e.target.value
        }

        );
    }
    handleChange2= (e) => {
        
        this.setState({
            [e.target.name]: e.target.value
        }

        );
    }
    

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    agregarGenero = async (e) => {
        e.preventDefault();
        if(generos.indexOf(this.state.nombre) > -1){
            return alert('El género ya fue cargado anteriormente')
        };
        await axios.post(cargar,
            { nombre: this.state.nombre },
            { headers: { 'xaccess': this.state.token } }

        ).then(res => {
            alert(JSON.stringify(res.data));
            
            this.getData()
        })

        .catch(err => {
            alert(JSON.stringify(err.data))
        } );

    };

    onInputChange2 = (e) => {
       this.setState({
            id: e.target.value
        });
    };

    eliminarGenero = async (e) => {
        e.preventDefault();

        await axios.post(borrar ,
            { id: this.state.id },
            { headers: { 'xaccess': this.state.token } }

        ).then(res => {
            this.getData();
            alert(JSON.stringify(res.data));
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

    modificarGenero = async (e) => {
        e.preventDefault();

        await axios.post(modificar,
            { id: this.state.id,
            nombre: this.state.nombre2 },
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
                
                <div className="form-autor" >
                <div className="form-input-field col s5 bg-dark">
                <div className="card card-body text-light bg-dark">

                    <form onSubmit={this.agregarGenero} >
                    <div className="form-group">
                        <div className="col s5">
                            <div className="form-input-field col s5 bg-dark">
                               
                                <input 
                                    className="form-control col s12"
                                    id="nombre"
                                    name="nombre"
                                    value={this.state.nombre}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese género"
                                    required>
                                </input>
                                <div className="form-group">
                                <button type="submit" className="btn btn-success " > Agregar Género </button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
                </div>
               

                
                <div className="form-input-field col s5 bg-dark">
                <div className="card card-body text-light bg-dark">

                    <form onSubmit={this.eliminarGenero}>
                        <div className="form-group">
                            
                            <select className="form-control" onChange={this.onInputChange2} id="exampleFormControlSelect1" name="editorial">
                            <option selected>Seleccione un género para eliminar</option>
                                {this.state.generos.map(ge =>
                                    <option key={ge.id} value={ge._id} >{ge.nombre}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success" > Eliminar Género </button>
                        </div>
                    </form>
                </div>
                </div>
                


                
                <div className="form-input-field col s5 bg-dark">
                <div className="card card-body text-light bg-dark">

                    <form onSubmit={this.modificarGenero}>

                        <div className="form-group">
                           
                            <select required className="form-control" onChange={this.onInputChange3} id="exampleFormControlSelect1" name="editorial">
                            <option selected>Seleccione un género para modificar</option>
                                {this.state.generos.map(ge =>
                                    <option key={ge.id} value={ge._id} >{ge.nombre}</option>
                                )}
                            </select>
                            
                            <input
                                className="form-control col s12"
                                id="nombre2"
                                name="nombre2"
                                value={this.state.nombre2}
                                onChange={this.handleChange2}
                                required
                                placeholder="Ingrese el nuevo género">
                            </input>
                        </div>



                        <div className="form-group">
                            <button type="submit" className="btn btn-success" >
                                Actualizar Género
                            </button>
                        </div>


                    </form>
                </div>
                
                </div>


                </div>


                <div className="col-md-8">
                    {this.state.generos.map(ge =>
                        <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                            <div class="card-body">
                    
                                <h5 class="card-title" onChange={this.onInputChange2} >{ge.nombre}</h5>
                    
                            </div>
                        </div>
                    )}
                </div>
            </div>
            </div>
        )
    }
}
export default Generos;