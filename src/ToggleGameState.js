import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {GAME_STATE} from './game_state_enum.js';
import './ToggleGameState.css';
import LoginButton from './LoginButton.js';
import {CHALLENGES} from './challenge_enum.js';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import firebase from 'firebase';


function ToggleGameState({gameState, setGameState, challenge, setChallenge}) {

  const [buttonText, setButtonText] = useState("Start a new game!");
  const [user, setUser] = useState(null);

  function updateGameState(challengeSetting, challenge) {
    if (challengeSetting && (gameState === GAME_STATE.IN_PROGRESS) ) {
      //do nothing
    }
    else if (challengeSetting && (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) ) {
      if(challenge === CHALLENGES.GAME_1){
        setChallenge(CHALLENGES.GAME_1);
      }
      else if(challenge === CHALLENGES.GAME_2){
        setChallenge(CHALLENGES.GAME_2);
      }
      setGameState(GAME_STATE.CHALLENGE);
      setButtonText("End game");
    }
    else if ( !(challengeSetting) && (gameState === GAME_STATE.BEFORE )  ) {
      setGameState(GAME_STATE.IN_PROGRESS);
      setButtonText("End game");
    }
    else if ( !(challengeSetting) && (gameState === GAME_STATE.CHALLENGE) ) {
        setGameState(GAME_STATE.ENDED);
      setButtonText("Start a new game!");
    }
    else if ( gameState === GAME_STATE.ENDED || gameState === GAME_STATE.IN_PROGRESS ) {
      setGameState(GAME_STATE.BEFORE);
      setButtonText("Start a new game!");
    }
    if (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) {
      setGameState(GAME_STATE.IN_PROGRESS);
      setButtonText("End game");
    } else if (gameState === GAME_STATE.IN_PROGRESS) {
      setGameState(GAME_STATE.ENDED);
      setButtonText("Start a new game!");
    }
  }

  function ChallengesDropdown() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    

    return (
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
          Pick a Challenge!
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
          <MenuItem onClick={() => updateGameState(true, CHALLENGES.GAME_1)} >Challenge 1 | Highscore: 7</MenuItem>
          <MenuItem onClick={() => updateGameState(true, CHALLENGES.GAME_2)} >Challenge 2 | Highscore: 25</MenuItem>
        </Menu>
      </div>
    );
  }

  return (
    <div className="Toggle-game-state">
      <LoginButton setUser={(user) => setUser(user)} />
            {user != null &&
	        <p>Welcome, {user.displayName} ({user.email})</p> 
        }
        <br></br>
      <Button variant = 'contained' onClick={() => updateGameState()} >
        {buttonText}
      </Button>
      <ChallengesDropdown/>
    </div>
  );
}

export default ToggleGameState;
