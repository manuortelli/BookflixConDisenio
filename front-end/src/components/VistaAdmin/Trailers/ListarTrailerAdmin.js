import React, { Component } from 'react';

import axios from 'axios';

import ListarTrailersAdmin from './ItemListTrailerAdmin';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ItemListTrailerAdmin from './ItemListTrailerAdmin';


const trailersApi= 'http://localhost:4000/api/trailers/';

export default class ListarTrailerAdmin extends Component {
    constructor(){
        super();
        this.state={
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            trailers:[],
            trailersCarrousel:[],
            hayTrailers:true,
            
        }

    }
    setLibros(res){
        var num =2;
        var aux=[]; 
        var aux2=[];

        res.map(trailer=>{
            if(aux.length< num){
                aux.push(trailer);
            }else{
                aux.push(trailer);
                aux2.push(aux);
                aux=[] 
            };
        })
        if(aux!=[]){
            aux2.push(aux);
        }
        this.setState({
            trailers:res,
            trailersCarrousel:aux2,
        });
    }

    getData = async () =>{
        const {user} = this.state.user;
        
      
        await axios.get(trailersApi,{
            user: user,
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            if (res.data.length == 0) {
                this.setState({ hayTrailers: false })
                }
                else {
                    this.setState({ hayTrailers: true })
                }
            this.setLibros(res.data)
        })
        .catch();



    }
    async componentDidMount(){

        this.getData();
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

        const show = this.state.hayTrailers;

        
            return (
                    <div>

               
                    <div >
                        <Link to='/trailers/nuevo' className='btn btn-danger col-md-6 offset-md-3'>Cargar Trailer</Link>
                    </div>


                { show ?
                    <React.Fragment>
                    <div className="carrusel">
                        <Slider {...settings} >

                             {this.state.trailersCarrousel.map(trai=> 
                            <div>
                               {trai.map(trailer=>
                                <div>
                                    <ItemListTrailerAdmin trailer={trailer}></ItemListTrailerAdmin>    
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