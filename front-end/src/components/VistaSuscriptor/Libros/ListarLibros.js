import React, { Component } from 'react';
import ItemListLibro from './ItemListLibro'
import axios from 'axios';
import LeerLibro from './LeerLibro'
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const libros= 'http://localhost:4000/api/libros/';
export default class ListarLibros extends Component {
    constructor(){
        super();
        this.state={
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            libros:[],
            LibrosCarrousel:[],
            
        }

    }
    setLibros(res){
        var num =2;
        var aux=[]; 
        var aux2=[];

        res.map(libro=>{
            if(aux.length< num){
                aux.push(libro);
            }else{
                aux.push(libro);
                aux2.push(aux);
                aux=[] 
            };
        })
        if(aux!=[]){
            aux2.push(aux);
        }
        this.setState({
            libros:res,
            LibrosCarrousel:aux2,
        });
    }

    getData = async () =>{
        const {user} = this.state.user;
        
      
        await axios.get(libros,{
            user: user,
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
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
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            className: 'slides',
            
          };
        
            return (
                    <div>
               
                    <div className="carrusel">
                        <Slider {...settings} >

                             {this.state.LibrosCarrousel.map(lib => 
                            <div>
                               {lib.map( libro=>
                                <div>
                                    <ItemListLibro libro={libro}></ItemListLibro>    
                                </div>  
                                )}
                            </div>
                            )} 

                               
                         
                        </Slider>
                    </div>
                    
                </div>
            )
        
        
    }
}
