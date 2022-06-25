import React from 'react';
import './appointments.css';
import Header from './Header';
import { useState, useEffect } from 'react'
import axios from 'axios';
import AppointmentItem from './AppointmentItem';

const Appointments = () => {

    const [appointments, setAppointments] = useState();

    const [inputs, setInputs] = useState({
        doctor: '',
        patient: '',
        room: '',
        time: '',
        date: ''
    });

    const [doctors, setDoctors] = useState();

    const [room, setRoom] = useState();

    const [patients, setPatients] = useState();
    


    useEffect(() => {

        axios.post('http://localhost:80/apiMain/appointmentsDisplay.php')
            .then((res) => {
                let data = res.data;
                // console.log(data);

                let appointments = data.map((item) =>  <AppointmentItem key={item.id}  uniqueId={item.id}  doctor={item.doctor} patient={item.patient} room={item.room} date={item.date} time={item.time}/>);

                setAppointments(appointments);

                //    setpostMessage({...postMessage, message: messageVal});
                //    let renderPost = data.map((item) => <PostItem userpost={item.userpost} date={item.timestamp} message={item.message}/>)
            });

    }, []);


    // Doctors Display 

    useEffect(() => {

        axios.post('http://localhost:80/apiMain/doctorsDisplay.php')
            .then((res) => {
                let data = res.data;
                // console.log(data);

                let doctors = data.map((item) =>

                    <option key={item.id} value={item.name} className='drop-val'>{item.name} </option>

                );

                let room = data.map((item) =>

                    <option key={item.id} value={item.room} className='drop-val'>{item.room} </option>

                );

                setDoctors(doctors);
                setRoom(room);

            });

    }, []);


    // Patients Display 

    useEffect(() => {

        axios.post('http://localhost:80/apiMain/patientDisplay.php')
            .then((res) => {
                let data = res.data;
                // console.log(data);

                let patients = data.map((item) =>

                    <option key={item.id} value={item.name} className='drop-val'>{item.name} </option>


                );

                setPatients(patients);

            });

    }, []);


    const doctorVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, doctor: value });
    }

    const patientVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, patient: value });
    }

    const roomVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, room: value });
    }

    const dateVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, date: value });
    }

    const timeVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, time: value });
    }



    const addAppointment = () => {

        axios.post('http://localhost:80/apiMain/addAppointment.php', inputs)
            .then(function (response) {
                console.log(response);
            });
    }




    






    return (
        <div>

            <Header />

            <div className='App-Left-side'>
                <h1 className='appointments-heading'>Appointments</h1>
                <h2 className='make-appointment-heading'>Make Appointment</h2>

                <div className='A-display'>
                    <div className='app-entry-con spacing'>
                        <div className='app-con first'>
                            <select name="Doctors" className="doctor-dropdown" onChange={doctorVal}>
                                {doctors}
                            </select>
                        </div>
                        <div className='app-con'>
                            <select name="Patients" className="doctor-dropdown" onChange={patientVal}>
                                <option value="Dr1">Patient</option>
                                {patients}
                            </select>
                        </div>
                        <div className='app-con'>
                            <select name="Room" className="doctor-dropdown" onChange={roomVal}>
                                <option value="Dr1">Room</option>
                                {room}
                            </select>
                        </div>
                        <div className='app-con'>
                            <input name="Date" type='date' className="date-input" placeholder='Date' onChange={dateVal}></input>

                        </div>
                        <div className='app-con'>
                            <input name="Time" type='time' className="time-input" placeholder='Time' onChange={timeVal}></input>

                        </div>
                        <div className='remove-con'>
                            <button className="add-appointment" onClick={addAppointment}>Add</button>
                        </div>
                    </div>
                </div>

                <div className='appointment-con'>

                    {appointments}

                </div>

            </div>
        </div>
    );
}

export default Appointments;
