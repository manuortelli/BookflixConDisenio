import React, { Component } from 'react';
import axios from 'axios';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DatePicker from '../../../../node_modules/react-datepicker';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import ItemListUsuario from './ItemListUsuario';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const getSuscriptores = 'http://localhost:4000/api/suscriptores';

class ReporteDeUsuarios extends Component {
    constructor(props){
        super(props);
        this.state={
            desde:'',
            hasta:'',
            token: sessionStorage.getItem('token'),
            suscriptores: [],
            usuariosCarrusel:[],
            hayUsuarios:true
        }

    }


    
    async componentDidMount(){

        await axios.get(getSuscriptores, {
            headers: { 'xaccess': this.state.token }
        })
        .then(res => {
            this.setState({
                suscriptores: res.data
            });
        })
        .catch(err => {
            console.log(err)
        });

    }

    setUsuariosCarrusel(res){
        
        res.sort(function (a, b) {
            if (a.createdAt < b.createdAt) {
              return 1;
            }
            if (a.createdAt > b.createdAt) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
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
            
            usuariosCarrusel:aux2
        });



    }

    onChangeFecha = desde => {
        this.setState({ desde });
    };
    onChangeFechaHasta = hasta => {
        this.setState({ hasta });
    };

    



    filtrarUsuarios=(usuarios)=>{
      

        var filtrados=[];
        usuarios.map(usu =>{ 
            if(usu.createdAt != null){
                let crea=new Date(usu.createdAt);
                let desde=this.state.desde;
                let hasta= this.state.hasta;

                crea.setHours(0);
                crea.setMinutes(0);
                crea.setSeconds(0);
                crea.setMilliseconds(0);

                desde.setHours(0);
                desde.setMinutes(0);
                desde.setSeconds(0);
                desde.setMilliseconds(0);

                hasta.setHours(0);
                hasta.setMinutes(0);
                hasta.setSeconds(0);
                hasta.setMilliseconds(0);

                console.log(crea);
                console.log(desde);
                console.log(hasta);

                if(crea>= desde && crea <= hasta){
                    filtrados.push(usu);
                }
            }
            
        })
        if(filtrados.length< 1){
            this.setState({
                hayUsuarios:false

            })

        }else{
            this.setState({
                hayUsuarios:true

            })
        }

        return filtrados;

    }

    onSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state.desde);
        console.log(this.state.hasta);
        this.setUsuariosCarrusel(this.filtrarUsuarios(this.state.suscriptores));
    }

    limpiar=(e)=>{
 
        this.setState({
            desde:'',
            hasta:'',
            usuariosCarrusel:[],

        });console.log(this.state.usuariosCarrusel) ;
        this.render();   
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
        const show = this.state.hayUsuarios;
        return (
            
            <div>

                <h1 className="col-md-8 offset-md-4  text-light "> {'Buscar Usuarios' } </h1>
                <br></br>

                <div className="offset-md-3  text-light ">
                <form  onSubmit={this.onSubmit} autoComplete='off'>
                    
                    
         
                 
            <text >{' Desde '}</text>
            <DatePicker className="form-control"
                    selected={this.state.desde}
                    name='desde'
                    onChange={this.onChangeFecha}
                    required
                     
            />
            <text>{' Hasta '}</text>
            <DatePicker className="form-control"
                    selected={this.state.hasta}
                    name='hasta'
                    onChange={this.onChangeFechaHasta}
                    required
                     
            />
          

                    


                    <button type ="submit" className="btn btn-light itemBoton  "> 
                        <svg class="bi bi-search" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                        </svg>
                    </button>    
                     

                </form>

                </div>
              {show ?
              <div className="carrusel">
              <Slider {...settings} >

                  {this.state.usuariosCarrusel.map(usuarios => 
                  <div>
                     {usuarios.map( usuario=>
                      <div>
                          <ItemListUsuario usuario={usuario}></ItemListUsuario>      
                      </div>  
                      )}
                  </div>
                  )}                          
              </Slider>
              </div>:
                <React.Fragment>
                <div className="cardErrorTrailer">
                    <h4>No hay usuarios que coincidan con las fechas ingresadas</h4>

                </div>
                </React.Fragment>
       
              }
                
                
            </div>
        )
    }
}
export default ReporteDeUsuarios;
