import React, { Component } from 'react'

class Errors extends Component {
    constructor(props){
        super(props);
 
    }
    
//Solo un cambio

    render() {
        return (
            
            this.props.errors.map((er) =>
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>{er}</strong> 
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            
            )
        )
    }
}
export default Errors;