import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';


import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ItemReseñaAdmin from './ItemReseñaAdmin';

const libro="http://localhost:4000/api/libros/me"
const reseñas= 'http://localhost:4000/api/resenas/';
class ReseñasAdmin extends Component {

    constructor(props){
        super(props);
        this.state={
            libroId:  this.props.match.params.id,
            libro:'',
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            reseñas:[],
            reseñasCarrousel:[],
            re:[],
            promedio:0,
         
            
        }

    }
    setReseñas=()=>{

    }
   
    getLibro=async()=>{
        await axios
        .post(
          libro,
          { id: this.state.libroId },
          { headers: { xaccess: this.state.token } }
        )
        .then((res) => {
         this.setState({
            libro: res.data,
          });
         
        })
        .catch((err) => {
          
        });
  
    }

    getData = async () =>{
        const {user} = this.state.user;
        console.log('esta trayendo reseñas');
        await axios
         .post(reseñas,
            { id: this.state.libroId },
            { headers: { xaccess: this.state.token } }
        )
        .then(res =>{
            console.log(res.data);
            this.setState({
                reseñas:res.data,
                re: res.data,
              });
              this.setReseñasCarrusel(res.data);
        })
      
        .catch();



    }
    async componentDidMount(){
        this.getData();
        this.getLibro();
        
       
       
    }
    
    setReseñasCarrusel(res){
        var num =2;
        var aux=[]; 
        var aux2=[];
        var promedio=0;
        var cant=0;

        res.sort(function (a, b) {
            if (a.publicacion < b.publicacion) {
              return 1;
            }
            if (a.publicacion > b.publicacion) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });

        res.map(re=>{
            promedio=promedio+re.puntaje;
            cant= cant+1;
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
        console.log(cant);
        if(cant== 0){
            cant=0;
        }else{
            cant=promedio/cant;
        }
        this.setState({
            promedio:cant,
            reseñasCarrousel:aux2,
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
          
            const show=this.state.reseñas.length;
            return (
                    <div>

               
                   
                    <div className="carrusel">

          
                    <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                    <div class="card-body">
                    <h4 className="card-title ">Reseñas del libro {this.state.libro.titulo} </h4>
                    
                    <StarRatings
                        rating={this.state.promedio}
                        starRatedColor={'yellow'}
                        
                        numberOfStars={5}
                        name='rating'
                        starDimension="30px"
                        starSpacing="15px"
                        starHoverColor="yellow"
                        starSelectingHoverColor="yellow"
                        isSelectable={true}
                        isAggregateRating={true}

                    />
                    <h2 > {this.state.promedio} </h2>
                    
                    </div>
                    </div>
                    {show== 0?
                    (<React.Fragment> 
                         <div className="card col-md-6 offset-md-3 text-light bg-dark">
                        <h4 >POR EL MOMENTO NO HAY RESEÑAS</h4>

                        </div>

                    </React.Fragment>)
                    :
                    (<React.Fragment> 
               
                   <div className='form-novedad'>

                        <Slider {...settings} >

                            {this.state.reseñasCarrousel.map(re => 
                            <div>
                                {re.map( reseña=>
                               
                                    <div>
                                        <ItemReseñaAdmin reseña={reseña} libroId={this.state.libroId}></ItemReseñaAdmin>    
                                    </div> 
                                    
                                
                                )}
                            </div>
                            )} 


                        </Slider>      
                        </div>

                        </React.Fragment>)        

                    
                }
                </div>
                
                </div>
            )
        
        
    }
}
export default ReseñasAdmin;