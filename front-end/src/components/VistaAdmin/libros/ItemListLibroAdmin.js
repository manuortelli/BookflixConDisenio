import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../../node_modules/axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const autores = 'http://localhost:4000/api/autores/'
const eliminar = 'http://localhost:4000/api/libros/eliminar';

class ItemListLibro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            libro:props.libro,
         
            autor:'',
        }
        this.getNombres = this.getNombres.bind(this);

    }

    getNombres = async () =>{
        await axios.post(autores+'me',
        { id: this.props.libro.autor },
        { headers:{'xaccess': sessionStorage.getItem('token')}}
    )
    .then(res =>{
        console.log(res.data);
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
            alert(res.data)
        })
            .catch(err => {
                alert(err.data)
            });

    }

    async componentDidMount(){
        this.getNombres();
    }

    

    render() {
      

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
                        <Link to={'libro/cargar/' + this.props.libro._id} className='btn btn-outline-info itemBoton'> Cargar libro</Link>{' '}
                        <Link className='btn btn-outline-info itemBoton'> Cargar Capitulos</Link>{' '}
                        
                        
                       
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemListLibro;