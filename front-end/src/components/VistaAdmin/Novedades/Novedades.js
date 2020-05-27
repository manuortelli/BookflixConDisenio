import React, { Component } from 'react';
import NavegacionAdmin from '../NavegacionAdmin'

import ListarNovedadesAdmin from './ListarNovedadesAdmin';


export default class Novedades extends Component {
 

render() {
    return (
        <div>
            <NavegacionAdmin/>
            
            <ListarNovedadesAdmin></ListarNovedadesAdmin>

        </div>
    )}
}

