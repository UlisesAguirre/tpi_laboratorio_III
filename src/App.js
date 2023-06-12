import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header"
import NavBar from "./components/NavBar/NavBar"
import Main from "./components/Main/Main"
import FormLogIn from "./components/Form/FormLogIn/FormLogIn"
import FormRegister from "./components/Form/FormRegister/FormRegister"
import AboutUs from "./components/AboutUs/AboutUs"
import Comments from "./components/Comments/Comments"
import Footer from "./components/Footer/Footer"
import ClientMain from "./components/ClientMain/ClientMain"
import ClientReservations from "./components/ClientReservations/ClientReservations"
import EditProfile from "./components/EditProfile/EditProfile"
import ThemeButton from './components/ThemeButton/ThemeButton'
import CommentInput from './components/CommentInput/CommentInput'


import './App.css';
import UserContext from './components/Context/UserContext';
import { ThemeProvider } from './components/Context/ThemeContext';



function App() {

  const user = {
    id: 1,
    icon: "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
    name: "Tito",
    lastName: "Fuentes",
    phone: "3416476578",
    email: "tugrp@example.com",
    password: "123456",
    role: "client", //Ir variando entre los roles de admin, client y superAdmin para ver las diferencias. (userContext)
  }

  return (


    <div className="App">
      <UserContext.Provider value={user}>
        <ThemeProvider>
        <Header />
          <NavBar />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<FormLogIn />} />
            <Route path='/register' element={<FormRegister />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/client" element={<ClientMain />} />
            <Route path="/client/reservations" element={<ClientReservations />} />
            <Route path="/client/edit-profile" element={<EditProfile edit={false} />} />
            <Route path='/client/comment' element={<CommentInput />}/>
          </Routes>
          <ThemeButton/>
          <Footer />
        </ThemeProvider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
