import React, {Component} from 'react';
import PRODUCTOS from './Products';
import {
    Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';

function Cards(props){
    return (
        <div>
        {
            this.props.productos.map((producto) =>{
                return(
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">{producto.NOMBRE}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{producto.EXISTENCIAS}</CardSubtitle>
                        </CardBody>
                    </Card>
                );
            })
        }
        </div>
    );
}

class Menu extends Component{
    constructor(props){
        super(props);
        this.state = {
            productos : PRODUCTOS
        }
    }

    render(){
        return(
            <div>
            </div>
        );   
    }
}


export default Menu;