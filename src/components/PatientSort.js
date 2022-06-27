import React from 'react';
import EditPatients from "./EditPatients";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Patients from './Patients';

const PatientSort = (props) => {

    const [modal, setModal] = useState();
    const [modalHome, setModalHome] = useState();

    const [permission, setPermission] = useState();

    const editPatient = () => {
        setModal(<EditPatients upRender={props.rerender} rerender={setModal} id={props.uniqueId} name={props.name} age={props.age} gender={props.gender} email={props.email} contact={props.contact} patientID={props.patientID} medicalAid={props.medicalAid}/>);
    }

    const deletePatient = () => {

        let userId = { id: props.uniqueId };

        if (window.confirm("Are you sure you want to delete this Patient") === true) {


            axios.post('http://localhost:80/apiMain/deletePatient.php', userId)
                .then((res) => {
                    let data = res.data;
                    console.log(data);
                });

        } else {
            console.log("The user did not delete the pateint");
        }
    }

    
    useEffect(() => {

        let userPermission = sessionStorage.getItem('activeUser');

        if (userPermission === "Master") {

            setPermission("show")
        }
    else{
        setPermission("hide");
    }

    }, []);



    return (
        <div>

            {/* {modal} */}

            <div className='card-con-pat'>


                <div className='card-profile-name'>
                    <h2 className='card-d-entry card-name'>Name: {props.name}</h2>
                </div>

                <div className='card-entry'>
                    <h2 className='card-d-entry'>Age: {props.age}</h2>
                </div>

                <div className='card-entry'>
                    <h2 className='card-d-entry'>Gender: {props.gender}</h2>
                </div>

                <div className='card-entry'>
                    <h2 className='card-d-entry'>Email: {props.email}</h2>
                </div>

                <div className='card-entry'>
                    <h2 className='card-d-entry'>Contact Number: {props.contact}</h2>
                </div>

                <div className='card-entry'>
                    <h2 className='card-d-entry'>ID: {props.patientID}</h2>
                </div>

                <div className='card-entry'>
                    <h2 className='card-d-entry'>Madical Aid: {props.medicalAid}</h2>
                </div>

                

                <div className={permission}>
                    <button className="remove edit-button" onClick={editPatient}>Edit</button>
                <button className="remove remove-button" onClick={deletePatient}>Remove</button>
                </div>


            </div>

        {modal}

        </div>
    );
}

export default PatientSort;
