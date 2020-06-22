import React, { Component } from 'react';
import axios from 'axios';
import { Container, Col, Row, Card } from 'react-bootstrap'

//PARA EL CARROUSEL
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, Redirect } from 'react-router-dom';


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

    filtrarFechas=(libros)=>{
        var hoy =new Date();
        console.log('hoy es:'+ hoy );
        var res=[];
        libros.map( lib =>{
            if(lib.lanzamiento != null ){
                var lan= new Date(lib.lanzamiento);
                if(lan< hoy){
                    if(lib.expiracion != null){
                        var ven= new Date(lib.expiracion);
                        if(ven > hoy){
                          res.push(lib);
                        }
                    }else{
                        res.push(lib);
                    }
                 }
            }
           
           

        });
        return res;


    }
    
    setLibros(res) {

      
        var re =this.filtrarFechas(res);
        this.setState({
            libros: res,
            librosCarrousel: re

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
    verDetalle=(id)=>{
      return <Redirect to={'/suscriptor/libros/leer/' + id}> </Redirect>
    };
  
    render() {

        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            className: 'slides'

        };

        return (
            <div className="carrusel">
                <Slider {...settings}>
                {this.state.librosCarrousel.map(libro => 
                           <div className="container-VerLibro">
                               
                               
                                    <div className="box" >
                                        <Link className="imgBx"   to={'/suscriptor/libros/' +libro._id} >
                                            <img src={portada + libro.portada} />
                                        </Link>
                                        <span className="content">
                                            <span >
                                                <br></br>
                                                <h2 className="titulo"> {libro.titulo} </h2>
                                               
                                                
                                            </span>
                                        </span>
                                
                                    </div>
                                    

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