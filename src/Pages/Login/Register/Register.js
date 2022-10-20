import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {


    const { createUser, updateUserProfile, verifyEmail } = useContext(AuthContext);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [accepted, setAccepted] = useState(false);


    const handleRegister = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const photo = event.target.photoURL.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        if (password.length < 6) {
            setError('Password must be more than 6 characters');
            return;
        }
        console.log(name, photo, email, password);


        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setError('');
                setSuccess(true);
                Swal.fire(
                    'Great',
                    `${name} You are Successfully Registered`,
                    'success'
                )

                // updateUserProfile(name, photo);
                handleUpdateUserProfile(name, photo);
                handleEmailVerification();
                toast.success('A verification mail has been sent to your email address. please verify your email.');
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
                setError(error.message);
                setSuccess(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Registration Failed'
                })
            })
    }


    // Nicher 2 ta handleAccepted function e thik vabe kaj kore


    // const handleAccepted = (event) => {
    //     const check = (event.target.checked)
    //     if (check === true) {
    //         setAccepted(true)
    //     }
    //     else {
    //         setAccepted(false)
    //     }

    // }

    const handleAccepted = (event) => {
        setAccepted(event.target.checked)
    }

    const handleUpdateUserProfile = (name, photo) => {
        const profile = {
            displayName: name,
            photoURL: photo
        }
        updateUserProfile(profile)
            .then(() => { })
            .catch(error => console.error(error))
    }

    const handleEmailVerification = () => {
        verifyEmail()
            .then((result) => {
                const user = result.user;
            })
            .catch(error => console.error(error))
    }



    return (
        <Form onSubmit={handleRegister} className='mb-5'>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" type="text" placeholder="Enter Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Photo URL</Form.Label>
                <Form.Control name="photoURL" type="text" placeholder="Photo URL" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter Email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Enter Password" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                    onClick={handleAccepted}
                    type="checkbox"
                    label={<>Accept <Link to='/terms'>Terms & Conditions</Link></>}
                />

            </Form.Group>


            <Button variant="primary" type="submit" disabled={!accepted}>
                Register
            </Button>


            <div className='text-danger'>
                {
                    error ? <p className='text-danger'>{error}</p> : <></>
                }

                {
                    success ? <p className='text-success'>Registration Successful</p> : <></>
                }
            </div>
        </Form>
    );
};

export default Register;