import React,{Component} from 'react';
import { Container, Row, Col, Jumbotron} from 'reactstrap';


function HeaderComponent(){
    return(
        <Jumbotron className = "title" style ={{backgroundColor:"#33658A"}}>
            <Row>
                <Col md = "3" className ="text-center">
                    <img src = "images/Intel.png" width="150" alt ="Intel"/>

                </Col>
                
                <Col>
                    <h1 className ="d-flex align-items-center text-center">University Innovation Division</h1>
                </Col>
            </Row>

        </Jumbotron>
    );
}

export default HeaderComponent;