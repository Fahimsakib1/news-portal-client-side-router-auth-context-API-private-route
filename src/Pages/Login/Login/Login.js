import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';



const Login = () => {
    
    const {userLogin} = useContext(AuthContext);
    const navigate = useNavigate();

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
            navigate('/')

        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Login Failed'
            })
        })
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
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
};

export default Login;