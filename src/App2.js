import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import QrReader from "react-qr-reader";

function App() {
  const [result, setResult] = useState("");

  function handleScan(data) {
    if (data) {
      setResult(data);
    }
  }
  function handleError(err) {
    console.error(err);
  }

  return (
    <div className="App">
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>{result}</p>
    </div>
  );
}

export default App;
