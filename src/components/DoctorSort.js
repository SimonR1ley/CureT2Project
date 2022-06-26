import React from 'react';
import axios from 'axios';
import EditDoctor from './EditDoctor';
import { useState } from 'react';

const DoctorSort = (props) => {

    const [modal, setModal] = useState();

    const editDoctor = () => {
        setModal(<EditDoctor upRender={props.rerender} rerender={setModal} id={props.uniqueId} name={props.name} age={props.age} gender={props.gender} email={props.email} contact={props.contact} doctorId={props.doctorId} specialisation={props.specialisation} />);
    }

    const deleteDoctor = () => {

        let userId = { id: props.uniqueId };

        if (window.confirm("Are you sure you want to delete this doctor") === true) {


            axios.post('http://localhost:80/apiMain/deleteDoctor.php', userId)
                .then((res) => {
                    let data = res.data;
                    console.log(data);
                });

        } else {
            console.log("The user did not delete the doctor");
        }
    }

    return (

        <div>

        <div className='card-con'>


            <div className='card-profile-name'>
                <h2 className='card-d-entry card-name'>{props.name}</h2>
            </div>

            <div className='card-entry'>
                <h2 className='card-d-entry'>Age: {props.age}</h2>
            </div>

            <div className='card-entry'>
                <h2 className='card-d-entry'>Room: {props.room}</h2>
            </div>

            <div className='card-entry'>
                <h2 className='card-d-entry'>Email: {props.email}</h2>
            </div>

            <div className='card-entry'>
                <h2 className='card-d-entry'>Contact Number: {props.contact}</h2>
            </div>

            <div className='card-entry'>
                <h2 className='card-d-entry'>Gender: {props.gender}</h2>
            </div>


            <div className='card-entry'>
                <h2 className='card-d-entry'>Doctor Id: {props.doctorId}</h2>
            </div>


            <div className='card-entry'>
                <h2 className='card-d-entry'>Specialisation: {props.specialisation}</h2>
            </div>


            <button className="remove edit-button" onClick={editDoctor}>Edit</button>
            <button className="remove remove-button" onClick={deleteDoctor}>Remove</button>
            
            </div>

            {modal}

        </div>


    );
}

export default DoctorSort;
