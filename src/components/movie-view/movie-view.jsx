export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
        <div>({movie.genre.description})</div>
      </div>
      <div>
        <div>
          <span>Director: </span>
          <span>{movie.director.name}</span>
        </div>
        <div>
          <span>Bio: </span>
          <span>{movie.director.bio}</span>
        </div>
        <div>
          <span>Birth Year: </span>
          <span>{movie.director.birth}</span>
        </div>
        <div>
          <span>Death Year: </span>
          <span>{movie.director.death}</span>
        </div>
      </div>
      <div>
        <span>Actors: </span>
        <span>{movie.actors}</span>
      </div>
      <div>
        <span>Release Year: </span>
        <span>{movie.release}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.featured}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};