import { useState, useEffect, createRef } from "react";
import "./App.css";
import Logo from "./assets/images/logo.svg";
import ArrowDown from "./assets/images/icon-arrow-down.svg";
import newwindow from "./assets/images/icon-new-window.svg";

function App() {
  const [word, setWord] = useState("");
  const [font, setFont] = useState("sans-serif");
  const [isLight, setIsLight] = useState(true);
  const [wordData, setWordData] = useState(null);
  const [definitionData, setDefintionData] = useState(null);
  const [synonyms, setSynonyms] = useState(null);
  const [verbs, setVerbs] = useState(null);
  const [audioSource, setAudioSource] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [is404, setIs404] = useState(false);
  const audioRef = createRef();

  const fetchWord = async () => {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (res.status === 404) {
        setIs404(true);
      }
      if (res.ok) {
        const data = await res.json();
        setIs404(false);
        setWordData(data[0]);
        fixData(data[0].meanings[0].definitions);
        setVerbs(data[0].meanings[1].definitions);
        setSynonyms(data[0].meanings[0].synonyms[0]);
        findAudioSource(data[0]);
      } else {
        setWordData(null);
        setAudioSource(null);
      }

      setIsEmpty(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const fixSynonyms = (array) => {
  //   if (array.length > 1) {
  //     const synonymList = array.join(", ");
  //     setSynonyms(synonymList);
  //   } else if (array.length === 1) {
  //     // Add a condition to handle arrays with a single element
  //     const wordList = array[0].join(", ");
  //     setSynonyms(wordList);
  //   } else {
  //     setSynonyms(null);
  //   }
  // };

  const handleMouseLeave = () => {
    if (clicked) {
      if (word === "") {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
      setClicked(false);
    }
  };

  const fixData = (array) => {
    const dataSet = [];
    for (let i = 0; i < array.length; i++) {
      dataSet.push(array[i].definition);
    }

    setDefintionData(dataSet);
  };

  const findAudioSource = (data) => {
    console.log(data.phonetics);
    for (let i = 0; i < data.phonetics.length; i++) {
      setAudioSource(null);
      if (data.phonetics[i] !== "") {
        setAudioSource(data.phonetics[i].audio);
      }
    }
  };

  useEffect(() => {
    handleMouseLeave();
  }, [word]);

  useEffect(() => {}, [font]);
  return (
    <body className={isLight ? "" : "dark"}>
      <div className="App" style={{ fontFamily: `${font}` }}>
        <div className="first-div">
          <img src={Logo} alt="Logo" />
          <div className="font-darklight-con">
            <div className="font-dropdown">
              {font === "sans-serif" ? (
                <>Sans Serif</>
              ) : font === "serif" ? (
                <>Serif</>
              ) : (
                <>Mono</>
              )}
              <img
                className="arrowdown"
                src={ArrowDown}
                alt="Drop Down Arrow"
              />
              <div class="dropdown-content">
                <div
                  onClick={() => setFont("sans-serif")}
                  style={{ fontFamily: `sans-serif` }}
                >
                  Sans Serif
                </div>
                <div
                  onClick={() => setFont("serif")}
                  style={{ fontFamily: `serif` }}
                >
                  Serif
                </div>
                <div
                  onClick={() => setFont("monospace")}
                  style={{ fontFamily: `monospace` }}
                >
                  Mono
                </div>
              </div>
            </div>
            <div className="darklight-con">
              <label className="switch">
                <input onClick={() => setIsLight(!isLight)} type="checkbox" />
                <span className="slider round"></span>
              </label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                className="moon"
              >
                <path
                  fill="none"
                  stroke={isLight ? "#757575" : "#a445ed"}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          onClick={() => setClicked(true)}
          onMouseLeave={handleMouseLeave}
          className={isEmpty ? "searchbar empty" : "searchbar"}
        >
          <input
            placeholder="Search for any word..."
            aria-label="Search-bar"
            aria-describedby="basic-addon2"
            className="searchbar-input"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
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
        {isEmpty ? (
          <div className="empty-text">Whoops, can't be empty...</div>
        ) : (
          <div></div>
        )}
        {wordData === null ? (
          is404 ? (
            <div className="not-found width flex aligncenter column">
              <div>No Definitions Found</div>
              <div>
                Sorry, we couldn't find definitions for the word you were
                looking for. You can try the search again at later time or head
                to the web instead.
              </div>
            </div>
          ) : (
            <></>
          )
        ) : (
          <>
            <div className="flex justbetween aligncenter ml-3 width">
              <div className="flex column aligncenter justbetween wordconheight">
                <div className="mainword">{wordData.word}</div>
                <div className="wordphon">{wordData.phonetic}</div>
              </div>
              <svg
              onClick={() => audioRef.current.play()}
              className="playButton"
                xmlns="http://www.w3.org/2000/svg"
                width="75"
                height="75"
                viewBox="0 0 75 75"
              >
                <g fill-rule="evenodd">
                  <circle className="circle" cx="37.5" cy="37.5" r="37.5" opacity=".25" />
                  <path d="M29 27v21l21-10.5z" />
                </g>
              </svg>
              {/* <img
                onClick={() => audioRef.current.play()}
                className="playButton"
                src={Play}
                alt="Play Button"
              /> */}
              <audio src={audioSource} ref={audioRef}></audio>
            </div>
            <div className="width flex aligncenter justbetween ml-1">
              <div className="noun">noun</div>
              <div className="grey-line"></div>
            </div>
            <div className="meaning">Meaning</div>
            <div className="width">
              {definitionData &&
                definitionData.map((definition) => (
                  <div className="flex nounlistitem">
                    <div className="point">&#x2022;</div>
                    <div>{definition}</div>
                  </div>
                ))}
            </div>
            {synonyms === null ? (
              <></>
            ) : (
              <div className="flex aligncenter width mb-3">
                <div className="synonyms">Synonyms</div>
                <div className="synonym">{synonyms}</div>
              </div>
            )}

            <div className="width flex aligncenter justbetween ml-1">
              <div className="noun">verb</div>
              <div className="grey-line"></div>
            </div>
            <div className="meaning">Meaning</div>
            <div className="width">
              {verbs &&
                verbs.map((verb) => (
                  <div className="flex nounlistitem">
                    <div className="point">&#x2022;</div>
                    <div>
                      <div className="verbdef mb-1">{verb.definition}</div>
                      {verb.example ? (
                        <div className="verbexample">{verb.example}</div>
                      ) : null}
                    </div>
                  </div>
                ))}
            </div>
            <div className="width sourcediv">
              <div>Source</div>
              <a href={wordData.sourceUrls[0]} className="flex link">
                <div className="source-link">{wordData.sourceUrls[0]} </div>
                <img
                  className="click"
                  src={newwindow}
                  alt="external link icon"
                />
              </a>
            </div>
          </>
        )}
      </div>
    </body>
  );
}

export default App;
