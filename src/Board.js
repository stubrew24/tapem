import React, { useReducer, useEffect } from "react";
import { colors } from "./Constants";
import Button from "./Button";
import { reducer, initialState } from "./reducer";

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
          // window.navigator.vibrate(100);
          dispatch({ type: "lightUp" });
        }, state.time);
        dispatch({ type: "lightOff" });
      }, state.time * 1.15);
      return () => clearTimeout(timer);
    }
  }, [state, state.playing, state.gameOver]);

  const handleClick = id => {
    if (!state.gameStarted || state.playing) return;
    window.navigator.vibrate(30);

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
      <h3 style={style.titles}>Score: {state.score}</h3>
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

// TODOS

// [ ] Refactor Code, Reducer, actiosn, etc
// [X] Speed up after x time
// [ ] iPhone 5 layout
// [ ] tap/click color actions
// [ ] Firebase/node/graphql backend?
