import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { toBlob, toJpeg } from "html-to-image";

import "./App.css";
import Polaroid from "./Polaroid";
import IconRefresh from "./assets/IconRefresh.svg";
import IconCopy from "./assets/IconCopy.png";
import IconShare from "./assets/IconShare.svg";
import IconNewPhoto from "./assets/IconNewPhoto.svg";
import IconChangeBg from "./assets/IconChangeBg.png";
import IconSpin from "./assets/IconSpin.gif";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState([]);

  const [counter, setCounter] = useState(0);
  const [imageList, setImageList] = useState([]);

  const arrayClassBg = [
    "bg-initial",
    "bg-green-light",
    "bg-pink",
    "bg-purple",
    "bg-brown",
    "bg-rosa",
    "bg-floralwhite",
    "bg-green",
    "bg-orange",
    "bg-light-pink",
    "bg-spot",
    "bg-natural",
    "bg-generic",
  ];
  const [countBg, setCountBg] = useState(0);

  const [showLoading, setShowLoading] = useState(true);

  function arrayChangeBg() {
    let newCount = countBg + 1;
    console.log(newCount, arrayClassBg.length);
    if (newCount >= arrayClassBg.length) {
      newCount = 0;
    }
    setCountBg(newCount);

    console.log(newCount);
  }

  function copyText() {
    const textToCopy = `${quote} - ${author}`;
    navigator.clipboard.writeText(textToCopy);
    toast("Quote Copied to Clipboard", {
      icon: "✅",
    });
  }

  async function shareText() {
    console.log(shareText);
    const node = document.getElementById("polaroid");
    try {
      // toBlob(node).then(async function (blob) {
      toJpeg(node, { quality: 1 }).then(async (dataUrl) => {
        // var file = new File([blob], "Polaroid.jpg");
        const blob = await fetch(dataUrl).blob();

        const file = new File([blob], "Polaroid.jpg", {
          type: "image/jpeg",
          lastModified: new Date(),
        });

        await navigator.share({
          files: [file],
          // text: "Learn web development on MDN!",
          // url: "https://developer.mozilla.org",
        });
      });
    } catch (err) {
      alert(err);
    }

    // toJpeg(node, { quality: 1 }).then(function (dataUrl) {
    //   // var link = document.createElement("a");
    //   // link.download = "my-image-name.jpeg";
    //   // link.href = dataUrl;
    //   // link.click();
    // });
  }

  function changePhoto() {
    if (counter === 99) {
      setCounter(0);
    } else {
      setCounter(counter + 1);
    }

    toast("Photo Updated", {
      icon: "🖼",
    });

    console.log("changePhoto");
  }

  function fetchQuote() {
    setShowLoading(true);

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "2e2568767amshba491398206783bp14519djsn56d6882a1566",
        "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
      },
    };

    fetch("https://quotes15.p.rapidapi.com/quotes/random/", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        if (response.message) {
          // api error, wait 1,5 second and try again
          console.log("api error, wait 1,5 second and try again");
          setTimeout(() => {
            fetchQuote();
          }, 1500); // 1500ms === 1,5sec
        } else if (
          response.content &&
          response.originator.name &&
          response.originator.name != "Adolf Hitler" &&
          response.tags &&
          response.content.length < 400
        ) {
          setQuote(response.content);
          setAuthor(response.originator.name);

          console.log(response.tags.length);
          const tagsSlice = response.tags.slice(0, 6);
          setTags(tagsSlice);

          changePhoto();

          toast("Quote Updated", {
            icon: "🔄",
          });
          setShowLoading(false);
        } else {
          console.warn("quote not valid, fecthing new quote", response);
          fetchQuote();
        }
      })
      .catch((err) => console.error(err));
  }

  function fetchImageList() {
    // console.log("fetching Image List");

    const options = {
      method: "GET",
    };

    fetch("https://picsum.photos/v2/list?limit=100", options)
      .then((response) => response.json())
      .then((response) => {
        setImageList(response);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    console.log("component ready");
    fetchQuote();
    fetchImageList();
  }, []);

  return (
    <div className="App">
      {showLoading === true && (
        <div className="polaroid-icon-spin">
          {" "}
          <img src={IconSpin} />{" "}
        </div>
      )}
      {showLoading === false && (
        <Polaroid
          quote={quote}
          author={author}
          hashtags={tags}
          photo={
            imageList.length > 0 &&
            `https://picsum.photos/id/${imageList[counter].id}/469/497`
          }
          backgroundClass={arrayClassBg[countBg]}
        />
      )}
      <div className="app-icons">
        <img
          src={IconRefresh}
          className="app-icon-refresh"
          onClick={fetchQuote}
        />
        <Toaster position="bottom-center" />
        <img src={IconCopy} className="app-icon-copy" onClick={copyText}></img>
        <img src={IconShare} className="app-icon-share" onClick={shareText} />
        <img
          src={IconNewPhoto}
          className="app-icon-new-photo"
          onClick={changePhoto}
        />
        <img
          src={IconChangeBg}
          className="app-icon-change-bg"
          onClick={arrayChangeBg}
        />
      </div>
    </div>
  );
}

export default App;
