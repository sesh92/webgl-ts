import React, { useState, useEffect } from 'react';

import WebGL from '../WebGL';
import './index.scss';
import { GAME_STATE } from '../types';

export default () => {
  const [time, setTime] = useState(new Date().getTime());
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [bestScore, setBestScore] = useState(0);
  const [tryCounter, setTryCounter] = useState(0);
  const [GameState, setGameState] = useState<GAME_STATE>('Awake');
  const showScore = () => ((time - startTime) / 1000).toFixed(0);

  useEffect(() => {
    const newScore = +(Math.abs(time - startTime) / 1000).toFixed(0);
    if (GameState === 'GameOver' && newScore > bestScore) {
      setBestScore(newScore);
    }
  }, [GameState]);

  let page;
  switch (GameState) {
    case 'Awake':
      page = (
        <div className="wrapper">
          <button
            onClick={() => {
              setTime(new Date().getTime());
              setStartTime(new Date().getTime());
              setGameState('Game');
            }}
          >
            Start
          </button>
        </div>
      );
      break;
    case 'Game':
      page = (
        <div className="wrapper">
          <div className="interface">{showScore()}</div>
          <WebGL
            tryCounter={tryCounter}
            time={time}
            setTime={setTime}
            setGameState={setGameState}
            height={window.innerHeight}
            width={window.innerWidth}
          />
        </div>
      );
      break;
    case 'GameOver':
      page = (
        <div className="wrapper">
          GAME OVER
          <br />
          Best score: {bestScore}
          <br />
          <button
            onClick={() => {
              setStartTime(new Date().getTime());
              setTime(new Date().getTime());
              setTryCounter(tryCounter + 1);
              setGameState('Game');
            }}
          >
            Start
          </button>
        </div>
      );
      break;
  }
  return page;
};
