import React,{Component} from 'react';
import HeaderComponent from './HeaderComponent';
import EmpLogin from './EmpLogin';
import Menu from './Menu';
import PRODUCTOS from './Products';

class Main extends Component{

    constructor(props){
        super(props);
    }


    render(){
        return(
            <div>
                <HeaderComponent></HeaderComponent>
                <Menu productos = {PRODUCTOS}></Menu>
            </div>
            );
    }

}

export default Main;