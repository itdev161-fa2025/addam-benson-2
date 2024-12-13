import "./App.css";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/home/Home";
import { List } from "./components/list/List";
import { Navigation } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { Register } from "./components/register/Register";
import { Login } from "./components/login/Login";
import axios from "axios";

function App() {
  // const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    isLoggedIn: false
  });

  const authenticateUser = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("user");
      setUser({ user: null });
    }
    if (token) {
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };
      axios
        .get("http://localhost:5000/api/auth", config)
        .then((response) => {
          localStorage.setItem("user", response.data.name);
          setUser({ name: response.data.name });
        })
        .catch((error) => {
          localStorage.removeItem("user");
          setUser({ user: null });
          console.error(`Error logging in: ${error}`);
        });
    }
  };

  // const logOut = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   this.setState({ user: null, token: null });
  // };
  return (
    <Container>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home props={user} />} />
        <Route path='/chore' element={<List props={user} />} />
        <Route path='/register' element={<Register user={user} authenticateUser={authenticateUser} />} />
        <Route path='/login' element={<Login user={user} authenticateUser={authenticateUser} />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
