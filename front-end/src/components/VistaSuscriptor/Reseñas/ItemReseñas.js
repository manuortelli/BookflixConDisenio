import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../../node_modules/axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import StarRatings from 'react-star-ratings';

const eliminar= 'http://localhost:4000/api/resenas/eliminar';
class ItemReseñas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: sessionStorage.getItem('token'),
            reseña:props.reseña,
            ranting:props.reseña.puntaje,
            checked:props.reseña.spoiler,
            mostrarReseña:this.props.reseña.spoiler,
            esMiReseña:false,
            perfil: JSON.parse(sessionStorage.getItem("perfilUser")),
           
        }
      

    }

   
    
    async componentDidMount(){
        if(this.state.perfil._id== this.props.reseña.autor.id){
            this.setState({
                esMiReseña:true,
            })           

        }
       
    }

    eliminarReseña= async()=>{
        console.log(this.state.reseña);
        await axios
        .post(
            eliminar,
            { id: this.state.reseña._id ,
              autorId: this.state.reseña.autor.id,
              libroId: this.props.libroId,

            },
            { headers: { xaccess: this.state.token } }
        )
        .then((res) => {
            console.log(res.data);
            alert(JSON.stringify(res.data.msg));
         
        })
        .catch((err) => {
            console.log(err.data);
          
        });

    }

    marcarComoSpoiler=()=>{

    }
    handleChange = () => {
        this.setState({ checked: !this.state.checked })
    }
    mostrarReseña=()=>{
        this.setState({
            mostrarReseña:false
        })
    }
    
    modificarMiReseña=()=>{
        sessionStorage.setItem(this.state.reseña._id,JSON.stringify(this.state.reseña));

    }

    mostrarFecha = (f) => {
        var fecha = new Date(f);
        var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
        return (fecha.getDate() + " de " + meses[fecha.getMonth()] + " de " + fecha.getFullYear()+ " a las " +fecha.getHours()+":" +fecha.getMinutes()+ " hs " );
        //return fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear();
      }
    render() {
      
        const esMiReseña= this.state.esMiReseña;
        const show =this.state.mostrarReseña;    
        return (
            <div className='form-novedad'>
                
                <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                    <div class="card-body">

                    <h5 class="card-title ">{this.props.reseña.autor.nombre}</h5>
                        <StarRatings
                        rating={this.state.ranting}
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
                     { show?(<div> 
                         
                     <button className=' btn btn-outline-danger itemBoton'onClick={this.mostrarReseña} >Mostrar Spoiler</button>
                     </div>
                     ):
                       
                       (<div>
                           <h5 class="card-title "> {this.props.reseña.comentario}</h5>
                        </div>)
                       
                    } 
                    {esMiReseña ?<div>
                        <button
              className="btn btn-outline-danger itemBoton"
              onClick={() =>
                confirmAlert({
                  customUI: ({ onClose }) => {
                    return (
                      <div className="custom-ui">
                        <h1>¿Está seguro?</h1>{" "}
                        <button onClick={onClose}>No</button>{" "}
                        <button
                          onClick={() => {
                            this.eliminarReseña();
                            onClose();
                          }}
                        >
                          Si, deseo eliminar
                        </button>
                      </div>
                    );
                  },
                })
              }
            >
              Eliminar
            </button>{" "}
                    <Link to={'/suscriptor/reseñas/mofificar/'+this.props.reseña._id} className=' btn btn-outline-danger itemBoton'onClick={this.modificarMiReseña} >Modificar</Link>
                    </div>
                    :<div></div>

                    }
                    <h6>{''}</h6>
              <h6 class="card-subtitle mb-2 text-light">Publicada el {this.mostrarFecha(this.props.reseña.publicacion)}</h6>
                    

                 
                  <br></br>
                  
               
                        
                        
                      
                       
                        
                       </div>
                    </div>
                </div>
           
        )
    }
}

export default ItemReseñas;