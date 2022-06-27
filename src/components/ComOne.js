import React from 'react';
import Header from './Header';
import './ComOne.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import './Calendar.css';


const ComOne = () => {

    const navigate = useNavigate();

    const [userId, setUserId] = useState({
        activeUser: sessionStorage.getItem('activeUser')
    });

    const [doctors, setDoctors] = useState();
    const [patients, setPatients] = useState();

    const [appointments, setAppointments] = useState();

    let currentUser = sessionStorage.getItem('activeUser');


    useEffect(() => {

        const userSession = sessionStorage.getItem('activeUser');
        if (userSession === '' || userSession === null) {
            navigate('/changeuser');
        }

    }, []);


    useEffect(() => {

        axios.post('http://localhost:80/apiMain/doctorsDisplay.php', userId)
            .then((res) => {
                let data = res.data;
                console.log(data);

                let doctors = data.map((item) =>

                    <div className='entry-con spacing'>
                        <h2 className='entry align-left'>Dr.</h2>
                        <h2 className='entry align-center'>{item.name}</h2>
                        <h2 className='entry align-right'>{item.email}</h2>
                    </div>

                );

                setDoctors(doctors);

                //    setpostMessage({...postMessage, message: messageVal});
                //    let renderPost = data.map((item) => <PostItem userpost={item.userpost} date={item.timestamp} message={item.message}/>)
            });

    }, []);




    useEffect(() => {

        axios.post('http://localhost:80/apiMain/patientDisplay.php')
            .then((res) => {
                let data = res.data;
                console.log(data);

                let patients = data.map((item) =>

                    <div className='entry-con spacing'>
                        <h2 className='entry align-left'>#</h2>
                        <h2 className='entry align-center'>{item.name}</h2>
                        <h2 className='entry align-right'>{item.contact}</h2>
                    </div>

                );

                setPatients(patients);

                //    setpostMessage({...postMessage, message: messageVal});
                //    let renderPost = data.map((item) => <PostItem userpost={item.userpost} date={item.timestamp} message={item.message}/>)
            });

    }, []);


    // Appointments Display 

    useEffect(() => {

        axios.post('http://localhost:80/apiMain/appointmentsDisplay.php')
            .then((res) => {
                let data = res.data;
                // console.log(data);

                let appointments = data.map((item) =>   <div className='appointments-display-con space ov'>
                <div>
                    <div className='app-d-break-ov'>
                        <h2 className='app-d-name-ov'>{item.doctor}</h2>
                    </div>

                    <div className='app-d-break-ov'>
                        <h2 className='app-d-name-ov'>{item.patient}</h2>
                    </div>

                    <div className='app-d-break-ov'>
                        <h2 className='app-d-name-ov'>{item.room}</h2>
                    </div>

                    <div className='app-d-break-ov'>
                        <h2 className='app-d-name-ov'>{item.date}</h2>
                    </div>

                    <div className='app-d-break-ov'>
                        <h2 className='app-d-name-ov'>{item.time}</h2>
                    </div>

                </div>
            </div>
            );

                setAppointments(appointments);

                //    setpostMessage({...postMessage, message: messageVal});
                //    let renderPost = data.map((item) => <PostItem userpost={item.userpost} date={item.timestamp} message={item.message}/>)
            });

    }, [appointments]);





    return (
        <div>

            <Header />

            <div className='welcome-div'>
                <h2 className='welcome-one'>Hi {currentUser},</h2>
                <h1 className='welcome-two'>What Will You Be Doing Today?</h1>
            </div>

            <div className='calendar-con'>
                <h2 className='calendar-heading'>Calendar</h2>
                <div className='calendar'>
                    <Calendar />
                </div>
            </div>

            <h2 className='A-heading'>Appointments</h2>
            <div className='appointments-display-con space ov-more'>
                        <div>
                            <div className='app-d-break-ov'>
                                <h2 className='app-d-name-ov'>Doctor</h2>
                            </div>

                            <div className='app-d-break-ov'>
                                <h2 className='app-d-name-ov'>Patient</h2>
                            </div>

                            <div className='app-d-break-ov'>
                                <h2 className='app-d-name-ov'>Room</h2>
                            </div>

                            <div className='app-d-break-ov'>
                                <h2 className='app-d-name-ov'>Day</h2>
                            </div>

                            <div className='app-d-break-ov'>
                                <h2 className='app-d-name-ov'>Time</h2>
                            </div>

                            {/* <button className='remove' onClick={() => deleteAppointment()}>Delete</button> */}
                        </div>
                    </div>
            <div className='appointments-display'>
          

                    {appointments}
            </div>

            <div className='DP-con'>

                <h2 className='D-heading'>Doctors</h2>
                <div className='entry-con'>
                    <h2 className='entry heading align-left'>Dr.</h2>
                    <h2 className='entry heading align-center'>Name</h2>
                    <h2 className='entry heading align-right'>Email</h2>
                </div>
                <div className='d-display'>
                    {doctors}
                </div>
            </div>
            <div className='DP-con-two'>
                <h2 className='P-heading'>Patients</h2>
                <div className='entry-con-pat'>
                    <h2 className='entry align-left'>#</h2>
                    <h2 className='entry align-center'>Name</h2>
                    <h2 className='entry align-right'>Contact</h2>
                </div>
                <div className='p-display'>
                    {patients}
                </div>
            </div>

        </div>
    );
}

export default ComOne;
