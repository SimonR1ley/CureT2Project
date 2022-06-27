import { Link } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate();

    const setLogout = () => {
        sessionStorage.clear();
        navigate("./");
      }


    return (
        <div>

            <div className='nav-con'>
                <div className='logo'></div>
                <h1 className='logo-name'>CURE</h1>

                <div className='nav-item One'>
                    <p className='icon-name'><Link to="/comone">Overview</Link></p>
                </div>

                <div className='nav-item space'>
                    <p className='icon-name'><Link to="/doctors">Doctors</Link></p>
                </div>

                <div className='nav-item space'>
                    <p className='icon-name'><Link to="/patients">Patients</Link></p>
                </div>

                <div className='nav-item space'>
                    <p className='icon-name'><Link to="/appointments">Appointments</Link></p>
                </div>

                <div className='nav-item space'>
                    <p className='icon-name'><Link to="/myprofile">My Profile</Link></p>
                </div>

                {/* <div className='profile-con'>
                    <div className='profile-pic'></div>
                    <div className='profile-name'>
                        <p className='user-name'>Jimmy Neutron</p>
                        <p className='user-type'>Receptionist</p>
                        </div>
                        <Link to="/loginsignup"><div className='profile-change'></div></Link>
                </div> */}

                <div className='logout-con'>
                   
                    <Link to="/changeuser" onClick={setLogout}><h3 className='logout-txt'>LOGOUT</h3></Link>
                </div>

            </div>

        </div>
    );
}

export default Header;
