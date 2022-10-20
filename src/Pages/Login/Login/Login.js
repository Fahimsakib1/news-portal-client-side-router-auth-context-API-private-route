import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';



const Login = () => {
    
    const {userLogin, setLoading} = useContext(AuthContext);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin  = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        
        userLogin(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            Swal.fire(
                'Great',
                "Logged in successfully",
                'success',
                )
            event.target.reset();
            setSuccess(true);
            setError('')
            
            if(user.emailVerified === true){
                navigate(from, {replace: true})
            }
            else{
                toast.error("Email is not verified yet. Please Verify. ")
            }
        })

        .catch(error => {
            console.error(error);
            setError(error.message)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Login Failed'
            })
            setSuccess(false);
        })

        .finally( () => setLoading(false))
    }

    return (
        <Form onSubmit={handleLogin} className='mb-3'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter Email" required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Enter Password" required/>
            </Form.Group>

            {
                error ? <p className='text-danger'>{error}</p> : <></>
            }

            {
                success ?  <p className='text-success'>Login Successful</p> : <></>
            }

            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
};

export default Login;