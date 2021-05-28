import React,{Component} from 'react';
import HeaderComponent from './HeaderComponent';
import EmpLogin from './EmpLogin';
import ProtectedRoute from './ProtectedRoute';
import Menu from './Menu';
import {Switch, Route, Redirect , withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
//import PRODUCTOS from '../DB/Products';
import {fetchProducts,fetchEmployees,handleUserLogin} from '../redux/ActionCreators';



const mapStateToProps = state =>{
    return{
        empleados: state.empleados,
        productos: state.productos,
        compras: state.compras,
        autenticacion: state.authentication
    }
}
const mapDispatchToProps = dispatch =>({
    fetchProducts: ()=>{dispatch(fetchProducts())},
    fetchEmployees: () =>{dispatch(fetchEmployees())},
    handleUserLogin: (username,password,users) => {dispatch(handleUserLogin(username,password,users))}

});





class Main extends Component{

    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.fetchProducts();
        this.props.fetchEmployees();
    }


    render(){
        return(
            <div>
                <HeaderComponent/>
                <Switch>
                    <Route exact path ="/login" component={() =>
                        <EmpLogin empleados = {this.props.empleados.employees} handleUserLogin = {this.props.handleUserLogin}
                        />}/>
                    <Route exact path ="/menu" component={() =>
                        <Menu 
                        productos = {this.props.productos.products} user = {this.props.autenticacion.user}/>}/>
                    <Redirect to="/login"/>
                </Switch>
            </div>
            );
    }

}
/*
                    <Route exact path ="/menu" component={() =>
                        <Menu 
                        productos = {this.props.productos.products} user = {this.props.autenticacion.user}/>}/>

                    <ProtectedRoute path="/menu" component = {Menu} loggedIn = {this.props.autenticacion.loggedIn}/>


                        */


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));