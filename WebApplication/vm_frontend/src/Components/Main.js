import React,{Component} from 'react';
import HeaderComponent from './HeaderComponent';
import EmpLogin from './EmpLogin';
import Menu from './Menu';
class Main extends Component{

    constructor(props){
        super(props);
    }


    render(){
        return(
            <div>
                <HeaderComponent></HeaderComponent>
                <EmpLogin></EmpLogin>
                <Menu/>
            </div>
            );
    }

}

export default Main;