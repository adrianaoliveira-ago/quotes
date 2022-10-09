import "./Polaroid.css";

const Polaroid = ({
  photo = "",
  author = "",
  hashtags = [],
  quote = "",
  backgroundClass = "",
}) => {
  console.log(backgroundClass);

  return (
    <div className={backgroundClass} id="polaroid">
      <div className="polaroid-text">
        <img src={photo} className="Polaroid-photo" />
        {/* <div> */}
        <h1 className="app-quote">{quote}</h1>
        {/* </div> */}
      </div>
      <div>
        <h2 className="app-author">{author}</h2>
        <ul className="app-hashtags">
          {hashtags.length > 0 &&
            hashtags.map((item) => {
              return <li className="app-hashtag">#{item}</li>;
            })}
        </ul>
      </div>
    </div>
  );
};

export default Polaroid;
