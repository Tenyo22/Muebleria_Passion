import React from 'react'
import '../style/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer>
                <div className="container-sm">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <p className='text-footer'>&copy; 2023 Muebles Passion. All Rights Reserved.</p>
                            <div className="social-icons">
                                <Link to={"https://www.facebook.com/mueblesriverama"}><i className="fab fa-facebook"></i></Link>
                                <Link to={"https://www.tiktok.com/@mueblesriverama"}><i className="fab fa-tiktok"></i></Link>
                                <Link to={"#"}><i className="fab fa-instagram"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer