import { useContext, useEffect,lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/Context/ThemeContext";
import { db } from "./firebase";
import UserContext from "./components/Context/UserContext";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Footer from "./components/Footer/Footer";
import ThemeButton from "./components/ThemeButton/ThemeButton";
import NotFound from "./components/NotFound/NotFound";
import "./App.css";

const MainContainer = lazy(() => import('./components/MainContainer/MainContainer'))
const FormLogIn = lazy(() => import('./components/Forms/FormLogIn/FormLogIn'))
const FormRegisterContainer = lazy(() => import('./components/Forms/FormRegisterContainer/FormRegisterContainer'))
const AboutUs = lazy(() => import('./components/AboutUs/AboutUs'))
const Comments = lazy(() => import('./components/Comments/Comments'))
const EditProfile = lazy(() => import('./components/EditProfile/EditProfile'))
const CommentInput = lazy(() => import('./components/CommentInput/CommentInput'))
const ListUserContainer = lazy(() => import('./components/ListUserContainer/ListUserContainer'))
const ClientReservationsContainer = lazy(() => import('./components/ClientReservationsContainer/ClientReservationsContainer'))
const AdminReservationsContainer = lazy(() => import('./components/AdminReservationsContainer/AdminReservationsContainer'))




function App() {
  const { user } = useContext(UserContext);
  useEffect(() => {
    generateTurns();
  }, []);

  //do not touch if you dont have authorization
  const generateTurns = async () => {
    const currentDate = new Date();
    const querySnapshot = await db
      .collection("turns")
      .where("date", ">=", currentDate.toISOString().split("T")[0])
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
        <Suspense fallback={"Cargando..."}>
        <Routes>
          {user?.role ? (
            <>
             <Route path="/main" element={<MainContainer />} />
            <Route
              path="/main/edit-profile"
              element={<EditProfile edit={false} />}
            />
            </>
          ) : (
            <>
              <Route path="/login" element={<FormLogIn />} />
              <Route path="/register" element={<FormRegisterContainer />} />
            </>
          )}

          {user?.role === "client" && (
            <>
             
              <Route
                path="/main/reservations"
                element={<ClientReservationsContainer />}
              />
              <Route path="/main/comment" element={<CommentInput />} />
            </>
          )}
          {user?.role === "admin" && (
            <Route
              path="/main/admin/reservations"
              element={<AdminReservationsContainer />}
            />
          )}
          {(user?.role === "admin" || user?.role === "superAdmin") && (
            <Route path="/main/list-users" element={<ListUserContainer />} />
          )}

          <Route path="/" element={<Landing />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        <ThemeButton />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
