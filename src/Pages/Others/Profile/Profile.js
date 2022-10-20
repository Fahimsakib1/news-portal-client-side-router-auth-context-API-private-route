import React, { useContext, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const Profile = () => {
    
    const {user} = useContext(AuthContext)
    const [name, setName] = useState(user.displayName);
    const photoURLRef = useRef(user.photoURL);
    
    
    const handleSubmit = (event) => {
        event.preventDefault();
        photoURLRef.current.focus();
        console.log(name, photoURLRef.current.value)
    }

    const handleNameChange = (event) => {
        setName(event.target.value)
    }


    return (
        <div>
            <Form className='mb-4' onSubmit={handleSubmit}>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control className='text-muted' readOnly defaultValue={user?.email} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control 
                    onChange={handleNameChange}
                    type="text" 
                    defaultValue={name}
                    placeholder="Enter Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Photo URL</Form.Label>
                    <Form.Control 
                    ref={photoURLRef}
                    defaultValue={user?.photoURL}
                    type="text" 
                    placeholder="Add Photo URL" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        </div>
    );
};

export default Profile;