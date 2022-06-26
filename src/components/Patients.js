import "./patients.css";
import Header from './Header';
import { useState, useEffect } from 'react'
import axios from 'axios';
import PatientSort from "./PatientSort";
import EditPatients from "./EditPatients";
import Appointments from "./Appointments";

const Patients = (props) => {

    const [patients, setPatients] = useState();

    const [patientsDrop, setPatientsDrop] = useState();

    const [patientsName, setPatientsName] = useState("Fredrick Donald");

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        age: '',
        contact: '',
        gender: '',
        patientID: '',
        medicalAid: ''
    });


    const [renderPatients, setRenderPatients] = useState();

    const [appointments, setAppointments] = useState();


    useEffect(() => {

        axios.post('http://localhost:80/apiMain/patientDisplay.php')
            .then((res) => {
                let data = res.data;
                // console.log(data);

                let patients = data.map((item) => <PatientSort key={item.id} rerender={setRenderPatients} uniqueId={item.id} name={item.name} email={item.email} contact={item.contact} age={item.age} gender={item.gender} patientID={item.patientID} medicalAid={item.medicalAid} />);
                setRenderPatients(false);

                setPatients(patients);
            });

    }, [patients]);

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

    const genderVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, gender: value });
        console.log(value)
    }

    const patientIDVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, patientID: value });
    }

    const medicalAidVal = (e) => {
        const value = e.target.value;
        setInputs({ ...inputs, medicalAid: value });
    }


    const addPatient = () => {

        axios.post('http://localhost:80/apiMain/addPatient.php', inputs)
            .then(function (response) {
                console.log(response);
            });
    }



    // Patient Name Drop Down
    useEffect(() => {

        axios.post('http://localhost:80/apiMain/patientDisplay.php')
            .then((res) => {
                let data = res.data;
                // console.log(data);

                let patients = data.map((item) =>

                    <option key={item.id} value={item.name} className='drop-val'>{item.name} </option>


                );

                setPatientsDrop(patients);
                // setPatientsName(item.name);

            });

    }, []);


    const PatientNameComp = (e) => {
        let value = e.target.value;
        setPatientsName(value.toString());
        console.log(value)
    }


    // Appointments Display

    useEffect(() => {

        axios.post('http://localhost:80/apiMain/appointmentsDisplay.php')
            .then((res) => {
                let data = res.data;
                // console.log(data[0].patient);

                let filteredData;

                for(var i = 0; i < data.length; i++){
                    filteredData = data[i].patient.filter(patient => patient.includes(patientsName));
                }


              console.log(filteredData)
                        
                        let appointments = data.map((item) =>
                        
                        <div className='entry-con-pat-ext spacing'>
                                <h2 className='pat-ext-heading-main'>{item.patient}</h2>
                                <h2 className='pat-ext-heading-bigger'>Appointments</h2>
                                <div className="pat-ext-entry-con">

                                    <div className="pat-ext-split">
                                        <h2 className='pat-ext-heading'>Doctor: {item.doctor}</h2>
                                    </div>
                                    <div className="pat-ext-split">
                                        <h2 className='pat-ext-heading'>Room: {item.room}</h2>
                                    </div>
                                    <div className="pat-ext-split">
                                        <h2 className='pat-ext-heading'>Date: {item.date}</h2>
                                    </div>
                                    <div className="pat-ext-split">
                                        <h2 className='pat-ext-heading'>Time: {item.time}</h2>
                                    </div>

                                </div>
                            </div>
                        );
                        
                        console.log(appointments);
                        setAppointments(appointments)
                        
             

            });

    },[]);



    return (
        <div>

            <Header />


            <div className='left-div-patients'>

                <h1 className='patients-heading'>Patients</h1>

                <h2 className='currentPatients-heading'>Current Patients</h2>

                <div className='d-display'>

                    {patients}
                    {/* {modal} */}

                </div>



            </div>

            <div className="right-div">

                <h2 className='addPatients-heading'>Add Patient</h2>

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
                    <p className='add-name-heading'>ID Number</p>
                    <input className='name-input-pat' onChange={patientIDVal}></input>
                </div>
                <div className='add-patient-con add-space'>
                    <p className='add-name-heading'>Medical Aid</p>
                    <input className='name-input-pat' onChange={medicalAidVal}></input>
                </div>

                <button className="add-patient" onClick={addPatient}>Add</button>

            </div>


            {props.modal}

            <h2 className='patients-ext-heading'>Patients Information</h2>
            <div className='patients-ext-con'>
                <div className="pat-ext-input-con">
                    <div className='app-con'>
                        <select name="Patients" className="patient-dropdown" onChange={PatientNameComp}>
                            {patientsDrop}
                        </select>
                    </div>
                </div>
                {/* <div className='entry-con-pat-ext spacing'>
                    <h2 className='pat-ext-heading-main'>Jimmy Neutron</h2>
                    <h2 className='pat-ext-heading-bigger'>Appointments</h2>
                    <div className="pat-ext-entry-con">

                        <div className="pat-ext-split">
                            <h2 className='pat-ext-heading'>Doctor: </h2>
                        </div>
                        <div className="pat-ext-split">
                            <h2 className='pat-ext-heading'>Room: </h2>
                        </div>
                        <div className="pat-ext-split">
                            <h2 className='pat-ext-heading'>Date: </h2>
                        </div>
                        <div className="pat-ext-split">
                            <h2 className='pat-ext-heading'>Time: </h2>
                        </div>

                    </div>
                </div> */}

                {appointments}
            </div>


        </div>
    );
}

export default Patients;
