import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import logger from 'redux-logger';



const ProtectedRoute = ({loggedIn:loggedIn, component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        if(loggedIn){
            return <Component {...props} />
        }
        else
        {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
    }} />
)

export default ProtectedRoute;

/*
        props.isLoggedin
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
 */

/*
function ProtectedRoute({ component: Component, ...rest }){
    return <Route
        {...rest}
        render={
            (props) =>{
                if(props.isLoggedIn){
                    return <Component/>
                }
                else{
                    return(
                        <Redirect to= "/menu"/>
                    );
                }
            }
        } 
    />;
}
*/
//<Redirect to= {{pathname:"/",state:{from: props.location}}}/>