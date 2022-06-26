import React from 'react';
import Header from './Header';
import './ComOne.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// import format from 'date-fns/format';
// import parse from 'date-fns/parse';
// import startOfWeek from 'date-fns/startOfWeek';
// import getDay from 'date-fns/getDay';
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import ReactDatePicker from 'react-datepicker';

// const locals = {
//     "en-Us":require("date-fns/locale/en-US")
// }

// const localizer = dateFnsLocalizer({
//     format,
//     parse,
//     startOfWeek,
//     getDay,
//     locals
// })

// const events = [
//     {
//         title: "Big Meeting",
//         allDay: true,
//         start: new Date(2021,6,0),
//         end: new Date(2021,6,0)
//     },
//     {
//         title: "Vacation",
//         start: new Date(2021,6,0),
//         end: new Date(2021,6,0)
//     },
//     {
//         title: "Conference",
//         start: new Date(2021,6,0),
//         end: new Date(2021,6,0)
//     },
// ]


const ComOne = () => {

    const navigate = useNavigate();

    const [userId, setUserId] = useState({
      activeUser: sessionStorage.getItem('activeUser')
    });

    const [doctors, setDoctors] = useState();
    const [patients, setPatients] = useState();

    let currentUser = sessionStorage.getItem('activeUser');


    useEffect(() => {

        const userSession = sessionStorage.getItem('activeUser');
        if(userSession === '' || userSession === null){
          navigate('/changeuser');
        }
    
      },[]);


    useEffect(() => {

        axios.post('http://localhost:80/apiMain/doctorsDisplay.php', userId)
               .then((res)=>{
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
   
     },[]);




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
                    {/* {calendar} */}
                    {/* <Calendar localizer={localizer} events={events}
                     startAccessor="start" endAccessor="end" style={{height: 200}} /> */}
                </div>
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

                <h2 className='P-heading'>Patients</h2>
                <div className='entry-con'>
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
