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
      lanzamiento: "", // new Date()
      expiracion: "",
      FechaAntigua: null,
    };

    this.onChangeVencimiento = this.onChangeVencimiento.bind(this);
  }

  setLibro = async (libro) => {
    var exp = libro.expiracion;
    if (exp != null) {
      exp = new Date(libro.expiracion);
      console.log("exp", exp);
    } else {
      exp = "";
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
      expiracion: exp,

      FechaAntigua: libro.lanzamiento,
    });
  };

  async componentDidMount() {
    await axios
      .post(
        me,
        { id: this.state.id },
        { headers: { xaccess: this.state.token } }
      )
      .then((res) => {
        this.setLibro(res.data);
      });
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangePublicacion = (lanzamiento) => {
    this.setState({ lanzamiento });
  };

  onChangeVencimiento = (expiracion) => {
    this.setState({ expiracion });
  };

  validacion = () => {
    if (this.state.FechaAntigua != null) {
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
        new Date(this.state.lanzamiento).getTime() !=
        new Date(this.state.FechaAntigua).getTime()
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

    if (this.state.expiracion == "") {
    } else {
      if (
        new Date(this.state.expiracion).getTime() <
        new Date(this.state.lanzamiento.getTime())
      ) {
        alert("La fecha de expiracion no debe ser menor a la de publicacion");
        return false;
      }
    }
    return true;
  };

  onSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.expiracion);
    if (this.validacion()) {
      axios
        .post(
          modificar,
          {
            id: this.state.id,
            lanzamiento: this.state.lanzamiento,
            vencimiento: this.state.expiracion,
          },
          {
            headers: { xaccess: this.state.token },
          }
        )
        .then((res) => {
          console.log(res.data);
          alert(JSON.stringify(res.data.msg));
          return <Redirect to="http://localhost:3000/libros" />;
        })
        .catch((err) => {
          alert(JSON.stringify(err.data.msg));
        });
    }
  };

  render() {
    const id = this.state.id;

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
                  onChange={this.onChangeVencimiento}
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
