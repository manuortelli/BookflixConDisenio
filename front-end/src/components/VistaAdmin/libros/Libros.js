import React, { Component } from 'react';

import NavegacionAdmin from '../NavegacionAdmin';

import ListarLibrosAdmin from './ListarLibrosAdmin'


export default class Libros extends Component {


render() {
    return (
        <div>

            <NavegacionAdmin/>
           
            <ListarLibrosAdmin></ListarLibrosAdmin>
           
            
            

        </div>
    )
}
}

