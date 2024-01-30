import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] =useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    if (!token) {
      return;
    }
    
    fetch(`https://movies-flix-app-bb16fed0a4c0.herokuapp.com/movies`, {
      headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}`
      }
    })
      .then ((response) => response.json())
      .then ((data) => {
        console.log("movies from api:", data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            actors: movie.Actors,
            genre: {
              name: movie.Genre.Name,
              description: movie.Genre.Description,
            },
            director: {
              name: movie.Director.Name,
              bio: movie.Director.Bio,
              birth: movie.Director.Birth,
              death: movie.Director.Death
            },
            image: movie.ImagePath,
            release: movie.Release,
            featured: movie.Featured
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  const addFavoriteMovie = (id) => {
    fetch(
      `https://movies-flix-app-bb16fed0a4c0.herokuapp.com/users/${user.Username}/movies/${id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Failed to add fav movie");
        }
      })
      .then((user) => {
        if (user) {
          alert("added to favorit movies");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeFavoriteMovie = (id) => {
    fetch(
      `https://movies-flix-app-bb16fed0a4c0.herokuapp.com/users/${user.Username}/movies/${id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
        }
      })
      .then((user) => {
        if (user) {
          alert("removed from favorit movies");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }}
      />
      <Row className="d-flex justify-content-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView 
                        movies={movies}
                        removeFavoriteMovie={removeFavoriteMovie}
                        addFavoriteMovie={addFavoriteMovie}
                       />
                    </Col>
                  )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie, movieId) => (
                      <Col className="mb-5" key={movieId} md={6} lg={3}>
                        <MovieCard
                          movie={movie}
                          removeFavoriteMovie={removeFavoriteMovie}
                          addFavoriteMovie={addFavoriteMovie}
                          isFavorite={user.FavoriteMovies.includes(movie.id)}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace/>
                ) : (
                  <Col>
                      <ProfileView
                        user={user}
                        token={token}
                        setUser={setUser}
                        movies={movies}
                        addFavoriteMovie={addFavoriteMovie}
                        removeFavoriteMovie={removeFavoriteMovie}
                      />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};