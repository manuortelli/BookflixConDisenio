import React, { Component } from 'react';
import axios from 'axios';
import PDFViewer from 'pdf-viewer-reactjs';



const file = 'http://localhost:4000/uploads/';
const me = 'http://localhost:4000/api/trailers/me';


class VisualizarTrailer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            token: sessionStorage.getItem('token'),
            trailer: [],
            
        }

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

            })
            .catch(err => { console.log(err) });
    }

    async componentDidMount() {
        this.getDatos();
    }

    render() {
       
        return (
            <div class="card col-md-6 offset-md-3 text-light">
                <div class="card-body button">

                    <h5 class="card-header">{this.state.trailer.titulo}</h5>
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-light"> {this.state.trailer.descripcion}</h6>


                        {/*<video width="500" height="300" controls="controls" autoPlay="false" src="http://localhost:4000/uploads/ + this.state.trailer.video "/>
                        */}
                        <iframe src={ file + `${this.state.trailer.archivo}`} scrolling="auto" height="700" width="500" options="false" />
                    </div>
                </div>

            </div>
        )
    }
}

export default VisualizarTrailer;