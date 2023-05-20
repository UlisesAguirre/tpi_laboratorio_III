import Header from "./components/Header/Header"
import Main from "./components/Main/Main"
import Footer from "./components/Footer/Footer"
import FormLogIn from "./components/FormLogIn/FormLogIn"
import Comments from "./components/Comments/Comments"
import AboutUs from "./components/AboutUs/AboutUs"

import { Route, Routes } from 'react-router-dom';

import './App.css';



function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element= {<Main/>} />
        <Route path='/login' element= {<FormLogIn/>} />
        <Route path="/comments" element = {<Comments/>} />
        <Route path="/about-us" element = {<AboutUs/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
