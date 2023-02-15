import { useState } from "react";
import "./App.css";
import Logo from "./assets/images/logo.svg";
import ArrowDown from "./assets/images/icon-arrow-down.svg";
import Moon from "./assets/images/icon-moon.svg"

function App() {
  const [word, setWord] = useState("");
  const [font, setFont] = useState("sans-serif");
  const [isLight, setIsLight] = useState(true)

  const fetchWord = async () => {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App" style={{fontFamily: `${font}`}}>
      <div className="first-div">
        <img src={Logo} alt="Logo" />
        <div className="font-darklight-con">
          <div className="font-dropdown">
            {
              font == "sans-serif"?<>Sans Serif</>:font == "serif"?<>Serif</>:<>Mono</>
            }
           <img className="arrowdown" src={ArrowDown} alt="Drop Down Arrow" />
          </div>
          <div className="darklight-con">
            <label class="switch">
              <input onClick={() => setIsLight(!isLight)} type="checkbox" />
              <span class="slider round"></span>
            </label>
            <img src={Moon} alt="Moon"/>
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
    </div>
  );
}

export default App;
