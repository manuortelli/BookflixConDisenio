import React, { Component } from 'react';

import axios from 'axios';
import ItemNovedad from './ItemNovedad';
import ItemListNovedad from './ItemListNovedad';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const novedades= 'http://localhost:4000/api/novedades/';
export default class ListarNovedades extends Component {
    constructor(){
        super();
        this.state={
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            novedades:[],
            NovedadesCarrusel:[],
          
        }

    }
    setNovedades(res){
        
       
        var num =2;
        var aux=[]; 
        var aux2=[];

        res.map(no=>{
            if(aux.length< num){
                aux.push(no);
            }else{
                aux.push(no);
                aux2.push(aux);
                aux=[] 
            };
        })
        if(aux!=[]){
            aux2.push(aux);
        }

        this.setState({
            novedades:res,
            NovedadesCarrusel:aux2
        });



    }

    getData = async () =>{
        const {user} = this.state.user;
        
      
        await axios.get(novedades,{
            user: user,
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            this.setNovedades(res.data)
        })
        .catch(err =>{
            alert(JSON.stringify(err.response))});

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
        
                            {this.state.NovedadesCarrusel.map(novedad => 
                            <div>
                               {novedad.map( nove=>
                                <div>
                                    <ItemListNovedad novedad={nove}></ItemListNovedad>      
                                </div>  
                                )}
                            </div>
                            )}                          
                        </Slider>
                        </div>
                </div>
            )           




    };

    
    



}
