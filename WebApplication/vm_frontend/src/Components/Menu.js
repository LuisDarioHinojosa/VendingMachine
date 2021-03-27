import React, {Component} from 'react';
import {
    Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody,Row,Col,Badge
} from 'reactstrap';

/*
    Dependiendo del id del producto seleccionar el que se ponga bien
*/

class Menu extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
        <CardGroup>
        {
            this.props.productos.map((producto) =>{
                return(
                    <Card className="text-center">
                        <CardImg top width="100%" src={producto.imagen} alt="Card image cap" />
                        <CardBody>
                            <Row>
                                <Col>
                                    <CardTitle tag="h5">
                                        <h1>
                                            {producto.NOMBRE} 
                                            <Badge color ="danger">{producto.PRECIO} $</Badge>
                                        </h1>
                                    </CardTitle>
                                </Col>
                            </Row>
                            <Row className ="rowCol">
                                <Col>
                                    <h3>
                                        {producto.EXISTENCIAS} en existencias
                                    </h3>
                                </Col>
                            </Row>
                            <Row className ="rowCol">
                                <Col className="align-self-center">
                                    <Button color="success" className>Seleccionar</Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                );
            })
        }
        </CardGroup>
        );
    }
    
}

export default Menu;