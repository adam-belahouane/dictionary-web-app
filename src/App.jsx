import { useState, useEffect } from "react";
import "./App.css";
import Logo from "./assets/images/logo.svg";
import ArrowDown from "./assets/images/icon-arrow-down.svg";
import Moon from "./assets/images/icon-moon.svg";
import Play from "./assets/images/icon-play.svg";
import ListItem from "./components/ListItem";

function App() {
  const [word, setWord] = useState("");
  const [font, setFont] = useState("sans-serif");
  const [isLight, setIsLight] = useState(true);
  const [wordData, setWordData] = useState(null);
  const [definitionData, setDefintionData] = useState(null)

  const fetchWord = async () => {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await res.json();
      setWordData(data[0]);
      fixData(data[0].meanings[0].definitions)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fixData = (array) => {
    let dataSet = []
    for(let i = 0; i < array.length; i++){
      dataSet.push(array[i].definition)
    }

    setDefintionData(dataSet)
  }

  useEffect(() => {
   
  }, [font]);
  return (
    <div className="App" style={{ fontFamily: `${font}` }}>
      <div className="first-div">
        <img src={Logo} alt="Logo" />
        <div className="font-darklight-con">
          <div className="font-dropdown">
            {font == "sans-serif" ? (
              <>Sans Serif</>
            ) : font == "serif" ? (
              <>Serif</>
            ) : (
              <>Mono</>
            )}
            <img className="arrowdown" src={ArrowDown} alt="Drop Down Arrow" />
            <div class="dropdown-content">
              <a
                onClick={() => setFont("sans-serif")}
                style={{ fontFamily: `sans-serif` }}
                href="#"
              >
                Sans Serif
              </a>
              <a
                onClick={() => setFont("serif")}
                style={{ fontFamily: `serif` }}
                href="#"
              >
                Serif
              </a>
              <a
                onClick={() => setFont("mono")}
                style={{ fontFamily: `mono` }}
                href="#"
              >
                Mono
              </a>
            </div>
          </div>
          <div className="darklight-con">
            <label class="switch">
              <input onClick={() => setIsLight(!isLight)} type="checkbox" />
              <span class="slider round"></span>
            </label>
            <img src={Moon} alt="Moon" />
          </div>
        </div>
      </div>
      <div className="searchbar">
        <input
          placeholder="Search for any word..."
          aria-label="Search-bar"
          aria-describedby="basic-addon2"
          className="searchbar-input"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              fetchWord();
            }
          }}
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          className="search-icon"
        >
          <path
            fill="none"
            stroke="#A445ED"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
          />
        </svg>
      </div>
      {wordData === null ? (
        <></>
      ) : (
        <>
          <div className="flex justbetween aligncenter ml-3 width">
            <div className="flex column aligncenter justbetween wordconheight">
              <div className="mainword">{wordData.word}</div>
              <div className="wordphon">{wordData.phonetic}</div>
            </div>

            <img className="playButton" src={Play} alt="Play Button" />
          </div>
          <div className="width flex aligncenter justbetween ml-1">
            <div className="noun">noun</div>
            <div className="grey-line"></div>
          </div>
          <div className="meaning">
            Meaning
          </div>
          <div>
            <ul className="nounlist">
            {definitionData && definitionData.map((definition) => 
            <li className="nounlistitem">{definition}</li>
            )}
            </ul>
          </div>
          <div className="width flex aligncenter justbetween ml-1">
            <div className="noun">verb</div>
            <div className="grey-line"></div>
          </div>
          <div className="meaning">
            Meaning
          </div>
        </>
      )}
    </div>
  );
}

export default App;
