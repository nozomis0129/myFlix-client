import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export const ProfileView = ({ user, setUser }) => {
  const [username, setUsername] = useState(user.Usermane);
  const [password, setPassword] = useState(user.Password)
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

// Update user profile
  const handleUpdate = (event) => {
    event.preventDefault();

    //const user = JSON.parse(localStorage.getItem("user"));

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    console.log(JSON.stringify(data));
    console.log(username);

    fetch(`https://movies-flix-app-bb16fed0a4c0.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(async (response) => {
      console.log(response)
      if (response.ok) {
        const updatedUserData =await response.json();
        localStorage.setItem("user", JSON.stringify(updatedUserData));
        setUser(updatedUserData)
        alert("updated!") 
      } else {
        const e = await response.text()
        console.log(e)
        alert("Update failed")
      }
    }).catch(error => {
      console.error("Error: ", error);      
    });
  };

  // Delete user
  const handleDelete = () => {
    fetch(`https://movies-flix-app-bb16fed0a4c0.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        setUser(null);
        alert("Your account has been deleted");
        localStorage.clear();
        navigate("/");
      } else {
        alert("Something went wrong");
      }
    })
  }

  // Display user information once loaded
  return (
    <Container>
      <Row className="justify-centent-center">
        <Col md={6}>
          <h2 className="current-profile">User profile</h2>
          <div>
            <p>Username: {user.Username}</p>
            <p>Email: {user.Email}</p>
            <p>Birthday: {user.Birthday}</p>
          </div>
          <h2 className="profile-title">Update information</h2>
          <Form className="my-profile" onSubmit={handleUpdate}>
          <Form.Group className="mb-2" controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>
          <Button className="update" type="submit" onClick={handleUpdate}>Update</Button>
          <Button className="delete" onClick={handleDelete}>Delete Account</Button>
        </Form>
        </Col>
      </Row>
      
    </Container>
  );
};


