import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import FormLogIn from "./components/Forms/FormLogIn/FormLogIn";
import FormRegisterContainer from "./components/Forms/FormRegisterContainer/FormRegisterContainer";
import AboutUs from "./components/AboutUs/AboutUs";
import MainContainer from "./components/MainContainer/MainContainer";
import Comments from "./components/Comments/Comments";
import Footer from "./components/Footer/Footer";
import EditProfile from "./components/EditProfile/EditProfile";
import ThemeButton from "./components/ThemeButton/ThemeButton";
import CommentInput from "./components/CommentInput/CommentInput";
import ListUserContainer from "./components/ListUserContainer/ListUserContainer";
import ClientReservationsContainer from "./components/ClientReservationsContainer/ClientReservationsContainer";
import TurnsContainer from "./components/TurnsContainer/TurnsContainer";
import { ThemeProvider } from "./components/Context/ThemeContext";
import { useContext } from "react";
import UserContext from "./components/Context/UserContext";

import "./App.css";
import { useEffect } from "react";
import { db } from "./firebase";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    /*to avoid wanting to comment this function while you are working
     on other things*/
    generateTurns();
  }, []);

  //do not touch if you dont have authorization
  const generateTurns = async () => {
    const currentDate = new Date();
    const endDate = new Date();
    endDate.setDate(currentDate.getDate() + 13);

    const querySnapshot = await db
      .collection("turns")
      .where("date", ">=", currentDate.toISOString())
      .where("date", "<=", endDate.toISOString())
      .get();

    if (!querySnapshot.empty) {
      return;
    }

    const daysOfWeek = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const timeSlots = ["12-14", "14-16", "20-22", "22-24"];

    for (let i = 0; i < 14; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);

      const dayOfWeek = daysOfWeek[currentDate.getDay()];

      for (const timeSlot of timeSlots) {
        const newTurn = {
          //conversion taken from gpt chat
          date: currentDate.toISOString().split("T")[0],
          day: dayOfWeek,
          hour: timeSlot,
          clients: [],
          capacity: 20,
          available: true,
        };

        await db.collection("turns").add(newTurn);
      }
    }
  };
  return (
    <div className="App">
      <ThemeProvider>
        <Header />
        <NavBar />
        <Routes>
          {user != null ? (
            <>
              <Route path="/main" element={<MainContainer />} />
              <Route
                path="/main/reservations"
                element={<ClientReservationsContainer />}
              />
              <Route path="/main/view-Turns" element={<TurnsContainer />} />
              <Route path="/main/list-users" element={<ListUserContainer />} />
              <Route
                path="/main/edit-profile"
                element={<EditProfile edit={false} />}
              />
              <Route path="/main/comment" element={<CommentInput />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<FormLogIn />} />
              <Route path="/register" element={<FormRegisterContainer />} />
            </>
          )}
          <Route path="/" element={<Landing />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ThemeButton />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
