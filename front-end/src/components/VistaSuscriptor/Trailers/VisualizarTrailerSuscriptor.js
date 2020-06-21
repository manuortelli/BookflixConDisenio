import React, { Component } from 'react';
import axios from 'axios';



const file = 'http://localhost:4000/uploads/';
const me = 'http://localhost:4000/api/trailers/me';
const meLibro= "http://localhost:4000/api/libros/me";


class VisualizarTrailer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            token: sessionStorage.getItem('token'),
            trailer: [],
            libro: [],
            
        }
        this.getDatos=this.getDatos.bind(this);
        this.getDataLibro=this.getDataLibro.bind(this);

    }

    getDataLibro = async () => {
        await axios.post(meLibro,
        { id: this.state.trailer.libro },
        { headers: { 'xaccess': this.state.token } }
    )
        .then(res => {
            this.setState({
                libro: res.data
            })
            console.log(this.state.libro)
        })
        .catch(err => { console.log(err) });
}
    


    getDatos = async () => {
        await axios.post(me,
            { id: this.state.id },
            { headers: { 'xaccess': this.state.token } }
        )
            .then(res => {
                this.setState({
                    trailer: res.data
                })
                this.getDataLibro();
            })
            .catch(err => { console.log(err) });
    }

    async componentDidMount() {
        this.getDatos();

    }

    render() {
        const show=this.state.trailer.video;

        return (
            <div class="card col-md-6 offset-md-3 text-light">
                <div class="card-body button">

                    <h5 class="card-header">{this.state.trailer.titulo}</h5>
                    <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-light"> {this.state.trailer.descripcion}</h6>
                    
                    { show == "si" ? 
                        <video width="500" height="300" controls="controls" autoPlay="false" src={ file + `${this.state.trailer.archivo}`}/>
                        :
                        <iframe src={ file + `${this.state.trailer.archivo}`} scrolling="auto" height="700" width="500" options="false" />
                    }
                    </div>
                <h6 class="card-subtitle mb-2 text-light"> Este es el trailer de libro titulado: {this.state.libro.titulo}</h6>
                </div>

            </div>
        )
    }
}

export default VisualizarTrailer;