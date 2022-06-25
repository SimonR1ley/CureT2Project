import React from 'react';
// import { useState, useEffect } from 'react'
import axios from 'axios';

const AppointmentItem = (props) => {

    const deleteAppointment = () => {
        
        let userId = {id: props.uniqueId};
        
        if (window.confirm("Are you sure you want to delete this Appointment") === true) {
            
            
            axios.post('http://localhost:80/apiMain/deleteAppointment.php', userId)
            .then((res) => {
                let data = res.data;
                console.log(data);
            });
            
        } else {
            console.log("The user did not delete the appointment");
        }
    }


    return (
              <div className='appointments-display-con space' key={props.uniqueId}>
                        <div>
                            <div className='app-d-break'>
                                <h2 className='app-d-name'>{props.doctor}</h2>
                            </div>

                            <div className='app-d-break'>
                                <h2 className='app-d-name'>{props.patient}</h2>
                            </div>

                            <div className='app-d-break'>
                                <h2 className='app-d-name'>{props.room}</h2>
                            </div>

                            <div className='app-d-break'>
                                <h2 className='app-d-name'>{props.date}</h2>
                            </div>

                            <div className='app-d-break'>
                                <h2 className='app-d-name'>{props.time}</h2>
                            </div>

                            <button className='remove' onClick={() => deleteAppointment()}>Delete</button>
                        </div>
                    </div>
    );
}

export default AppointmentItem;
