import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, ButtonGroup } from 'react-bootstrap';

export const Login = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
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
            n.email = ""
            n.password = ""
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

    return (
        <>
            <Form>
                <Form.Group>
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
                </Form.Group>
                <ButtonGroup className="mt-1">
                    <Button className="me-1" type="submit" onClick={(e) => registerUser(e)}>Log In</Button>
                    <Button onClick={handleReset}>Reset</Button>
                </ButtonGroup>
            </Form>
            <div>
                {errors && errors.map((err) => <div key={err.msg}>{err.msg}</div>)}
            </div>
            <div>Email: {userData.email}, Password: {userData.password}</div>
        </>
    );
}
