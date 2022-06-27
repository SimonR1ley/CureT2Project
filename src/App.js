import { Routes, Route } from 'react-router-dom'
import './App.css';
// import LoginSignup from './components/LoginSignup';
import ComOne from './components/ComOne';
import Doctors from './components/Doctors';
import Patients from './components/Patients';
import Appointments from './components/Appointments';
import ChangeUser from './components/ChangeUser';
import NewUser from './components/NewUser';
import MyProfile from './components/MyProfile';

function App() {
  return (
    <div className="App">
      {/* <LoginSignup /> */}
      <Routes>
        <Route path='/' element={<ChangeUser />} />
        {/* <Route path='/loginsignup' element={<LoginSignup />} /> */}
        <Route path='/comone' element={<ComOne />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/patients' element={<Patients />} />
        <Route path='/appointments' element={<Appointments />} />
        <Route path='/changeuser' element={<ChangeUser />} />
        <Route path='/newuser' element={<NewUser />} />
        <Route path='/myprofile' element={<MyProfile />} />
      </Routes>
    </div>
  );
}

export default App;
