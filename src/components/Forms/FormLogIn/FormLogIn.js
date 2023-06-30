import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import { ThemeContext } from "../../Context/ThemeContext";
import UserContext from "../../Context/UserContext";
import Input from "../../shared/Input/Input";
import Modal from "../../shared/Modal/Modal";
import "./formLogIn.css";

const FormLogIn = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { login } = useContext(UserContext);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [validInput, setValidInput] = useState({
    email: null,
    password: null,
  });
  const [modal, setModal] = useState({
    modalOpen: false,
    modalTitle: "",
    modalMessage: "",
  });

  const loguinFirebase = async () => {
    try {
      const querySnapshot = await db
        .collection("users")
        .where("email", "==", input.email)
        .get();
      if (querySnapshot.empty) {
        setModal({
          modalOpen: true,
          modalTitle: "Error",
          modalMessage: "Email o contraseña incorrectos",
        });
      } else {
        const client = querySnapshot.docs[0].data();
        if (client.password === input.password) {
          login(client.email, client.role, client.name, client.lastName);
          navigate("/main");
        } else {
          setModal({
            modalOpen: true,
            modalTitle: "Error",
            modalMessage: "Email o contraseña incorrectos",
          });
        }
      }
    } catch (error) {
      setModal({
        modalOpen: true,
        modalTitle: "Error",
        modalMessage: `Error durante el inicio de sesion:${error}`,
      });
    }
  };
  const handlerChangeInput = (e) => {
    if (e.target.name === "email") {
      setInput({ ...input, [e.target.name]: e.target.value.toLowerCase() });
    } else {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };
  const handlerBlurInput = (e) => {
    const eventTarget = e.target.name;
    setValidInput({
      ...validInput,
      [eventTarget]: input[eventTarget] ? true : false,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationInputs = Object.values(validInput).some((valid) => !valid);

    if (validationInputs) {
      setModal({
        modalOpen: true,
        modalTitle: "Aviso",
        modalMessage: "Por Favor complete todos los campos correctamente",
      });
    } else {
      loguinFirebase();
    }
  };

  return (
    <div className={theme}>
      <div className="LogIn">
        <div className="form-logIn">
          <h3 className="form-tittle form-all">Iniciar Sesión</h3>
          <Input
            inputName={"Email"}
            placeholder={"example@gmail.com"}
            type={"email"}
            name={"email"}
            value={input.email}
            event={handlerChangeInput}
            onBlur={handlerBlurInput}
            validInput={validInput}
            errorMessage={"Este campo es requerido"}
          />
          <Input
            inputName={"Contraseña"}
            placeholder={"*********"}
            type={"password"}
            name={"password"}
            event={handlerChangeInput}
            onBlur={handlerBlurInput}
            validInput={validInput}
            errorMessage={"Este campo es requerido"}
          />
          <div className="form-button">
            <button className="button" onClick={handleSubmit}>
              Iniciar sesión
            </button>
          </div>
          <p>
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="button-register">
              Registrarse
            </Link>
          </p>
        </div>
      </div>
      {modal.modalOpen && (
        <Modal
          title={modal.modalTitle}
          message={modal.modalMessage}
          onClose={() => setModal({ modalOpen: false })}
        />
      )}
    </div>
  );
};

export default FormLogIn;
