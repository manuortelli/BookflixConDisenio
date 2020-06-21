import React, { Component } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';


const libros= 'http://localhost:4000/api/libros/';
const portada = 'http://localhost:4000/uploads/';

export default class Carrousel extends Component {
    constructor(){
        super();
        this.state={
          
            token: sessionStorage.getItem('token'),
            libros:[],
            libross:[]
        }

    }
    

    setLibros(res){
       
        var num =4;
        var aux=[]; 
        var aux2=[];

        res.map(no=>{
            if(aux.length< num){
                aux.push(no);
            }else{
                aux.push(no);
                aux2.unshift(aux);
                aux=[] 
            };
        }).then()
        if(aux!==[] ){
            aux2.unshift(aux);
        }


        this.setState({
            libros:res,
            libross:aux2
        });
    }

    getData = async () =>{
        
        await axios.get(libros,{
           
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            this.setLibross(res.data)
        })
        .catch(err =>{console.log(err.response)});
        

    }
    async componentDidMount(){

        this.getData();
    }





    render() {

        const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
          className: 'slides',
          
        };

        return (
          <div className="carrusel">
            <Slider {...settings} >
           
            {this.state.libros.map(libro => 
                <div>
{
                
                libro.map( lib=>
                    
                    <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                         <div class="card-body">
                         <img alt=''  width="300px" height="auto" src={portada + `${lib.portada}`} />
                        <h5 class="card-title">{lib.titulo}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{lib._id}</h6>
                    </div>
                    </div>
                )
                }
                </div>
            )}    

          
            </Slider>
          </div>
        );
      }
}
