import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaGoogle, FaGithub, FaFacebook, FaYoutube, FaTwitter, FaWhatsapp, FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import ListGroup from 'react-bootstrap/ListGroup';
import BrandCarousel from '../BrandCarousel/BrandCarousel';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';


const RightSideNav = () => {
    
    const {providerLogin} = useContext(AuthContext);
    const providerGoogle = new GoogleAuthProvider();
    
    const handleGoogleSignIn = () => {
        providerLogin(providerGoogle)
        .then(result => {
            const user = result.user;
            console.log(user);
            Swal.fire(
                'Great',
                `Hello! ${user.email}`,
                'success'
                )
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Google Sign In Failed'
            })
        })
    }
    
    
    return (
        <div>
            <h2> Right side nav </h2>
            <ButtonGroup vertical>
                <Button 
                onClick={handleGoogleSignIn}
                variant="outline-primary" className='mb-3'><FcGoogle></FcGoogle> Login With Google</Button>
                <Button variant="outline-dark" className='mb-3'><FaGithub></FaGithub> Login With Github</Button>
            </ButtonGroup>

            <div className='mt-3'>
                <h5>Find us on</h5>
                <ListGroup>
                    <ListGroup.Item className='mb-3'><FaFacebook></FaFacebook> Facebook</ListGroup.Item>
                    <ListGroup.Item className='mb-3'> <FaYoutube></FaYoutube> Youtube</ListGroup.Item>
                    <ListGroup.Item className='mb-3'> <FaTwitter></FaTwitter> Twitter</ListGroup.Item>
                    <ListGroup.Item className='mb-3'> <FaWhatsapp></FaWhatsapp> WhatsApp</ListGroup.Item>
                    <ListGroup.Item className='mb-3'><FaDiscord></FaDiscord> Discord</ListGroup.Item>
                </ListGroup>
            </div>

            <div>
                <BrandCarousel></BrandCarousel>
            </div>
        </div>
    );
};

export default RightSideNav;