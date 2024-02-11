import { useState } from "react";
import "./profile-view.scss";
import { MovieCard } from "../movie-card/movie-card";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, FormGroup, Card, ListGroup } from "react-bootstrap";
import moment from "moment";
import { PersonCircle, Envelope, Calendar } from "react-bootstrap-icons";

export const ProfileView = ({ user, movies, setUser, addFavoriteMovie,removeFavoriteMovie }) => {
  const [username, setUsername] = useState(user.Usermane);
  const [password, setPassword] = useState(user.Password)
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const favoriteMovieList = movies.filter(movie => user.FavoriteMovies.includes(movie.id));

// Update user profile
  const handleUpdate = (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

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
      <Row>
        <h2 className="profile-title text-center my-5">Favorite Movies</h2>
        <Row className="justify-content-center">
          { 
            favoriteMovieList?.length !== 0 ?
            favoriteMovieList?.map((movie) => (
              
              <Col md={6} lg={3} key={movie.id} className="mx-2 mt-2 mb-5">
                  <MovieCard 
                    movie={movie}
                    isFavorite={user.FavoriteMovies.includes(movie.id)}
                    addFavoriteMovie={addFavoriteMovie}
                    removeFavoriteMovie={removeFavoriteMovie}
                  />
              </Col> 
            )):<Col className="text-center mb-5"><p>There are no favorite movies</p></Col>  
          }
        </Row>
      </Row>
      <Row className="prof-form">
        <Col md={6}>
          <h2 className="current-profile">My profile</h2>
          <Card className="mt-3 mb-5" style={{ width: "90%" }}>
            <ListGroup variant="flush">
              <ListGroup.Item><PersonCircle className="m-1" />Username: {user.Username}</ListGroup.Item>
              <ListGroup.Item><Envelope className="m-1" />Email: {user.Email}</ListGroup.Item>
              <ListGroup.Item><Calendar className="m-1" />Birthday: {moment(user.Birthday).utc().format("YYYY-MM-DD")}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col>  
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
          <FormGroup className="d-flex justify-content-between mt-3">
            <Button className="update" type="submit" onClick={handleUpdate}>Update</Button>
            <Button className="delete-btn" onClick={handleDelete}>Delete Account</Button>
          </FormGroup>
        </Form>
        </Col>
      </Row>
      
    </Container>
  );
};


