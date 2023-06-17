import { Route, Routes} from 'react-router-dom';
import Header from "./components/Header/Header"
import NavBar from "./components/NavBar/NavBar"
import Landing from './components/Landing/Landing';
import FormLogIn from "./components/Forms/FormLogIn/FormLogIn"
import FormRegisterContainer from './components/Forms/FormRegisterContainer/FormRegisterContainer';
import AboutUs from "./components/AboutUs/AboutUs"
import MainContainer from './components/MainContainer/MainContainer';
import Comments from "./components/Comments/Comments"
import Footer from "./components/Footer/Footer"
import ClientReservations from "./components/ClientReservations/ClientReservations"
import EditProfile from "./components/EditProfile/EditProfile"
import ThemeButton from './components/ThemeButton/ThemeButton'
import CommentInput from './components/CommentInput/CommentInput'
import ListUserContainer from './components/ListUserContainer/ListUserContainer';
import { ThemeProvider } from './components/Context/ThemeContext';
// import { useContext } from 'react';
// import UserContext from './components/Context/UserContext';

import './App.css';
import TurnsContainer from './components/TurnsContainer/TurnsContainer';



function App() {

  // const {user} = useContext(UserContext);



  return (
    <div className="App">
        <ThemeProvider>
          <Header />
          <NavBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<FormLogIn />} />
            <Route path="/register" element={<FormRegisterContainer />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/main" element={<MainContainer />} />
            <Route path="/main/reservations" element={<ClientReservations />} />
            <Route path="/main/add-Turns" element={<TurnsContainer />} />
            <Route path="/main/list-users" element={<ListUserContainer />} />
            <Route path="/main/edit-profile" element={<EditProfile edit={false} />} />
            <Route path="/main/comment" element={<CommentInput />} />
          </Routes>
          <ThemeButton />
          <Footer />
        </ThemeProvider>
    </div>
  );
}

export default App;
