import React from 'react';
import './MyProfile.css';
import Header from './Header';
import { useState, useEffect } from 'react'
import axios from 'axios';
import MyProfileSort from './MyProfileSort';
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState();
    const [renderImage, setRenderImage] = useState();

    const [usersEdit, setusersEdit] = useState();
    
    const [renderUsers, setRenderUsers] = useState();
    // const [currentUser, setCurrentUser] = useState();

   let currentUser = sessionStorage.getItem('activeUser');

   useEffect(() => {

    const userSession = sessionStorage.getItem('activeUser');
    if (userSession === '' || userSession === null) {
        navigate('/changeuser');
    }

    axios.post('http://localhost:80/apiMain/userDisplay.php')
    .then((res) => {
        let data = res.data;

        let source = data[0].imgPath;
        let renderpath = 'http://localhost:80/apiMain/' + source;
        setRenderImage(renderpath);

    }).catch(err=>{
        console.log(err);
      });;

}, []);

    useEffect(() => {

        axios.post('http://localhost:80/apiMain/userDisplay.php')
            .then((res) => {
                let data = res.data;

                let usersEdit = data.filter((val) => {
                    if (val.name.includes(currentUser)) {
                        return val
                    }
                }).map((item) => 
                
                <MyProfileSort  key={item.id} rerender={setRenderUsers} uniqueId={item.id} name={item.name} username={item.username} email={item.email} password={item.password}/>);

                // console.log(data)

                let users = data.filter((val) => {
                    if (val.name.includes(currentUser)) {
                        return val
                    }
                }).map((item) =>

                    <div className='con'>
                        <img src={renderImage} className='pp-con'></img>
                        <div className='text-con'>
                            <h4 className='my-account-subH'>Name: {item.name}</h4>
                            <h4 className='my-account-subH'>Email: {item.email}</h4>
                            <h4 className='my-account-subH'>Username: {item.username}</h4>
                            <h4 className='my-account-subH'>Password: {item.password}</h4>
                        </div>
                    </div>
                );

                setUsers(users);
                setusersEdit(usersEdit)
            });

    }, [users]);




    return (
        <div>
            <Header />

            {/* <img src={renderImage} className='dashProfile' /> */}

            <h2 className='my-account-heading'>My Account</h2>
            {users}
            {usersEdit}

        </div>
    );
}

export default MyProfile;
