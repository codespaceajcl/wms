import React from 'react'
import { Container } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
    return (
        <div className='footer_main'>
            <Container>
                <div>
                    <ul>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                        <li>Help</li>
                    </ul>

                    <p>Copyright 2023 -  Designed & Developed by AJCL Software Department</p>
                </div>
            </Container>
        </div>
    )
}

export default Footer
