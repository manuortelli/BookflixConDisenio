import React, { Component } from "react";
import axios from "axios";
import { Container, Col, Row, Card } from "react-bootstrap";

//PARA EL CARROUSEL
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, Redirect } from "react-router-dom";

class HistorialCapitulos extends Component {
  constructor() {
    super();
    this.state = {
      librosCarrousel: this.props.libros,
    };
  }

  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      className: "slides",
    };

    return (
      <div className="carrusel">
        <Slider {...settings}>
          {this.state.librosCarrousel.map((libro) => (
            <div className="container-VerLibro">
              <div className="box">
                <Link className="imgBx" to={"/suscriptor/libros/" + libro._id}>
                  <img src={portada + libro.portada} />
                </Link>
                <span className="content">
                  <span>
                    <br></br>
                    <h2 className="titulo"> {libro.titulo} </h2>
                  </span>
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default HistorialCapitulos;

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
