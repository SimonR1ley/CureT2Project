import React from 'react';
import './ChangeUser.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChangeUser = () => {


    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const emailVal = (e) => {
        const value = e.target.value
        setInputs({ ...inputs, email: value });
        // Here you will validate 
    }

    const passwordVal = (e) => {
        const value = e.target.value
        setInputs({ ...inputs, password: value });
    }




    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(inputs);


        axios.post('http://localhost:80/apiMain/userLogin.php', inputs)
            .then(function (response) {
                console.log(response);

                if (response.data === true) {
                    sessionStorage.setItem('activeUser', inputs.email);
                    navigate("../ComOne");
                } else {
                    console.log("Not Working");
                }

            });

    }



    return (
        <div>
            <div className='CU-top'>
                <Link to="/newuser"><button className='signUp-btn' >Sign Up</button></Link>
                <div className='login-signup-logo'></div>
                <h1 className='login-signup-logoName'>CURE</h1>
                {/* <h1 className='changeUser-heading'>Login</h1> */}
                <div className='CU-btn-con'>
                </div>
            </div>


            <div className='CU-bottom'>

                <div className='profile-info-con'>
                    {/* <div className='profile-info-picture'></div> */}
                    <h1 className='changeUser-heading'>Login</h1>
                    {/* <p className='profile-info-name'>Jimmy Neutron</p> */}
                    <form>
                    <input className='profile-email' placeholder='Email' type='email' onChange={emailVal}></input>
                    <input className='profile-password' placeholder='Password' type='password' onChange={passwordVal}></input>
                    <Link to="/comone"><button className='login-btn' type='submit' onClick={handleSubmit}>Login</button></Link>
                    </form>
                </div>

            </div>


        </div>
    );
}

export default ChangeUser;
