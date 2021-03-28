import React,{Component} from 'react';
import HeaderComponent from './HeaderComponent';
import EmpLogin from './EmpLogin';
import Menu from './Menu';
import {Switch, Route, Redirect , withRouter} from 'react-router-dom';
import HandleLogin from './HandleLogin';

//import PRODUCTOS from '../DB/Products';

class Main extends Component{

    constructor(props){
        super(props);
    }

//                 <Menu productos = {this.props.productos}></Menu>

    render(){
        return(
            <div>
                <HeaderComponent/>
                <Switch>
                    <Route exact path ="/login" component={() =><EmpLogin empleados = {this.props.empleados}/>}/>
                    <Redirect to = "/login"/>
                    <Route exact path ="/menu" component={() =><Menu empleado = {HandleLogin.user} productos = {this.props.productos}/>}/>
                </Switch>
            </div>
            );
    }

}

export default withRouter(Main);