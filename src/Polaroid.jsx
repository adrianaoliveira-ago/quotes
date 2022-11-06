import { useEffect } from "react";
import { useState } from "react";

import IconSpin from "./assets/IconSpin.gif";
import "./Polaroid.css";

const Polaroid = ({
  photo = "",
  author = "",
  hashtags = [],
  quote = "",
  backgroundClass = "",
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("photo change");
    setIsLoading(true);
  }, [photo]);

  function imageLoaded() {
    console.log("imageLoaded");
    setIsLoading(false);
  }

  return (
    <div className={backgroundClass} id="polaroid">
      <div className="polaroid-text">
        <img src={photo} className="Polaroid-photo" onLoad={imageLoaded} />
        {isLoading === true && (
          <img src={IconSpin} className="polaroid-photo-spinner" />
        )}
        {/* <div> */}
        {isLoading === false && <h1 className="app-quote">{quote}</h1>}
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
