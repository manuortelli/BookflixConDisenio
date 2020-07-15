import React, { Component } from "react";
import { Link } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import StarRatings from "react-star-ratings";
import axios from "axios";
import Switch from "react-switch";

const me = "http://localhost:4000/api/libros/me";
const resenas = "http://localhost:4000/api/resenas/modificar";
const rese= 'http://localhost:4000/api/resenas/';
const loginPerfilApi = "http://localhost:4000/api/suscriptores/loginPerfil";

class Reseña extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reseñaId:  this.props.match.params.id,
      reseñas:[],
      idLibro:'',
      token: sessionStorage.getItem("token"),
      calificacion: null,
      titulo: "",
      cuerpo: "",
      ranting: 0,
      libro: [],
      checked: false,
      perfil: JSON.parse(sessionStorage.getItem("perfilUser")),
    };

    this.changeRating = this.changeRating.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  

  getDatos = async () => {
    await axios
      .post(
        me,
        { id: this.state.idLibro },
        { headers: { xaccess: this.state.token } }
      )
      .then((res) => {
        console.log(res);
        this.setState({
          libro: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeRating = (newRating, name) => {
    this.setState({ ranting: newRating });
  };


  actualizarPerfil = async () => {

    await axios
        .post(
            loginPerfilApi,
            { id: this.state.perfil._id },
            {
                headers: { xaccess: sessionStorage.getItem("token") },
            }
        )
        .then((res) => {

            const { user, token } = res.data;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("perfilUser", JSON.stringify(user));
            sessionStorage.setItem("perfil", res.data.user);
            sessionStorage.setItem("perfilID", user._id);
           


        });

}

  componentDidMount = async () => {
    this.getReseña();
    this.getDatos();
  };

  getReseña=()=>{
    var re= JSON.parse(sessionStorage.getItem(this.state.reseñaId));
    console.log(re);
    this.setState({
        
        
        cuerpo: re.comentario,
        ranting:re.puntaje,
        idLibro: re.libro,
        checked:re.spoiler,
     
    })

  }

  validacion = () => {
    if (this.state.ranting == 0) {
      alert("la calificacion es obligatoria");
      return false;
    }
    console.log(this.state.perfil._id);
    

   
    const even = (element) => element.autor.id === this.state.perfil._id;

    if(this.state.reseñas.some(even)){
        alert('Ya hiciste una reseña de este libro');
        return false
    }
  


    /*this.state.reseñas.map(reseña=>{
        console.log('reseñannnnn');
        console.log(reseña);
        console.log(this.state.perfil._id);
        if( reseña.autor.id==this.state.perfil._id){
            alert("ya hiciste un reseña de este libro");
            return false;
        }

    })*/


    return true;
  };
  onSubmit = async (e) => {
    e.preventDefault();

    if (this.validacion()) {
       
      console.log(
        "Usted ha enviado la siguiente información: ",
        "ide libro",
        this.state.idLibro,
        "Calificación del libro: ",
        this.state.ranting,
        "Titulo: ",
        this.state.titulo,
        "Comentario: ",
        this.state.cuerpo,
        "spolier: ",
        this.state.checked
      );

      /*
        comentario
        autorId
        autorNombre
        puntaje
        spoiler
        libroId */
      console.log(this.state.idLibro);
      await axios
        .post(
          resenas,
          {
            id:this.state.reseñaId,
            libroId: this.state.idLibro,
            comentario: this.state.cuerpo,
            puntaje: this.state.ranting,
            spoiler: this.state.checked,
            autorId: sessionStorage.getItem("perfilID"),
            autorNombre:this.state.perfil.nombre
            
          },
          { headers: { xaccess: this.state.token } }
        )
        .then((res) => {
          alert(JSON.stringify(res.data.msg));
          this.actualizarPerfil();
        })
        .catch((err) => {alert(JSON.stringify(err.response.data.msg))
            this.actualizarPerfil();
        });
    }
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChange = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    console.log(this.state.checked);
    return (
      <div className="container-reseña">
        <div className="cardReseña col-md-6 offset-md-3 text-light bg-dark ">
          <h4 className="card-header">
            
          </h4>

          <span>
            <h5 className="card-header">Calificación </h5>
          </span>

          <StarRatings
            rating={this.state.ranting}
            starRatedColor={"yellow"}
            changeRating={this.changeRating}
            numberOfStars={5}
            name="rating"
            starDimension="30px"
            starSpacing="15px"
            starHoverColor="yellow"
            starSelectingHoverColor="yellow"
            isSelectable={true}
            isAggregateRating={true}
          />

          <br></br>
          <br></br>

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <textarea
                className="form-control"
                id="cuerpo"
                rows="3"
                name="cuerpo"
                onChange={this.onInputChange}
                value={this.state.cuerpo}
                placeholder="Comentario (Opcional)"
              ></textarea>
            </div>

            <span>¿Considera esto un spoiler?</span>

            <div className="switch-container">
              <label>
                <input
                  ref="switch"
                  checked={this.state.checked}
                  onChange={this.handleChange}
                  className="switch"
                  type="checkbox"
                />
                <div>
                  <div></div>
                </div>
              </label>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn  btn-outline-danger itemBoton float-right"
              >
                Modificar reseña
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Reseña;
