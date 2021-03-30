import React,{Component} from 'react';
import HeaderComponent from './HeaderComponent';
import EmpLogin from './EmpLogin';
import Menu from './Menu';
import {Switch, Route, Redirect , withRouter} from 'react-router-dom';
import HandleLogin from './HandleLogin';
import {connect} from 'react-redux';
//import PRODUCTOS from '../DB/Products';
import {fetchProducts} from '../redux/ActionCreators';



const mapStateToProps = state =>{
    return{
        empleados: state.empleados,
        productos: state.productos,
        compras: state.compras
    }
}
const mapDispatchToProps = dispatch =>({
    fetchProducts: ()=>{dispatch(fetchProducts())}
});





class Main extends Component{

    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.fetchProducts();
    }

//                 <Menu productos = {this.props.productos}></Menu>

    render(){
        return(
            <div>
                <HeaderComponent/>
                <Switch>
                    <Route exact path ="/login" component={() =><EmpLogin empleados = {this.props.empleados}/>}/>
                    <Route exact path ="/menu" component={() =><Menu productsLoading = {this.props.productsLoading} errMessage = {this.props.errMessage}  empleado = {HandleLogin.user} productos = {this.props.productos}/>}/>
                    <Redirect to="/login"/>
                </Switch>
            </div>
            );
    }

}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));