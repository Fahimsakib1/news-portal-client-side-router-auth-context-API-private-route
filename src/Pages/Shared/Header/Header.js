import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import LeftSideNav from '../LeftSideNav/LeftSideNav';
import Image from 'react-bootstrap/Image';
import { FaUserAlt } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';



const Header = () => {

    const { user, handleSignOut } = useContext(AuthContext);
    console.log(user);


    const userSignOut = () => {
        handleSignOut()
            .then(() => {
                // Swal.fire(
                //     'Good job!',
                //     'Log out Done',
                //     'success'
                // );
            })

            .catch(error => {
                console.error(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Logout Failed!'
                })
            })
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='mb-4'>
                <Container>
                    <Navbar.Brand ><Link to='/'>News Portal</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">All News</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
                            <>
                                {
                                    user?.uid ?
                                        <div className='d-flex align-items-center'>
                                            <p className='me-3 my-auto' style={{ color: "goldenrod" }}>Welcome, {user?.displayName}
                                            </p>
                                            <Link to='/profile'>
                                                {
                                                    user?.photoURL ?
                                                        <Image roundedCircle src={user?.photoURL} style={{ height: "30px" }} >
                                                        </Image>
                                                        :
                                                        <FaUserAlt className='fs-3 rounded-4'></FaUserAlt>
                                                }
                                            </Link>

                                            <Link to='/'><button onClick={userSignOut} className='btn btn-outline-danger ms-3'>Logout</button></Link>

                                        </div>
                                        :
                                        <>
                                            <Link className='me-2' to='/login'>Login</Link>
                                            <Link to='/register' className='me-2 mb-2'>Register</Link>
                                            <Link to='/profile'><FaUserAlt className='fs-3 rounded-4 ms-2 text-white'></FaUserAlt></Link>
                                        </>
                                }
                            </>
                        </Nav>
                        <div className='d-lg-none d-block'>
                            <LeftSideNav></LeftSideNav>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;