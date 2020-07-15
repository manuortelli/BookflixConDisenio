import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import NavegacionSuscriptor from "./NavegacionSuscriptor";

import SlideLibros from "./Libros/VerLibrosNS";
import SlideFavoritos from "./Libros/CarrouselFavoritos";
import SlideHistorial from "./Historial/CarruselHistorial";
import Historial from "./Historial/Historial";
import SliderRecomendados from "./Recomendados/Recomendados";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: JSON.parse(sessionStorage.getItem("user")),
      token: sessionStorage.getItem("token"),
      libros: null,
    };
    this.cerrarSesion = this.cerrarSesion.bind(this);
  }

  cerrarSesion = () => {
    sessionStorage.removeItem("token");
  };
  async componentDidMount() {
    this.getData();
  }

  getData = async () => {
    //const {user} = this.state.user;
    //const token = this.state.token;
  };

  render() {
    return this.state.token !== "" ? (
      <div>
        <NavegacionSuscriptor></NavegacionSuscriptor>

        <div className="d-flex justify-content-center"></div>
        <SliderRecomendados></SliderRecomendados>
        <SlideLibros></SlideLibros>
        <SlideFavoritos></SlideFavoritos>
        <Historial></Historial>
      </div>
    ) : (
      <Redirect to="/login" />
    );
  }
}

//<Buscador></Buscador>
