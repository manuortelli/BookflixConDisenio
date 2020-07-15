import React, { Component } from "../../../../node_modules/react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "../../../../node_modules/react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import axios from "../../../../node_modules/axios";
import { Redirect } from "react-router-dom";

const cargar = "http://localhost:4000/api/libros/cargarArchivoCapitulo";
const Libro = "http://localhost:4000/api/libros/me "

class CargarCapitulo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      token: sessionStorage.getItem("token"),
      lanzamiento: "",
      vencimiento: "",
      titulo: "",
      numero: "",
      ultimoCapitulo: false,
      pdf: null,
      libro: [],
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
  ultimoCapitulo = (e) => {
    this.setState({
      ultimoCapitulo: !this.state.ultimoCapitulo,
    });
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
      formData.append("nombre", this.state.titulo);
      formData.append("lanzamiento", this.state.lanzamiento);
      if (this.state.vencimiento != null) {
        formData.append("vencimiento", this.state.vencimiento);
        console.log(this.state.vencimiento);
      }
      formData.append("titulo", this.state.titulo);
      formData.append("n", this.state.numero);
      if (this.state.ultimoCapitulo) {
        formData.append("ultimo", this.state.ultimoCapitulo);
      }
      formData.append("portadaImg", this.state.pdf);
      console.log("envio esto");
      console.log(formData);
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
          window.location.reload(true);
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
            <h3 className="card-header">Cargar Archivo de capitulo para el libro: {this.state.libro.titulo}</h3>

            <form onSubmit={this.onSubmit} autoComplete="off">
              <div className="form-group">
                <label className="text-light">Título</label>
                <input
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="titulo"
                  onChange={this.onInputChange}
                  value={this.state.titulo}
                  placeholder="Título"
                  required
                ></input>
              </div>
              <div className="form-group">
                <label className="text-light">Numero de capitulo</label>
                <input
                  className="form-control"
                  type="number"
                  id="exampleFormControlInput1"
                  name="numero"
                  onChange={this.onInputChange}
                  value={this.state.numero}
                  placeholder="Numero de capitulo"
                  required
                ></input>
              </div>

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
                  name="vencimiento"
                  onChange={this.onChangeFechaDeVencimiento}
                />
              </div>
              <div className="">
                <label>Es el ultimo capitulo?</label>
                <br></br>
                <input
                  type="checkbox"
                  id="cbox2"
                  name="checkbox"
                  onChange={this.ultimoCapitulo}
                ></input>{" "}
                <label for="cbox2">SI</label>
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

export default CargarCapitulo;
