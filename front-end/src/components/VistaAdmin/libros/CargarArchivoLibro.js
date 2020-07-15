import React, { Component } from "../../../../node_modules/react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "../../../../node_modules/react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import axios from "../../../../node_modules/axios";
import { Redirect } from "react-router-dom";

const cargar = "http://localhost:4000/api/libros/cargarArchivoLibro";
const Libro = "http://localhost:4000/api/libros/me "

class CargarLibro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      token: sessionStorage.getItem("token"),
      lanzamiento: "",
      vencimiento: "",
      pdf: null,
      libro:[]
    };

    this.getPdf = this.getPdf.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onChangeFechaDeVencimiento = this.onChangeFechaDeVencimiento.bind(
      this
    );
    this.onChangeFechaDeLanzamiento = this.onChangeFechaDeLanzamiento.bind(
      this
    );
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getPdf(e) {
    this.setState({
      pdf: e.target.files[0],
    });
  }

  onChangeFechaDeVencimiento = (vencimiento) => {
    this.setState({ vencimiento });
  };

  onChangeFechaDeLanzamiento = (lanzamiento) => {
    this.setState({ lanzamiento });
  };

  miLibro = async () => {
    axios
      .post(Libro, { id: this.state.id }, {
        headers: { xaccess: this.state.token },
      })
      .then((res) => {
        console.log("Mi Libro", res.data)
        this.setState({
          libro: res.data
        })
      })

      .catch((err) => {
        //alert(JSON.stringify(err.response.data.msg));
      });
  }



  validacion = () => {
    if (this.state.lanzamiento != null) {
      const hoy = JSON.stringify(new Date().getDate());
      const inputHoy = JSON.stringify(
        new Date(this.state.lanzamiento).getDate()
      );
      const mes = JSON.stringify(new Date().getMonth() + 1);
      const inputMes = JSON.stringify(
        new Date(this.state.lanzamiento).getMonth() + 1
      );
      const año = JSON.stringify(new Date().getFullYear());
      const inputAño = JSON.stringify(
        new Date(this.state.lanzamiento).getFullYear()
      );
      if ((hoy == inputHoy) & (mes == inputMes) & (año == inputAño)) {
        return true;
      }
      if (
        new Date().getTime() !=
        new Date(this.state.lanzamiento).getTime()
      ) {
        if (new Date(this.state.lanzamiento) < new Date()) {
          alert("La fecha de publicacion debe ser igual o mayor a la de hoy ");
          return false;
        }
      }
    } else {
      const hoy = JSON.stringify(new Date().getDate());
      const inputHoy = JSON.stringify(
        new Date(this.state.lanzamiento).getDate()
      );
      const mes = JSON.stringify(new Date().getMonth() + 1);
      const inputMes = JSON.stringify(
        new Date(this.state.lanzamiento).getMonth() + 1
      );
      const año = JSON.stringify(new Date().getFullYear());
      const inputAño = JSON.stringify(
        new Date(this.state.lanzamiento).getFullYear()
      );
      if ((hoy == inputHoy) & (mes == inputMes) & (año == inputAño)) {
        return true;
      }
      if (new Date() > new Date(this.state.lanzamiento)) {
        alert(
          "La fecha de publicacion debe ser igual o mayor mayor a la de hoy  "
        );
        return false;
      }
    }

    if (new Date(this.state.vencimiento) < new Date(this.state.lanzamiento)) {
      alert("La fecha de expiracion no debe ser menor a la de publicacion");
      return false;
    }

    return true;
  };


  onSubmit = async (e) => {
    e.preventDefault();
    if (this.validacion()) {
    const formData = new FormData();
    formData.append("id", this.state.id);
    formData.append("lanzamiento", this.state.lanzamiento);
      if (this.state.vencimiento != "") {
      formData.append("expiracion", this.state.vencimiento);}
    formData.append("portadaImg", this.state.pdf);

    axios
      .post(cargar, formData, {
        headers: { xaccess: this.state.token },
      })
      .then((res) => {
        alert(JSON.stringify(res.response.data.msg));
        return (window.location = '/libros')
      })

      .catch((err) => {
        alert(JSON.stringify(err.response.data.msg));
        return (window.location = '/libros')
      });
    }
  };

  componentDidMount() {
    this.miLibro();
  }

  render() {
    return (
      <div className="form-novedad">
        <div className="col-md-6 offset-md-3">
          <div className="card card-body text-light bg-dark">
    <h3 className="card-header">Cargar archivo para: {this.state.libro.titulo}</h3>

            <form onSubmit={this.onSubmit}>
              <label className="text-light">Archivo PDF</label>
              <div className="form-group">
                <input
                  type="file"
                  encType="multipart/form-data"
                  name="pdf"
                  onChange={this.getPdf}
                ></input>
              </div>

              <label className="text-light">Fecha De Lanzamiento </label>
              <div className="form-group">
                <DatePicker
                  className="form-control"
                  selected={this.state.lanzamiento}
                  name="lanzamiento"
                  onChange={this.onChangeFechaDeLanzamiento}
                />
              </div>

              <label className="text-light">
                Fecha De Vencimiento (Opcional)
              </label>
              <div className="form-group">
                <DatePicker
                  className="form-control"
                  selected={this.state.vencimiento}
                  name="fechaDePublicacion"
                  onChange={this.onChangeFechaDeVencimiento}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-success float-right">
                  {" "}
                  Agregar{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CargarLibro;
