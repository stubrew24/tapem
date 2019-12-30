import { colors } from "./Constants";

const initialState = {
  pattern: [],
  userPattern: [],
  current: null,
  count: 0,
  playing: false,
  gameStarted: false,
  gameOver: false,
  score: 0,
  time: 300
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
      let time;
      if (state.time >= 150) time = state.time - 10;
      if (arrayCompare(actual, expected)) {
        if (actual.length === state.pattern.length)
          return {
            ...state,
            score: actual.length,
            playing: true,
            pattern: [...state.pattern, randomColor()],
            time
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

export { reducer, initialState };
