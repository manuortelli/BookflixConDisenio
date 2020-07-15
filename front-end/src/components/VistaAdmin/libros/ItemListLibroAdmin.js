import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../../node_modules/axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const autores = 'http://localhost:4000/api/autores/';
const eliminarArchivo= 'http://localhost:4000/api/libros/eliminarArchivoLibro';
const eliminar = 'http://localhost:4000/api/libros/eliminar';

class ItemListLibro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            libro:props.libro,
         
            autor:'',
            mostrarEliminarArchivo:false,
        }
        this.getNombres = this.getNombres.bind(this);

    }

    getNombres = async () =>{
        await axios.post(autores+'me',
        { id: this.props.libro.autor },
        { headers:{'xaccess': sessionStorage.getItem('token')}}
    )
    .then(res =>{
    
        this.setState({
            autor:res.data
        })
    })
    .catch(err =>{console.log(err)});

    

  
  }
    eliminarLibro = async () => {

        await axios.post(eliminar,
            { id: this.props.libro._id },
            { headers: { 'xaccess': sessionStorage.getItem('token') } }

        ).then(res => {
            alert(JSON.stringify(res.data.msg))
        })
            .catch(err => {
                alert(JSON.stringify(err.response.data.msg))
            });

    }

    async componentDidMount(){
        this.getNombres();
        this.mostrarEliminarArchivo();
        console.log(this.props.libro)
    }
    mostrarEliminarArchivo=()=>{
        if(this.props.libro.archivo == null ||   this.props.libro.archivo == ''){
            this.setState({
                mostrarEliminarArchivo:false
            })
        }else{
            this.setState({
                mostrarEliminarArchivo:true
            })
        }
        
    }
    eliminarArchivoLibro=async ()=>{
        await axios.post(eliminarArchivo,
            { idLibro: this.props.libro._id },
            { headers: { 'xaccess': sessionStorage.getItem('token') } }

        ).then(res => {
            alert(JSON.stringify(res.data.msg))
        })
            .catch(err => {
                alert(JSON.stringify(err.response.data.msg))
            });


    }

    render() {
        const mostrarEliminarArchivo = this.state.mostrarEliminarArchivo;
      
        const show=this.props.libro.finalizado;

        return (
            <div>
                <div class="card-body" >
                </div>
                <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                    <div class="card-body">


                        <h5 className="card-title "> {this.props.libro.titulo} </h5>


                        <Link className='btn btn-outline-success itemBoton' to={'/libro/detalle/' + this.props.libro._id}  >
                            Ver detalle
                        </Link>
                        {' '} {' '}
                        <button className="btn btn-outline-danger itemBoton" onClick={() => confirmAlert({
                            customUI: ({ onClose }) => {
                                return (
                                    <div className='custom-ui'>
                                        <h1>¿Está seguro?</h1>
                                        {' '}
                                        <p>¿Desea cerrar el libro?</p>
                                        {' '}
                                        <button onClick={onClose}>No</button> {' '}
                                        <button
                                            onClick={() => {
                                                this.eliminarLibro();
                                                onClose();



                                            }}
                                        >
                                            Si, deseo eliminar
                            </button>
                                    </div>
                                );
                            }
                                     })}>Eliminar</button> {''}
                        <Link to={'/libros/modificar/' + this.props.libro._id} className='btn btn-outline-success itemBoton'> Modificar</Link>

                            {' '}
                    
                        <Link to={'libros/modificarFechas/' + this.props.libro._id} className='btn btn-outline-success itemBoton'> Modificar Fechas</Link>{' '}
                        <br></br>
                        {show ? (
                        <React.Fragment>
                        
                        </React.Fragment>
                           ) : ( <React.Fragment><Link to={'libro/cargar/' + this.props.libro._id} className='btn btn-outline-info itemBoton'> Cargar libro</Link>{' '}
                           <Link to={'libro/cargarCapitulo/' + this.props.libro._id} className='btn btn-outline-info itemBoton'> Cargar Capitulos</Link>{' '}</React.Fragment>
                           )}

                        {mostrarEliminarArchivo ? (
                        <React.Fragment>
                            {' '}
                        <button className="btn btn-outline-danger itemBoton" onClick={() => confirmAlert({
                            customUI: ({ onClose }) => {
                                return (
                                    <div className='custom-ui'>
                                        <h1>¿Está seguro?</h1>
                                        {' '}
                                        <p>¿Desea cerrar el libro?</p>
                                        {' '}
                                        <button onClick={onClose}>No</button> {' '}
                                        <button
                                            onClick={() => {
                                                this.eliminarArchivoLibro();
                                                onClose();



                                            }}
                                        >
                                            Si, deseo eliminar
                            </button>
                                    </div>
                                );
                            }
                                     })}>Eliminar archivo del libro</button>
                        
                        </React.Fragment>
                           ) : ( <React.Fragment></React.Fragment>
                           )}
                        <Link className='btn btn-outline-success itemBoton' to={'/libro/reseñas/' + this.props.libro._id}  >
                            Ver reseñas
                        </Link>
                        
                       
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemListLibro;