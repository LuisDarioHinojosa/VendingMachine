import React,{Component} from 'react';
import HeaderComponent from './HeaderComponent';
import EmpLogin from './EmpLogin';
import Menu from './Menu';
import {Switch, Route, Redirect , withRouter} from 'react-router-dom';
import HandleLogin from './HandleLogin';
import {connect} from 'react-redux';
//import PRODUCTOS from '../DB/Products';
import {fetchProducts,fetchEmployees} from '../redux/ActionCreators';



const mapStateToProps = state =>{
    return{
        empleados: state.empleados,
        productos: state.productos,
        compras: state.compras
    }
}
const mapDispatchToProps = dispatch =>({
    fetchProducts: ()=>{dispatch(fetchProducts())},
    fetchEmployees: () =>{dispatch(fetchEmployees())}
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
                        <EmpLogin empleados = {this.props.empleados.employees}
                        />}/>

                    <Route exact path ="/menu" component={() =>
                        <Menu 
                        productos = {this.props.productos}/>}/>
                    <Redirect to="/login"/>
                </Switch>
            </div>
            );
    }

}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));