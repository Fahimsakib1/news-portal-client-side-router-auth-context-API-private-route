import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import Spinner from 'react-bootstrap/Spinner';

const PrivateRoute = ({children}) => {
    
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <div className='text-center'>
            <Spinner animation="border" />
        </div>;
    }

    if(!user){
        return <Navigate to='/login' state={{from: location}} replace></Navigate>
    }
    else{
        return children;
    }
};

export default PrivateRoute;