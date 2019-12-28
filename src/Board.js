import React, { useReducer, useEffect } from "react";
import { colors } from "./Constants";
import Button from "./Button";

const initialState = {
  pattern: [],
  userPattern: [],
  current: null,
  count: 0,
  playing: false,
  gameStarted: false,
  gameOver: false,
  score: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "startGame":
      return {
        ...initialState,
        playing: true,
        gameStarted: true,
        pattern: [randomColor()]
      };

    case "colorClick":
      const actual = [...state.userPattern, action.payload];
      const expected = state.pattern.slice(0, actual.length);
      if (arrayCompare(actual, expected)) {
        if (actual.length === state.pattern.length)
          return {
            ...state,
            score: actual.length,
            playing: true,
            pattern: [...state.pattern, randomColor()]
          };
        return {
          ...state,
          userPattern: actual
        };
      } else {
        return { ...state, gameOver: true, gameStarted: false };
      }

    case "lightUp":
      if (state.count < state.pattern.length) {
        return {
          ...state,
          current: state.pattern[state.count],
          count: state.count + 1
        };
      } else {
        return {
          ...state,
          current: null,
          count: 0,
          playing: false,
          userPattern: []
        };
      }
    case "lightOff":
      return { ...state, current: null };
    default:
      return state;
  }
};

const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)].id;
};

const arrayCompare = (a, b) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

const Board = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const style = {
    board: {
      margin: "2rem auto",
      width: "22rem",
      height: "22rem",
      display: "block"
    },
    startButton: {
      padding: "1rem",
      backgroundColor: "#bbb",
      borderRadius: "1rem",
      fontSize: "1.5rem",
      display: state.gameStarted ? "none" : "block",
      margin: "0rem auto"
    },
    titles: {
      color: "#bbb",
      fontWeight: "800"
    }
  };

  useEffect(() => {
    if (state.playing && !state.gameOver) {
      const timer = setTimeout(() => {
        setTimeout(() => {
          dispatch({ type: "lightUp" });
        }, 300);
        dispatch({ type: "lightOff" });
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [state, state.playing, state.gameOver]);

  const handleClick = id => {
    if (!state.gameStarted || state.playing) return;
    dispatch({ type: "colorClick", payload: id });
    console.log("testing");
  };

  const startGame = () => {
    dispatch({ type: "startGame" });
  };

  return (
    <>
      <h1 style={style.titles}>TAP 'EM</h1>
      <h2 style={style.titles}> &nbsp; {state.gameOver && "Game Over!"} </h2>
      <h2 style={style.titles}>Score: {state.score}</h2>
      <div style={style.board}>
        {colors.map(color => (
          <Button
            key={color.id}
            id={color.id}
            color={color.id === state.current ? color.bright : color.dim}
            light={color.bright}
            handleClick={handleClick}
          />
        ))}
      </div>
      <button onClick={startGame} style={style.startButton}>
        New Game
      </button>
    </>
  );
};

export default Board;
