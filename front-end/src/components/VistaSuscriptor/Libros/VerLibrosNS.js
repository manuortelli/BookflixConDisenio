import React, { Component } from 'react';
import axios from 'axios';
import { Container, Col, Row, Card } from 'react-bootstrap'

//PARA EL CARROUSEL
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";



const libros = 'http://localhost:4000/api/libros/';
const portada = 'http://localhost:4000/uploads/';

class VerLibrosNS extends Component {
    constructor() {
        super();
        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            libros: [],
            librosCarrousel: [],


        }

    }
    
    setLibros(res) {

        var num = 1;
        var aux = [];
        var aux2 = [];

        res.map(libro => {
            if (aux.length < num) {
                aux.push(libro);
            }
            else {
                aux.push(libro);
                aux2.push(aux);
                aux = []
            };
        })
        if (aux != []) {
            aux2.push(aux);
        }

        this.setState({
            libros: res,
            librosCarrousel: aux2

        });
    }


    

    

    getData = async () => {
        const { user } = this.state.user;


        await axios.get(libros, {
            user: user,
            headers: { 'xaccess': this.state.token }
        })
            .then(res => {
                this.setLibros(res.data)
            })
            .catch();



    }
    async componentDidMount() {

        this.getData();
    }


    render() {

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            className: 'slides'

        };

        return (
            <div className="carrusel">
                <Slider {...settings}>
                {this.state.librosCarrousel.map(libros => 
                           <div className="container-VerLibro">
                               
                                {libros.map(libro =>
                                    <div className="box">
                                        <span className="imgBx">
                                            <img src={portada + libro.portada} />
                                        </span>
                                        <span className="content">
                                            <span>
                                                <h2 className="titulo"> {libro.titulo} </h2>
                                                <p className="desc">  kk {libro.descripcion} </p>
                                            </span>
                                        </span>
                                    </div>
                                )}
                            </div>
                            
                        )}
                      
                    
                      </Slider>

            </div>
   
        )
    }
}

export default VerLibrosNS;


/*

<Container>
               <Slider {...settings}>
                {this.state.librosCarrousel.map(libros => 
                       <React.Fragment>
                           <Col md="3"> 
                           <div className="container-VerLibro">
                                {libros.map(libro =>
                                    <div className="box">
                                        <div className="imgBx">
                                            <img src={portada + libro.portada} />
                                        </div>
                                        <div className="content">
                                            <div>
                                                <h2 className="titulo"> {libro.titulo} </h2>
                                                <p className="desc">  kk {libro.descripcion} </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        </Col>
                        </React.Fragment>
                    
                </Slider>
            </Container> */ 