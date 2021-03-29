import React,{Component} from 'react';
import HeaderComponent from './HeaderComponent';
import EmpLogin from './EmpLogin';
import Menu from './Menu';
import {Switch, Route, Redirect , withRouter} from 'react-router-dom';
import HandleLogin from './HandleLogin';
import {connect} from 'react-redux';
//import PRODUCTOS from '../DB/Products';


const mapStateToProps = state =>{
    return{
        empleados: state.empleados,
        productos: state.productos,
        compras: state.compras
    }
}

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
                    <Route exact path ="/menu" component={() =><Menu empleado = {HandleLogin.user} productos = {this.props.productos}/>}/>
                </Switch>
            </div>
            );
    }

}

export default withRouter(connect(mapStateToProps)(Main));