import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';

const MyProfileSort = (props) => {

    const [updatedPost, setUpdatedPost] = useState({
        id: props.id,
        name: props.name,
        email: props.email,
        username: props.username,
        password: props.password,
        
    });


    const updateName = (e) => {
        let value = e.target.value;
        setUpdatedPost({ ...updatedPost, name: value });
        console.log(updatedPost);
    }

    const updateEmail = (e) => {
        let value = e.target.value;
        setUpdatedPost({ ...updatedPost, email: value });
        console.log(updatedPost);
    }

    const updateUsername = (e) => {
        let value = e.target.value;
        setUpdatedPost({ ...updatedPost, username: value });
        console.log(updatedPost);
    }

    const updatePassword = (e) => {
        let value = e.target.value;
        setUpdatedPost({ ...updatedPost, password: value });
        console.log(updatedPost);
    }

    const updatePost = (e) => {
        e.preventDefault();

        console.log(props.username);

        axios.post('http://localhost:80/apiMain/updateUser.php', updatedPost)
            .then((res) => {
                let data = res.data;
                console.log(data);
            });
    }
    return (
        <div>
            <div className='edit-myProfile-con'>
                {/* <div className='edit-con-over'> */}
                    <h2 className='edit-heading'>Edit Profile</h2>

                    <div className='add-con add-space'>
                        <p className='add-name-heading-edit'>Name</p>
                        <input className='name-input-pat-edit' placeholder={props.name}  onChange={updateName}></input>
                    </div>
                    <div className='add-con add-space'>
                        <p className='add-name-heading-edit'>Username</p>
                        <input className='name-input-pat-edit' placeholder={props.username}  onChange={updateUsername}></input>
                    </div>
                    <div className='add-con add-space'>
                        <p className='add-name-heading-edit'>Email</p>
                        <input className='name-input-pat-edit' placeholder={props.email}  onChange={updateEmail}></input>
                    </div>
                    <div className='add-con add-space'>
                        <p className='add-name-heading-edit'>Password</p>
                        <input className='name-input-pat-edit' placeholder={props.password}  onChange={updatePassword}></input>
                    </div>
                   
               
                    <button className="edit-btn" onClick={updatePost}>Change</button>

                {/* </div> */}
            </div>
        </div>
    );
}

export default MyProfileSort;
