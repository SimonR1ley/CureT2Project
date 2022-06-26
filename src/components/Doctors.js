import React from 'react';
import './Doctors.css';
import Header from './Header';
import { useState, useEffect } from 'react'
import axios from 'axios';
import DoctorSort from './DoctorSort';

const Doctors = () => {

    const [doctors, setDoctors] = useState();

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        age: '',
        contact: '',
        room: '',
        gender: '',
        doctorId: '',
        specialisation: ''
    });


    const [renderDoctors, setRenderDoctors] = useState();

    const [permission, setPermission] = useState();


    useEffect(() => {

        axios.post('http://localhost:80/apiMain/doctorsDisplay.php')
            .then((res) => {
                let data = res.data;
                // console.log(data);
                
                let doctors = data.map((item) => <DoctorSort key={item.id} rerender={setRenderDoctors} uniqueId={item.id} name={item.name} room={item.room} email={item.email} contact={item.contact} age={item.age} gender={item.gender} doctorId={item.doctorId} specialisation={item.specialisation} />);
                setRenderDoctors(false);

                setDoctors(doctors);

            });

    }, [doctors]);


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
    }

    const genderVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, gender: value });
        console.log(value);
    }

    const doctorIdVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, doctorId: value });
    }

    const specialisationVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, specialisation: value });
    }


    const addDoctor = () => {

        axios.post('http://localhost:80/apiMain/addDoctor.php', inputs)
            .then(function (response) {
                console.log(response);
            });
    }


    useEffect(() => {

        let userPermission = sessionStorage.getItem('activeUser');

        if (userPermission === "Simon") {

            setPermission(
                <div>
                 <h2 className='add-patients-heading'>Add Doctor</h2>
                <div className='pat-top-con-doc'>
                    <input className='add-input-pat' placeholder="name" onChange={nameVal}></input>
                    <input className='add-input-pat' placeholder="email" onChange={emailVal}></input>
                    <input className='add-input-pat' placeholder="age" onChange={ageVal}></input>
                    <input className='add-input-pat' placeholder="contact" onChange={contactVal}></input>
                    <select className='gender-input-pat' onChange={genderVal}>
                        <option>Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                    <input className='add-input-pat' placeholder="Room" onChange={roomVal}></input>
                    <input className='add-input-pat' placeholder="Doctor Id" onChange={doctorIdVal}></input>
                    <input className='add-input-pat' placeholder="Specialisation" onChange={specialisationVal}></input>
                    <button className="add-patient-btn" onClick={addDoctor}>Add</button>
                </div>
                </div>);

        }

    }, []);


    return (
        <div>

            <Header />

            <div className='left-div'>
                <h1 className='doctor-heading'>Doctors</h1>

               {permission}

                <h2 className='currentDoctors-heading'>Current Doctors</h2>

                <div className='d-display'>

                    {doctors}

                </div>

            </div>


            {/* <div className='right-div'>
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
                <div className='add-patient-con add-space'>
                    <p className='add-name-heading'>Gender</p>
                    <select className='name-input-pat' onChange={genderVal}>
                        <option>Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className='add-patient-con add-space'>
                    <p className='add-name-heading'>Doctor Id</p>
                    <input className='name-input-pat' onChange={doctorIdVal}></input>
                </div>
                <div className='add-patient-con add-space'>
                    <p className='add-name-heading'>Specialisation</p>
                    <input className='name-input-pat' onChange={specialisationVal}></input>
                </div>

                <button className="add-patient" onClick={addDoctor}>Add</button>
            </div> */}



        </div>
    );
}

export default Doctors;
