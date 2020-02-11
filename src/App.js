import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import findAllSolutions from './solver.js';
import Board from './Board.js';
import GuessInput from './GuessInput.js';
import FoundSolutions from './FoundSolutions.js';
import ToggleGameState from './ToggleGameState.js';
import './App.css';
import {GAME_STATE} from './game_state_enum.js';
import {CHALLENGES} from './challenge_enum.js'
import {RandomGrid} from './random_grid.js';
import {ChallengeBoards} from './ChallengeBoards.js'
import ShowInfo from './ShowInfo.js';

//Raymond, José and True helped me with my code for this assignment :)

function App() {
//   const firebase = require("firebase");
// // Required for side-effects
//   require("firebase/firestore");


  var allChallengeBoards =  ChallengeBoards();
  const [allSolutions, setAllSolutions] = useState([]);
  const [foundSolutions, setFoundSolutions] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE);
  const [grid, setGrid] = useState([]);
  const [challenge, setChallenge] = useState(CHALLENGES.GAME_1);


  // useEffect will trigger when the array items in the second argument are
  // updated so whenever grid is updated, we will recompute the solutions
  useEffect(() => {
    const wordList = require('./full-wordlist.json');
    let tmpAllSolutions = findAllSolutions(grid, wordList.words);
    setAllSolutions(tmpAllSolutions);
  }, [grid]);

  // This will run when gameState changes.
  // When a new game is started, generate a new random grid and reset solutions
  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      setGrid(RandomGrid());
      setFoundSolutions([]);
    }
    else if (gameState === GAME_STATE.CHALLENGE_MODE) {
      if(challenge === CHALLENGES.GAME_1){
        setGrid(allChallengeBoards[0]);
      }
      else if(challenge === CHALLENGES.GAME_2){
        setGrid(allChallengeBoards[1]);
      }
      setFoundSolutions([]);
    }
  }, [gameState, challenge]);


  function correctAnswerFound(answer) {
    console.log("New correct answer:" + answer);
    setFoundSolutions([...foundSolutions, answer]);
  }

  return (
    <div className="App">
      <ToggleGameState gameState={gameState}
                       setGameState={(state) => setGameState(state)}
                       challenge={challenge} 
                       setChallenge={(challenge) => setChallenge(challenge)}/>
      <br></br>
      { gameState === GAME_STATE.IN_PROGRESS &&
        <div>
          <header className="App-header">
  
        <br></br>
          <img src={require("./bogglepic.png")} className="App-logo" alt="logo" />
          <br></br>
          <br></br>
          <Board board={grid} />
          <br></br>
          <GuessInput allSolutions={allSolutions}
                      foundSolutions={foundSolutions}
                      correctAnswerCallback={(answer) => correctAnswerFound(answer)}/>
          <FoundSolutions headerText="Solutions you've found" words={foundSolutions}/>
          </header>
        </div>
      }
      <br></br>
      { gameState === GAME_STATE.CHALLENGE&&
        <div>
          <Board board={grid} />
          <GuessInput allSolutions={allSolutions}
                      foundSolutions={foundSolutions}
                      correctAnswerCallback={(answer) => correctAnswerFound(answer)}/>
          <FoundSolutions headerText="Solutions you've found" words={foundSolutions} />
        </div>
      }
      { gameState === GAME_STATE.ENDED &&
        <div>
          <header className="App-header">
      
        <br></br>
          <img src={require("./bogglepic.png")} className="App-logo" alt="logo" />
          <br></br>
          <Board board={grid} />
          <FoundSolutions headerText="All possible solutions" words={allSolutions} />
          </header>
        </div>
      }
    </div>
  );
}

export default App;
