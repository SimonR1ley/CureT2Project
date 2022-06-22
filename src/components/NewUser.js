import React from 'react';
import axios from 'axios';
import { useState } from 'react'
import './NewUser.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MiniModalLeft from './MiniModalLeft';
import MiniModalRight from './MiniModalRight';


const NewUser = () => {



    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        passwordCon: '',
    });

    const [nameError, setNameError] = useState();
    const [emailError, setEmailError] = useState();
    const [usernameError, setUsernameError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [passwordconError, setPasswordConError] = useState();

    const [emailAvail, setEmailAvail] = useState();
    const [userAvail, setUsernameAvail] = useState();

    // const [emailIcon, setEmailIcon] = useState();
    // const [userIcon, setUserIcon] = useState();


    const firstVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, name: value });
        if (inputs.first !== '') { setNameError(); }
    }



    const imageVal = (e) => {           
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onloadend = function() {
        console.log(reader.result);
        let imgFile = reader.result;

        setInputs({...inputs, image: imgFile});

        let image = new Image();
        image.src = reader.result;
        document.getElementById('profileimg').appendChild(image);
        
        }
        reader.readAsDataURL(file);
}





    const emailVal = (e) => {

        const mailRegex = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;


        const value = e.target.value;
        setInputs({ ...inputs, email: value });

        if (inputs.email !== '') { setEmailError(); }

        if (!value.match(mailRegex)) {
            setEmailError(<MiniModalLeft message="Email not valid" />)
        }
    }

    const validateEmail = () => {
        axios.post('http://localhost:80/apiMain/authenticateEmail.php', inputs)
            .then(function (response) {
                console.log(response);
                if (response.data === "Available") {
                    // setEmailIcon(Okay);
                    setEmailAvail();
                } else if (response.data === "Not Available") {
                    // setEmailIcon(NotOkay);
                    setEmailAvail(<MiniModalRight message="Email is not Available" />);
                } else if (response.data === '') {
                    // setEmailIcon();
                    setEmailAvail();
                    setEmailError();
                }
            });
    }

    const usernameVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, username: value });

        if (inputs.username !== '') { setUsernameError(); }
    }

    const validateUser = () => {
        axios.post('http://localhost:80/apiMain/authenticateUser.php', inputs)
            .then(function (response) {
                console.log(response);
                if (response.data === "Available") {
                    // setUserIcon(Okay);
                    setUsernameAvail();
                } else if (response.data === "Not Available") {
                    // setUserIcon(NotOkay);
                    setEmailAvail(<MiniModalLeft message="Username is not Available" />);
                } else if (response.data === '') {
                    // setUserIcon();
                    setUsernameAvail();
                    setUsernameError();
                }
            });
    }


    const passwordVal = (e) => {
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/;

        const value = e.target.value;
        setInputs({ ...inputs, password: value });

        if (inputs.password !== '') { setPasswordError(); }

        if (!value.match(passRegex)) {
            setPasswordError(<MiniModalLeft message="Password must include X,Y & Z" />)
        }
    }

    const passwordConVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, passwordCon: value });

        if (inputs.password === value) {
            setPasswordConError();
        } else {
            setPasswordConError(<MiniModalLeft message="Your password does not match" />);
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);

        
        if (inputs.name === '') {
            setNameError(<MiniModalLeft message="What's you name?" />);
        } else {
            setNameError();
        }

        if (inputs.email === '') {
            setEmailError(<MiniModalLeft message="You must provide email?" />);
        } else {
            setEmailError();
        }

        
        if (inputs.username === '') {
            setUsernameError(<MiniModalLeft message="You must provide username?" />);
        } else {
            setUsernameError();
        }

        
        if (inputs.password === '') {
            setPasswordError(<MiniModalLeft message="You must provide password?" />);
        } else {
            setPasswordError();
        }

        if (inputs.passwordCon === '') {
            setPasswordConError(<MiniModalLeft message="You must confim password?" />);
        } else {
            setPasswordConError();
        }

        let result = Object.values(inputs).some(o => o === '');

        if (result) {
            console.log('Not working');
        } else {
            axios.post('http://localhost:80/apiMain/addUser.php', inputs)
                .then(function (response) {
                    console.log(response);

                    if (response.status === 200) {
                        navigate("../ComOne");
                    }

                });
        }

    }



    return (
        <div>

            <div className='newUser-top'>
                <h1 className='newUser-heading'>New User</h1>
                <Link to="/comone"><div className='newUser-login' onClick={handleSubmit}>Sign Up</div>
                </Link>
            </div>


            <div className='newUser-bottom'>

                <h2 className='enter-details-heading'>Enter Details</h2>

                <div className='details-con'>

                    <div className='input-con'>
                        <div className='input-con-sep'>
                            <h2 className='input-det'>Name</h2>
                        </div>
                        <input className='newUser-input' onChange={firstVal}></input>
                    </div>
                        {nameError}

                    <div className='input-con space'>
                        <div className='input-con-sep'>
                            <h2 className='input-det'>Email</h2>
                        </div>
                        <input className='newUser-input' onBlur={validateEmail} onChange={emailVal}></input>
                    </div>
                            {emailError}
                            {emailAvail}

                    <div className='input-con space'>
                        <div className='input-con-sep'>
                            <h2 className='input-det'>User Name</h2>
                        </div>
                        <input className='newUser-input' onBlur={validateUser} onChange={usernameVal}></input>
                    </div>
                        {usernameError}
                        {userAvail}

                    <div className='input-con space'>
                        <div className='input-con-sep'>
                            <h2 className='input-det'>Password</h2>
                        </div>
                        <input className='newUser-input' onChange={passwordVal}></input>
                    </div>
                        {passwordError}

                    <div className='input-con space'>
                        <div className='input-con-sep'>
                            <h2 className='input-det'>Confirm Password</h2>
                        </div>
                        <input className='newUser-input' onChange={passwordConVal}></input>
                    </div>
                        {passwordconError}

                </div>
            </div>

            <div className='profile-pic-con'>
                <div className='profile-pic-su'></div>
                <p className='profile-pic-des'>Profile Picture</p>
                <input name="imageUrl" className='imgInput' type="file" onChange={imageVal} />
            </div>

            {/* <div className='imageArea'>
                <p>Upload a Profile Image</p>
                <input name="imageUrl" className='imgInput' type="file" onChange={imageVal} />
                <div id="profileimg" className='profile_img'></div>  
            </div> */}

            <div className='newUser-bottom-con'>
              
                </div>



        </div>
    );
}

export default NewUser;
