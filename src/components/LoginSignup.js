import React from 'react';
import {Link} from 'react-router-dom';

const LoginSignup = () => {
    return (
        <div>
            <div className='login-signup-logo'></div>
            <h1 className='login-signup-logoName'>CURE</h1>

            <div className='login-signup-con'>
                <h2 className='login-signup-heading'>Login | Sign Up</h2>

                <button className='ls-btn'><Link to="/changeuser">Login</Link></button>
                <button className='ls-btn'><Link to="/newuser">Sign Up</Link></button>
            </div>
        </div>
    );
}

export default LoginSignup;
