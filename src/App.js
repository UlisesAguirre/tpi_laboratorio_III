import Header from "./components/Header/Header"
import Main from "./components/Main/Main"
import Footer from "./components/Footer/Footer"
import FormLogIn from "./components/Form/FormLogIn/FormLogIn"
import Comments from "./components/Comments/Comments"
import AboutUs from "./components/AboutUs/AboutUs"
import FormRegister from "./components/Form/FormRegister/FormRegister"
import NavBar from "./components/NavBar/NavBar"
import ClientMain from "./components/ClientMain/ClientMain"
import ClientReservations from "./components/ClientReservations/ClientReservations"
import EditProfile from "./components/EditProfile/EditProfile"
import { Route, Routes } from 'react-router-dom';

import './App.css';



function App() {
  return (
    <div className="App">
      <Header/>
      <NavBar/>
      <Routes>
        <Route path='/' element= {<Main/>} />
        <Route path='/login' element= {<FormLogIn/>} />
        <Route path='/register' element= {<FormRegister/>} />
        <Route path="/comments" element = {<Comments/>} />
        <Route path="/about-us" element = {<AboutUs/>} />
        <Route path="/client" element = {<ClientMain/>} />
        <Route path="/client/reservations" element={<ClientReservations/>} />
        <Route path="/client/edit-profile" element={<EditProfile/>} />
      </Routes> 
      <Footer/>
    </div>
  );
}

export default App;
