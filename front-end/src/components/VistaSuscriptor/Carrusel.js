import React, { Component } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
//import ListarNovedades from './ListarNovedades';
import axios from 'axios';


const novedades= 'http://localhost:4000/api/novedades/';


export default class Carrusel extends Component {
    constructor(){
        super();
        this.state={
            
            token: sessionStorage.getItem('token'),
            novedades:[],
            novedadess:[]
        }

    }
    

    setNovedades(res){
       
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
        })
        if(aux!=[] ){
            aux2.unshift(aux);
        }

        console.log("aux2");
        console.log(aux2);
        console.log(res);

        this.setState({
            novedades:res,
            novedadess:aux2
        });
    }

    getData = async () =>{
        
        const con = await axios.get(novedades,{
           
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
            this.setNovedades(res.data)
        })
        .catch(err =>{console.log(err.response)});
        console.log(con);

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
          <div className="carrusel">
            <h2> Single Item</h2>
            <Slider {...settings}>
           
            {this.state.novedadess.map(nove => 
                <div>
{
                
                nove.map( no=>
                    <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                         <div class="card-body">
                        <h5 class="card-title">{no.titulo}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{no._id}</h6>
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
