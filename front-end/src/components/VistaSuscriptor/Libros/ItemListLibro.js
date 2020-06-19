import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import 'react-confirm-alert/src/react-confirm-alert.css';



class ItemNovedad extends Component {
    constructor(props) {
        super(props)
        this.state = {
            capitulo: this.props.libro.capitulos,
            bottonCap: false,
            cantCaps: this.props.libro.capitulos.length,
            capseleccionado:1,

        }
        this.onInputChange=this.onInputChange.bind(this);
    }

    onInputChange = (e) => {
        this.setState({
            capseleccionado: e.target.value
        })
        console.log(this.state.capitulo[this.state.capseleccionado-1].archivo)
    };

    HayCapitulos = () => {
        if (this.state.capitulo != "") {
            this.state.bottonCap = true;
        }
    }

    componentDidMount = () => {
        this.HayCapitulos();
        
        
    }

    



    render() {
        const show = this.state.bottonCap;
        const capseleccionado = this.state.capseleccionado-1;
        

        return (
            <div>
                <div class="card-body" >
                </div>
                <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                    <div class="card-body">


                        <h5 className="card-title ">{this.props.libro.titulo} </h5>

                        <Link className='btn btn-outline-success itemBoton' to={'/suscriptor/libros/' + this.props.libro._id}  >
                            Ver detalle
                           </Link>


                        {show ? (

                        <React.Fragment>
                            <select className="form-control"
                                onChange={this.onInputChange}
                                id="capseleccionado"
                                name="capseleccionado"
                                required>
                                <option selected>Numero de Capitulo</option>
                                {this.state.capitulo.map(cap =>
                                    <option key={cap._id} value={cap.n} >{cap.n}</option>
                                )}
                            </select>

                            <Link className='btn btn-outline-success itemBoton' to={'/suscriptor/libros/leerCapitulo/' + this.state.capitulo[this.state.capseleccionado-1].archivo}  >
                                Leer Capitulo
                           </Link>
                           </React.Fragment>
                        
                        ) : (
                                <Link className='btn btn-outline-success itemBoton' to={'/suscriptor/libros/leer/' + this.props.libro.archivo}  >
                                    Leer Libro
                                </Link>
                            )}






                    </div>
                </div>
            </div>


        )
    }
}

export default ItemNovedad;
