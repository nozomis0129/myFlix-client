import { useState } from "react";
import { Form, Button } from "react-bootstrap"

export const LoginView = ({ onLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password 
    };
    fetch("https://movies-flix-app-bb16fed0a4c0.herokuapp.com/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if(data.user){
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength="5"
          required
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button className="mt-3 mb-4" variant="primary" type="submit">Submit</Button>
    </Form>
  );
};
