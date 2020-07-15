import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../../node_modules/axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const eliminar = 'http://localhost:4000/api/trailers/eliminar';

class ItemListTrailerAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trailer:props.trailer,
        
        }
        

    }

    eliminarTrailer = async () => {

        await axios.post(eliminar,
            { id: this.props.trailer._id },
            { headers: { 'xaccess': sessionStorage.getItem('token') } }

        ).then(res => {
            alert(res.data)
        })
            .catch(err => {
                alert(JSON.stringify(err.response.data.msg));
            });

    }

    componentDidMount = async () => {
        
    }


    

    render() {
      

        return (
            <div>
                <div class="card-body" >
                </div>
                <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                    <div class="card-body">


                        <h5 className="card-title "> {this.props.trailer.titulo} </h5>


                        <Link className='btn btn-outline-success itemBoton' to={'/trailers/detalle/' + this.props.trailer._id}  >
                            Ver detalle
                        </Link>
                        {' '} {' '}
                        <Link className='btn btn-outline-success itemBoton' to={'/trailers/modificar/' + this.props.trailer._id}  >
                            Modificar
                        </Link>
                        {' '} {' '}
                        <button className="btn btn-outline-danger itemBoton" onClick={() => confirmAlert({
                            customUI: ({ onClose }) => {
                                return (
                                    <div className='custom-ui'>
                                        <h1>¿Está seguro?</h1>
                                        {' '}
                                        <p>¿Desea eliminar el trailer?</p>
                                        {' '}
                                        <button onClick={onClose}>No</button> {' '}
                                        <button
                                            onClick={() => {
                                                this.eliminarTrailer();
                                                onClose();
                                            }}
                                        >
                                            Si, deseo eliminarlo
                            </button>
                                    </div>
                                );
                            }
                                     })}>Eliminar</button> {''}
                        
                        
                        
                       
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemListTrailerAdmin;