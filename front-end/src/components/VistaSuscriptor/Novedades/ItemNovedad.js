import React, { Component } from 'react';
import axios from '../../../../node_modules/axios';
const portada = 'http://localhost:4000/uploads/';
const me = 'http://localhost:4000/api/novedades/me';


class ItemNovedad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            token: sessionStorage.getItem('token'),
            novedad: ''
        }

    }
    getDatos = async () => {
        await axios.post(me,
            { id: this.state.id },
            { headers: { 'xaccess': this.state.token } }
        )
            .then(res => {
                console.log(res.data);
                this.setState({
                    novedad: res.data
                })
            })
            .catch(err => { console.log(err) });
    }

    async componentDidMount() {
        this.getDatos()
    }
    mostrarFecha = (f) => {
        var fecha = new Date(f);
        var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
        return (fecha.getDate() + " de " + meses[fecha.getMonth()] + " de " + fecha.getFullYear());
        //return fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear();
    }

    render() {

        return (
            <div className="cardNovedad">
                <div class="card-body " key={this.state.novedad._id}>
                </div>
                <div class="card-body">
                    <img alt='' width="550px" height="400px" src={portada + `${this.state.novedad.portada}`} />
                    <h5 class="card-header mb-2 text-light">{this.state.novedad.titulo}</h5>
                    <h6 class="card-subtitle mb-2 text-light">{this.state.novedad.descripcion}</h6>
                    <h6 class="card-subtitle mb-2 text-light">Publicada el {this.mostrarFecha(this.state.novedad.publicacion)}</h6>
                </div>

            </div>
        )
    }
}

export default ItemNovedad;
