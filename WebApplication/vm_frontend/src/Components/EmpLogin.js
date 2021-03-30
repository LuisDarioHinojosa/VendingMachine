import React,{Component} from 'react';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay, Button, Container,Row,Col
,Modal,ModalBody,ModalFooter,ModalHeader, timeoutsShape,Label} 
from 'reactstrap';
import {Control,LocalForm,Errors} from 'react-redux-form';


import { faList, faUserCircle,faUnlockAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';
import HandleLogin from './HandleLogin'; // protected route class


// form validation functions
// for username
const usernameFormat = (username) => {
    let regEx = new RegExp('^A[0-9]{8}');
    return regEx.test(username);
};


// both
const required = (value) => value && value.length;


class EmpLogin extends Component{

    constructor(props){
        super(props);
        this.state = {
            modalOpen: false
        }
        this.toogleModal = this.toogleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }

    toogleModal(){
        this.setState({modalOpen:!this.state.modalOpen});
    }   

    // this currently recognices if the form´s input matches with any input of the database
    handleLogin(values){
        let utilisitaeur = values["username"];
        let motdupas = values["password"];
        let user = this.props.empleados.filter((person) => (person.emp_id == utilisitaeur && person.password == motdupas))[0];
        alert(JSON.stringify(user));
    }

    render(){
        return(
            <React.Fragment>
            <div>
            <Card inverse>
                <CardImg width="20%" src="/images/intelG.jpg" alt="Card image cap" />
                <CardImgOverlay>
                    <Container>
                        <Row>
                            <Col md = "4" className ="rowCol" >
                                <CardTitle className="text-center" tag="h5">Bouffet IOT</CardTitle>
                            </Col>
                            <Col>
                                <CardText>Desde este espacio puedes seleccionar el refrigerio de tu preferencia. Registrate con tu cuenta de empleado para acceder al Menu.</CardText>
                            </Col>
                        </Row>

                        <Row className ="rowCol">
                            <Col sm ={{size:3,offset:4}} className="text-center">
                                <Button color="danger"   onClick ={this.toogleModal}> <h4> <FontAwesomeIcon icon = {faList}/> Menu</h4> </Button>
                            </Col>
                        </Row>



                    </Container>
                </CardImgOverlay>

            </Card>
            </div>

            <Modal className="formFont"  isOpen={this.state.modalOpen} toggle={this.toogleModal}>
                <ModalHeader contentclassname="loginHeader" toggle={this.toogleModal}>Iniciar Sesion</ModalHeader>
                <ModalBody className="loginBody">

                    <LocalForm onSubmit={(values) => this.handleLogin(values)}>
                        <Row>
                            <Col sm = {{size:4, offset:1}}>
                                <Label for ="username"><h4><FontAwesomeIcon icon ={faUserCircle}/> Usuario</h4></Label>
                            </Col>
                            <Col >
                                <Control.text model = ".username" id="username" validators = 
                                {{
                                    required,
                                    usernameFormat
                                }}/>
                                <Errors
                                    className="text-danger"
                                    model = ".username"
                                    show = "touched"
                                    messages = {{
                                        required:"Este campo es requerido\n",
                                        usernameLenght:"El tamaño de las claves de usario siempte es de 9 dijitos\n",
                                        usernameFormat:"El formato debe de ser: A+dddddddd\n"
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm = {{size:4, offset:1}}>
                                <Label for ="password"><h5><FontAwesomeIcon icon ={faUnlockAlt}/> Contraseña</h5></Label>
                            </Col>
                            <Col>
                                <Control.text type="password" model = ".password" id = "password" validators = {{required}}/>
                                <Errors
                                    className="text-danger"
                                    model = ".password"
                                    show = "touched"
                                    messages = {{
                                        required:"Este campo es requerido\n"
                                    }}
                                />
                            </Col>
                        </Row>
                        <ModalFooter className="loginFooter">
                            <Button color ="info" type="submit" id ="logButton" size="lg" block>Entrar</Button>
                        </ModalFooter>
                    </LocalForm>

                </ModalBody>
            </Modal>
            </React.Fragment>
            );
    }

}



export default EmpLogin;