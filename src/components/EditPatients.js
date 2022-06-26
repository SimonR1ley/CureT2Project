import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'

const EditPatients = (props) => {

    const [updatedPost, setUpdatedPost] = useState({
        id: props.id,
        name: props.name,
        email: props.email,
        age: props.age,
        contact: props.contact,
        gender: props.gender,
        patientID: props.patientID,
        medicalAid: props.medicalAid
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

    const updateAge = (e) => {
        let value = e.target.value;
        setUpdatedPost({ ...updatedPost, age: value });
        console.log(updatedPost);
    }

    const updateContact = (e) => {
        let value = e.target.value;
        setUpdatedPost({ ...updatedPost, contact: value });
        console.log(updatedPost);
    }

    const updateGender = (e) => {
        let value = e.target.value;
        setUpdatedPost({ ...updatedPost, gender: value });
        console.log(updatedPost);
    }

    const updateMedicalAid = (e) => {
        let value = e.target.value;
        setUpdatedPost({ ...updatedPost, medicalAid: value });
        console.log(updatedPost);
    }

    const updateId = (e) => {
        let value = e.target.value;
        setUpdatedPost({ ...updatedPost, id: value });
        console.log(updatedPost);
    }

    const updatePost = (e) => {
        e.preventDefault();

        axios.post('http://localhost:80/apiMain/updatePatient.php', updatedPost)
            .then((res) => {
                let data = res.data;
                console.log(data);
                props.upRender(true);
                props.rerender();
            });
    }

     

    return (
        <div>
            <div className="edit-con" >
                <div className='edit-con-over'>
                <h2 className='edit-heading'>Edit {updatedPost.name} Profile</h2>

                <div className='add-con add-space'>
                    <p className='add-name-heading-edit'>Name</p>
                    <input className='name-input-pat-edit' placeholder={props.name} onChange={updateName}></input>
                </div>
                <div className='add-con add-space'>
                    <p className='add-name-heading-edit'>Email</p>
                    <input className='name-input-pat-edit' placeholder={props.email} onChange={updateEmail}></input>
                </div>
                <div className='add-con add-space'>
                    <p className='add-name-heading-edit'>Age</p>
                    <input className='name-input-pat-edit' placeholder={props.age} onChange={updateAge}></input>
                </div>
                <div className='add-con add-space'>
                    <p className='add-name-heading-edit'>Cell No.</p>
                    <input className='name-input-pat-edit' placeholder={props.contact} onChange={updateContact}></input>
                </div>
                <div className='add-con add-space'>
                    <p className='add-name-heading-edit'>Gender</p>
                    <select className='name-input-pat-edit' placeholder={props.gender} onChange={updateGender}>
                        <option>Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className='add-con add-space'>
                    <p className='add-name-heading-edit'>Medical Aid</p>
                    <input className='name-input-pat-edit' placeholder={props.medicalAid} onChange={updateMedicalAid}></input>
                </div>
                <div className='add-con add-space'>
                    <p className='add-name-heading-edit'>ID</p>
                    <input className='name-input-pat-edit' placeholder={props.patientID} onChange={updateId}></input>
                </div>
                <button className="edit-btn" onClick={updatePost}>Change</button>

            </div>
            </div>
        </div>
    );
}

export default EditPatients;
