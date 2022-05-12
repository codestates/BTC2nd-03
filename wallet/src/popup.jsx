import React from "react";
import { render } from "react-dom";

function Popup() {
  return (
    <div style={{ width: "330px", height: "650px", backgroundColor: "yellow" }}>
      <h1>Hello, world!</h1>
      <p>This is a simple popup.</p>
    </div>
  );
}

render(<Popup />, document.getElementById("react-target"));