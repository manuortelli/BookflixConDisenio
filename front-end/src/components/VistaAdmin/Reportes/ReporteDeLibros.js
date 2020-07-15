import React, { Component } from 'react';
import axios from 'axios';




import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


import ItemReporteLibros from './ItemReporteLibros';

const Libro="http://localhost:4000/api/reportes/libros";
class ReporteDeLibros extends Component {

    constructor(props){
        super(props);
        this.state={
            libros:[],
            token: sessionStorage.getItem("token"),
            hayReportes:true,
            reporteCarrousel:[]
        }

    }
    componentDidMount= async ()=>{
            await axios
            .get(Libro,{
                 headers: { xaccess: this.state.token } }
            )
            .then((res) => {
                console.log(res.data)
                this.setState({libros:res.data})
                this.setLibros(res.data);

            });
    };

    setLibros(res){
        var num =2;
        var aux=[]; 
        var aux2=[];

        res.map(re=>{
            if(aux.length< num){
                aux.push(re);
            }else{
                aux.push(re);
                aux2.push(aux);
                aux=[] 
            };
        })
        if(aux!=[]){
            aux2.push(aux);
        }
        this.setState({
            reporteCarrousel:aux2,
        });
    }

    
    render() {
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            className: 'slides',
            
          };

        const show = this.state.hayReportes;
          
        
            return (
                    <div>

                <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                    <div class="card-body">
                        <h5 className="card-title ">Reporte De Libros</h5>                
                    </div>
                </div>

                { show ?
                    <React.Fragment>
                    <div className="carrusel">
                        <Slider {...settings} >

                             {this.state.reporteCarrousel.map(repo=> 
                            <div>
                               {repo.map(lib=>
                                <div>
                                    <ItemReporteLibros reporte={lib}></ItemReporteLibros>    
                                </div>  
                                )}
                            </div>
                            )} 

                               
                         
                        </Slider>
                    </div>
                    </React.Fragment>

                    : 
                    <React.Fragment>
                    <div className="cardErrorTrailer">
                        <h4>POR EL MOMENTO NO HAY TRAILERS</h4>

                    </div>
                    </React.Fragment>
                }
                
                </div>
            )
        
        
    }
}
export default ReporteDeLibros; 
