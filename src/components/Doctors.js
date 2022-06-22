import React from 'react';
import './Doctors.css';
import Header from './Header';
import { useState, useEffect } from 'react'
import axios from 'axios';

const Doctors = () => {

    const [doctors, setDoctors] = useState();

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        age: '',
        contact: '',
        room: ''
    });



    useEffect(() => {

        axios.post('http://localhost:80/apiMain/doctorsDisplay.php')
            .then((res) => {
                let data = res.data;
                console.log(data);

                let doctors = data.map((item) =>

                    <div className='card-con'>

                        <div className='card-profile-pic'></div>

                        <div className='card-profile-name'>
                            <h2 className='card-d-entry'>{item.name}</h2>
                        </div>

                        <div className='card-entry'>
                            <h2 className='card-d-entry'>Room: {item.room}</h2>
                        </div>

                        <div className='card-entry'>
                            <h2 className='card-d-entry'>{item.email}</h2>
                        </div>

                        <div className='card-entry'>
                            <h2 className='card-d-entry'>Contact Number - {item.contact}</h2>
                        </div>

                    </div>

                );

                setDoctors(doctors);

            });

    }, []);


    const nameVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, name: value });
    }

    const emailVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, email: value });
    }

    const ageVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, age: value });
    }

    const contactVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, contact: value });
    }

    const roomVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, room: value });
        console.log(value);
    }


    const addDoctor = () =>{

        axios.post('http://localhost:80/apiMain/addDoctor.php', inputs)
        .then(function (response) {
            console.log(response);
        });
    }




    return (
        <div>

            <Header />

            <div className='left-div'>
                <h1 className='doctor-heading'>Doctors</h1>

                <h2 className='currentDoctors-heading'>Current Doctors</h2>

                <div className='d-display'>

                    <div className='card-con'>

                        <div className='card-profile-pic'></div>

                        <div className='card-profile-name'>
                            <h2 className='card-d-entry'>Jimmy Neutron</h2>
                        </div>

                        <div className='card-entry'>
                            <h2 className='card-d-entry'>Room: 201</h2>
                        </div>

                        <div className='card-entry'>
                            <h2 className='card-d-entry'>jn@gmail.com</h2>
                        </div>

                        <div className='card-entry'>
                            <h2 className='card-d-entry'>Contact Number - 0821115897</h2>
                        </div>

                    </div>

                    {doctors}

                </div>



                <div className='doctor-info-con'>
                    <h2 className='addDoctors-heading'>Doctors Information</h2>

                    <div className='addDoc-con add-space'>
                        <p className='add-name-heading'>Name</p>
                        <input className='name-input'></input>
                        <button className='search'>Search</button>
                    </div>

                    <div className='addDoc-con'>
                        <div className='Heading-con first'>
                            <h2 className='d-entry'>#1</h2>
                        </div>
                        <div className='Heading-con'>
                            <h2 className='d-entry'>Jimmy Neutron</h2>
                        </div>
                        <div className='Heading-con'>
                            <h2 className='d-entry'>j@gmail.com</h2>
                        </div>
                        <div className='Heading-con'>
                            <h2 className='d-entry'>3</h2>
                        </div>
                        <div className='Heading-con'>
                            <button className="remove">Remove</button>
                        </div>
                    </div>

                </div>

            </div>


            <div className='right-div'>
                {/* <div className='appointments-ov'>
                    <h2 className='appointments-ov-heading'>Appointments</h2>
                </div> */}

                <h2 className='addDoctor-heading'>Add Doctor</h2>

                <div className='add-patient-con add-space'>
                    <p className='add-name-heading'>Name</p>
                    <input className='name-input-pat' onChange={nameVal}></input>
                </div>
                <div className='add-patient-con add-space'>
                    <p className='add-name-heading'>Email</p>
                    <input className='name-input-pat' onChange={emailVal}></input>
                </div>
                <div className='add-patient-con add-space'>
                    <p className='add-name-heading'>Age</p>
                    <input className='name-input-pat' onChange={ageVal}></input>
                </div>
                <div className='add-patient-con add-space'>
                    <p className='add-name-heading'>Room</p>
                    <input className='name-input-pat' onChange={roomVal}></input>
                </div>
                <div className='add-patient-con add-space'>
                    <p className='add-name-heading'>Cell No.</p>
                    <input className='name-input-pat' onChange={contactVal}></input>
                </div>

                <button className="add-patient" onClick={addDoctor}>Add</button>
            </div>



        </div>
    );
}

export default Doctors;
