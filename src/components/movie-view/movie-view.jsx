export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
        <div>({movie.Gemre.Description})</div>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
        <div>
          <span>Bio: </span>
          <span>{movie.Director.Bio}</span>
        </div>
        <div>
          <span>Birth Year: </span>
          <span>{movie.Director.Birth}</span>
        </div>
      </div>
      <div>
        <span>Release Year: </span>
        <span>{movie.Release}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};