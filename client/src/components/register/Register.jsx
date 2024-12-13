import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, ButtonGroup } from 'react-bootstrap';

export const Register = (props) => {
    // const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const [errorData, setErrorData] = useState({ errors: null });
    const { errors } = errorData;

    const onChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleReset = () => {
        setUserData((prev) => {
            const n = { ...prev }
            n.name = ""
            n.email = ""
            n.password = ""
            n.passwordConfirm = ""
            return n;
        })
    }

    const registerUser = async () => {
        if (userData.password !== userData.passwordConfirm) {
            console.log("Passwords do not match");
        } else {
            const newUser = {
                name: userData.name,
                email: userData.email,
                password: userData.password,
            };
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const body = JSON.stringify(newUser);
                console.log(body);
                const res = await axios.post(
                    "http://localhost:5000/api/user",
                    body,
                    config
                );
                return res;
            } catch (error) {
                //Clear user data, Update error state
                localStorage.removeItem("token");
                setErrorData({
                    ...errors,
                    errors: error.response.data.errors,
                });
                console.error(error);
            }

            // props.authenticateUser();
        }
    };

    const getUsers = async () => {
        const result = await axios.get("http://localhost:5000/api/user")
        return result.data;
    }
    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label htmlFor="name"></Form.Label>
                    <Form.Control
                        id="name"
                        name="name"
                        type="text"
                        value={userData.name}
                        placeholder="Enter your name"
                        // autoComplete='off'
                        onChange={(e) => onChange(e)}
                    />
                    <Form.Label htmlFor="email"></Form.Label>
                    <Form.Control
                        id="email"
                        name="email"
                        type="email"
                        value={userData.email}
                        placeholder="Enter your email"
                        // autoComplete='off'
                        onChange={(e) => onChange(e)}
                    />
                    <Form.Label htmlFor="password"></Form.Label>
                    <Form.Control
                        id="password"
                        name="password"
                        type="password"
                        value={userData.password}
                        placeholder="Enter a password"
                        onChange={(e) => onChange(e)}
                    />
                    <i className="bi bi-eye-slash" id="togglePassword"></i>
                    <Form.Label htmlFor="passwordConfirm"></Form.Label>
                    <Form.Control
                        id="passwordConfirm"
                        name="passwordConfirm"
                        type="password"
                        value={userData.passwordConfirm}
                        placeholder="Enter the same password"
                        onChange={(e) => onChange(e)}
                    />
                </Form.Group>
                <ButtonGroup className="mt-1">
                    <Button className="me-1" type="submit" onClick={(e) => registerUser(e)}>Submit</Button>
                    <Button onClick={handleReset}>Reset</Button>
                </ButtonGroup>
            </Form>
            <div>
                {errors && errors.map((err) => <div key={err.msg}>{err.msg}</div>)}
            </div>
            <div>Name: {userData.name}, Email: {userData.email}, Password: {userData.password}, Confirm: {userData.passwordConfirm}</div>
        </>
    );
}
