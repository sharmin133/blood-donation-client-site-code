import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthContext';



const PrivateRoute = ({children}) => {
    const{user,loading}=use(AuthContext);
    const location=useLocation();


 if(loading){
    return <span className="loading loading-bars loading-md"></span>
 }
    if(!user){

        if (location.pathname === '/fund') {
      return <Navigate to="/login" state={{ from: location }} replace />;
    } else{
        return <Navigate state={location?.pathname} to='/'></Navigate>
    }
    }


    return children;
};

export default PrivateRoute;


