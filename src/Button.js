import React, { useState } from "react";

const style = {
  width: "10rem",
  height: "10rem",
  display: "block",
  float: "left",
  margin: "0.5rem",
  borderRadius: "20%"
};

const Button = ({ id, color, handleClick, light }) => {
  const [lightUp, setLightUp] = useState(null);
  return (
    <div
      style={{ ...style, backgroundColor: lightUp || color }}
      onClick={() => handleClick(id)}
      onTouchStart={() => setLightUp(light)}
      onTouchEnd={() => setLightUp(null)}
    ></div>
  );
};

export default Button;
