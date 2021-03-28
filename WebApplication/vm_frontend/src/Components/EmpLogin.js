import React,{Component} from 'react';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay, Button, Container,Row,Col
,Modal,ModalBody,ModalFooter,ModalHeader, timeoutsShape,Form,FormGroup,Label,Input} 
from 'reactstrap';

import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';
import HandleLogin from './HandleLogin';


class EmpLogin extends Component{

    constructor(props){
        super(props);
        this.state = {
            modalOpen: false
        }
        this.toogleModal = this.toogleModal.bind(this);
        this.loginPage = this.loginPage.bind(this);

    }

    toogleModal(){
        this.setState({modalOpen:!this.state.modalOpen});
    }   

    loginPage(username,password){
        let user = this.props.empleados.filter((person) => (person.Matricula == username))[0];

        console.log(this.props.empleados);
        console.log(user);
        alert(user);
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
                                <Button color="danger" id ="modalButton"  onClick ={this.toogleModal}> <h4> <FontAwesomeIcon icon = {faList}/> Menu</h4> </Button>
                            </Col>
                        </Row>



                    </Container>
                </CardImgOverlay>

            </Card>
            </div>

            <Modal className="formFont"  isOpen={this.state.modalOpen} toggle={this.toogleModal}>
                <ModalHeader contentClassName="loginHeader" toggle={this.toogleModal}>Iniciar Sesion</ModalHeader>
                <ModalBody className="loginBody">
                    <Form >
                        <FormGroup>
                            <Input type="user" id = "usuario" name="user"  placeholder=" Usuario" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" id = "contraseña" name="password" placeholder=" Contraseña" />
                        </FormGroup>

                        <FormGroup check>
                            <Label check>
                            <Input type="checkbox" />{' '} Mantener Session
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter className="loginFooter">
                    <Button variant ="success" id ="logButton" size="lg" block  onClick = {this.loginPage(document.getElementById("inputUser"),document.getElementById("inputPassword"))}   >Entrar</Button>
                    <a className="forgotLink" href="">Olvidaste tu contraseña?</a>
                </ModalFooter>
            </Modal>


            </React.Fragment>
            );
    }

}
//onClick = {this.loginPage(document.getElementById("inputUser"),document.getElementById("inputPassword"))}

export default EmpLogin;