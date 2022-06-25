import "./patients.css";
import Header from './Header';
import { useState, useEffect } from 'react'
import axios from 'axios';

const Patients = () => {

    const [patients, setPatients] = useState();

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        age: '',
        contact: ''
    });


    const [PatientName, setPatientName] = useState([]);


    useEffect(() => {

        axios.post('http://localhost:80/apiMain/patientDisplay.php')
            .then((res) => {
                let data = res.data;
                console.log(data);



                let patients = data.map((item) =>

                    <div className='entry-con-pat spacing' id={item.id}>
                        <div className='Heading-con first'>
                            <h2 className='d-entry'>{item.length}</h2>
                        </div>
                        <div className='Heading-con'>
                            <h2 className='d-entry'>{item.name}</h2>
                        </div>
                        <div className='Heading-con'>
                            <h2 className='d-entry'>{item.email}</h2>
                        </div>
                        <div className='Heading-con'>
                            <h2 className='d-entry'>{item.id_number}</h2>
                        </div>
                        <div className='Heading-con'>
                            <button className="remove" onClick={() => deletePatient(item.id)}>Remove</button>
                        </div>
                    </div>

                );

                setPatients(patients);

                //    setpostMessage({...postMessage, message: messageVal});
                //    let renderPost = data.map((item) => <PostItem userpost={item.userpost} date={item.timestamp} message={item.message}/>)
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


    const addPatient = () =>{

        axios.post('http://localhost:80/apiMain/addPatient.php', inputs)
        .then(function (response) {
            console.log(response);
        });
    }

    const deletePatient = (id) => {
        if (window.confirm("Are you sure you want to delete this Patient") === true) {

            // let postId;
            console.log(id);

            axios.post('http://localhost:80/apiMain/deletePatient.php', id)
                .then((res) => {
                    // postId = data.id;
                    let data = res.data;
                    console.log(data);
                    // props.rerender(true);
                });

        } else {
            console.log("The user did not delete the patient");
        }
    }




// Patient Search 

    const SearchName = (e) => {

        let value = e.target.value;

        axios.post('http://localhost:80/apiMain/patientSearch.php', value)
            .then((res) => {
                let data = res.data;
                console.log(data);

                

                let patient = data.map((item) =>

                <div className='entry-con-pat spacing'>
                <div className='Heading-con first'>
                    <h2 className='d-entry'>{item.id}</h2>
                </div>
                <div className='Heading-con'>
                    <h2 className='d-entry'>{item.name}</h2>
                </div>
                <div className='Heading-con'>
                    <h2 className='d-entry'>{item.email}</h2>
                </div>
                <div className='Heading-con'>
                    <h2 className='d-entry'>{item.age}</h2>
                </div>
                <div className='Heading-con'>
                    <button className="remove">Remove</button>
                </div>
            </div>

                );
                
                if(value == data.name){
                    setPatientName(patient);
                }

                

            });

    };


    return (
        <div>

            <Header />


            <div className='left-div-patients'>

                <h1 className='patients-heading'>Patients</h1>

                <h2 className='currentPatients-heading'>Current Patients</h2>
                <div className='entry-con-pat'>
                    <div className='Heading-con first'>
                        <h2 className='d-heading'>#</h2>
                    </div>
                    <div className='Heading-con'>
                        <h2 className='d-heading'>Name</h2>
                    </div>
                    <div className='Heading-con'>
                        <h2 className='d-heading'>Email</h2>
                    </div>
                    <div className='Heading-con'>
                        <h2 className='d-heading'>ID No.</h2>
                    </div>

                    <div className='Heading-con'>
                        <h2 className='d-heading'>Remove</h2>
                    </div>

                </div>

                <div className='d-display'>

                {patients}

                </div>


                <h2 className='currentPatients-heading'>Patient Information</h2>

                <div className='add-patient-con add-space'>
                    <p className='add-name-heading'>Name</p>
                    <input className='name-input-pat' onChange={SearchName}></input>
                </div>
                <div className='entry-con-pat spacing'>
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

                    {/* {PatientName} */}


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

                <button className="add-patient" onClick={addPatient}>Add</button>

            </div>
        </div>
    );
}

export default Patients;
