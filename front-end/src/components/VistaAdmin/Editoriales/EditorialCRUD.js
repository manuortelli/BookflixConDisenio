import React, { Component } from 'react';
import axios from 'axios';
import NavegacionAdmin from '../NavegacionAdmin'

const editoriales = 'http://localhost:4000/api/editoriales/';
const cargar = 'http://localhost:4000/api/editoriales/cargar';
const borrar = 'http://localhost:4000/api/editoriales/eliminar/';
const modificar = 'http://localhost:4000/api/editoriales/modificar/';


class Editorial extends Component {
    constructor() {
        super();
        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            
            editoriales: [],
            nombre: '',
            nombre2:'',
            id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.agregarEditorial = this.agregarEditorial.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        
    }

    async getData() {
        await axios.get(editoriales, 
            { headers: { 'xaccess': this.state.token }
        })
            .then(res => {
                this.setState({
                    editoriales: res.data
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

    agregarEditorial = async (e) => {
        e.preventDefault();

    

        await axios.post(cargar,
            { nombre: this.state.nombre },
            { headers: { 'xaccess': this.state.token } }

        ).then(res => {
            this.getData();
            alert(JSON.stringify(res.data));
        })
        .catch(err => {
            alert(JSON.stringify(err.data))
        });

    };


    onInputChange2 = (e) => {
       this.setState({
            id: e.target.value
        });
    };

    eliminarEditorial = async (e) => {
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

    modificarEditorial = async (e) => {
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

                    <form onSubmit={this.agregarEditorial} >
                    <div className="form-group">
                        <div className="col s5">
                            <div className="form-input-field col s5 bg-dark">
                                <label className="text-light">Ingrese la editorial</label>
                                <input 
                                    className="form-control col s12"
                                    id="nombre"
                                    name="nombre"
                                    value={this.state.nombre}
                                    onChange={this.handleChange}
                                    placeholder="Ingrese el nombre de la editorial"
                                    required>
                                </input>
                                <div className="form-group">
                                <button type="submit" className="btn btn-success " > Agregar Edtorial </button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
                </div>
               

                
                <div className="form-input-field col s5 bg-dark">
                <div className="card card-body text-light bg-dark">

                    <form onSubmit={this.eliminarEditorial}>
                        <div className="form-group">
                            
                            <select className="form-control" onChange={this.onInputChange2} id="exampleFormControlSelect1" name="editorial">
                            <option selected>Seleccione una editorial para eliminar</option>
                                {this.state.editoriales.map(ed =>
                                    <option key={ed.id} value={ed._id} >{ed.nombre}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success" > Eliminar Editorial </button>
                        </div>
                    </form>
                </div>
                </div>
                


                
                <div className="form-input-field col s5 bg-dark">
                <div className="card card-body text-light bg-dark">

                    <form onSubmit={this.modificarEditorial}>

                        <div className="form-group">
                           
                            <select required className="form-control" onChange={this.onInputChange3} id="exampleFormControlSelect1" name="editorial">
                            <option selected>Seleccione una editorial para modificar</option>
                                {this.state.editoriales.map(ed =>
                                    <option key={ed.id} value={ed._id} >{ed.nombre}</option>
                                )}
                            </select>
                            <label className="text-light">Ingrese la nueva editorial</label>
                            <input
                                className="form-control col s12"
                                id="nombre2"
                                name="nombre2"
                                value={this.state.nombre2}
                                onChange={this.handleChange2}
                                required
                                placeholder="Ingrese el nuevo nombre">
                            </input>
                        </div>



                        <div className="form-group">
                            <button type="submit" className="btn btn-success" >
                                Actualizar Editorial
                            </button>
                        </div>


                    </form>
                </div>
                
                </div>


                </div>


                <div className="col-md-8">
                    {this.state.editoriales.map(ed =>
                        <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                            <div class="card-body">
                    
                                <h5 class="card-title" onChange={this.onInputChange2} >{ed.nombre}</h5>
                    
                            </div>
                        </div>
                    )}
                </div>
            </div>
            </div>
        )
    }
}
export default Editorial;