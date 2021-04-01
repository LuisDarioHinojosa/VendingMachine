import React, {Component} from 'react';
import { ReactReduxContext } from 'react-redux';
import {
    Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody,Row,Col,Badge,Media
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
        <React.Fragment>
            <Media>
                <Media body>
                    <Media heading>
                        Welcome {this.props.user.name}
                    </Media>
                    <Media>
                        A continuacion se muestran los productos disponibles en el artefacto. Selecciona tu favorito.
                    </Media>
                </Media>
            </Media>
            <CardGroup>
            {
                this.props.productos.map((producto) =>{
                    return(
                        <Card className="text-center">
                            <CardImg top width="100%" src={producto.image} alt="Card image cap" />
                            <CardBody>
                                <Row>
                                    <Col>
                                        <CardTitle tag="h5">
                                            <h1>
                                                {producto.name} 
                                                <Badge color ="danger">{producto.PRECIO} $</Badge>
                                            </h1>
                                        </CardTitle>
                                    </Col>
                                </Row>
                                <Row className ="rowCol">
                                    <Col>
                                        <h3>
                                            {producto.supply} en existencias
                                        </h3>
                                    </Col>
                                </Row>
                                <Row className ="rowCol">
                                    <Col className="align-self-center">
                                        <Button color="success">Seleccionar</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    );
                })
            }
            </CardGroup>
        </React.Fragment>
        );
    }
    
}

export default Menu;