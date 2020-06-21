import React, { Component } from "../../../../node_modules/react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "../../../../node_modules/react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import axios from "../../../../node_modules/axios";
import { Redirect } from "react-router-dom";

const me = "http://localhost:4000/api/libros/me";

const modificar = "http://localhost:4000/api/libros/modificarFechasLibro";

class ModificarFechas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,

      token: sessionStorage.getItem("token"),
      titulo: "",
      fechaDeExpiracion: '',
      fechaDePublicacion: new Date(),
      FechaAntigua:null,
    };

    this.onChangeExpiracion = this.onChangeExpiracion.bind(this);
   
  }

  setLibro = async (libro) => {
    var ven = libro.expiracion;
    if (ven != null) {
      ven = new Date(libro.expiracion);
    } else {
      ven = "";
    }
    var lan = libro.lanzamiento;
    if (lan != null) {
      lan = new Date(libro.lanzamiento);
    } else {
      lan = "";
    }

    this.setState({
      id: libro._id,
      titulo: libro.titulo,
      lanzamiento: lan,
      expiracion: ven,
    
      FechaAntigua: libro.lanzamiento
    });
  };

  getData = async () => {
    await axios
      .post(
        me,
        { id: this.state.id },
        { headers: { xaccess: this.state.token } }
      )
      .then((res) => {
        console.log(res.data);
        this.setLibro(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async componentDidMount() {
    this.getData();
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangePublicacion = (lanzamiento) => {
    this.setState({ lanzamiento });
  };

  onChangeExpiracion = (expiracion) => {
    this.setState({ expiracion });
  };
  validacion=()=>{
    console.log(this.state.FechaAntigua );
    if(this.state.FechaAntigua != null){
      if(new Date(this.state.fechaDePublicacion).getTime() != new Date( this.state.FechaAntigua).getTime()){

        if(new Date(this.state.fechaDePublicacion).getTime() >= new Date().getTime()){
          alert('la fecha de publicacion debe ser mayor a la de hoyy  ');
          return false;
        }
      }
    }
    else{
        if(new Date().getTime() > new Date(this.state.fechaDePublicacion).getTime()){
          alert('la fecha de publicacion debe ser mayor a la de hoy  ');
          return false;
        }

      
    }
       
    if(this.state.fechaDeExpiracion == ''){
     
    } else{
      if(new Date(this.state.fechaDeExpiracion).getTime() < new Date(this.state.fechaDePublicacion.getTime())){
        alert('la fecha de expiracion no debe ser menor a la de publicacion');
        return false;
      }
    }
    alert('estas en validacion exitosa')
    return true;

  }
     
  onSubmit = async (e) => {

   if(this.validacion()){
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", this.state.id);
    formData.append("lanzamiento", this.state.fechaDePublicacion);
    formData.append("expiracion", this.state.fechaDeExpiracion);
    axios
      .post(modificar, formData, {
        headers: { xaccess: this.state.token },
      })
      .then((res) => {
        alert(JSON.stringify(res.response.data.msg));
        return <Redirect to="http://localhost:3000/libros" />;
      })

      .catch((err) => {
        alert(JSON.stringify(err.response.data.msg));
      });
  
  };
   }
    

  render() {
    const id = this.state.id;
    console.log("modificar libro");
    console.log(id);

    return (
      <div className="">
        <div className="col-md-6 offset-md-3">
          <div className="card card-body text-light bg-dark">
            <form onSubmit={this.onSubmit} autoComplete="off">
              <h2 className="card-header">Modificar fechas del Libro</h2>

              <h2>{this.state.titulo}</h2>
              <br></br>

              <div className="form-group">
                <h5>Fecha de publicación</h5>
                <DatePicker
                  className="form-control"
                  selected={this.state.lanzamiento}
                  name="lanzamiento"
                  onChange={this.onChangePublicacion}
                  required
                />
              </div>
              <div className="form-group">
                <h5>Fecha de expiracion</h5>
                <DatePicker
                  className="form-control"
                  selected={this.state.expiracion}
                  name="expiracion"
                  onChange={this.onChangeExpiracion}
                  required
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-success float-right">
                  {" "}
                  Modificar{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ModificarFechas;
