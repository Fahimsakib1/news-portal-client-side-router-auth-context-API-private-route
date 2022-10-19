import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';


const Register = () => {
    
    const [error, setError] = useState('');
    const {createUser, updateUserProfile} = useContext(AuthContext);


    const handleRegister  = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const photo = event.target.photoURL.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        if(password.length < 6){
            setError('Password must be more than 6 characters');
            return;
        }
        console.log(name, photo, email, password);
        setError('');

        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            Swal.fire(
                'Great',
                `${name} You are Successfully Registered`,
                'success'
                )
                
                updateUserProfile(name, photo)
                // .then(result => {
                //     const user = result.user;
                //     console.log("Updated User",user)
                // })
                // .catch(error => {
                //     console.error("Update Profile Error: ", error)
                // })
                event.target.reset();
        })


        .catch(error => {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Registration Failed'
            })
        })
    }



    return (
        <Form onSubmit={handleRegister} className='mb-5'>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Enter Name" required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Photo URL</Form.Label>
            <Form.Control name="photoURL" type="text" placeholder="Photo URL" required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter Email" required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Enter Password" required/>
        </Form.Group>
        <Button variant="primary" type="submit">
            Register
        </Button>
        <div className='text-danger'>
            {error}
        </div>
    </Form>
    );
};

export default Register;