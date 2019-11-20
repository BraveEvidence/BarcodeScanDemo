import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import QrReader from "react-qr-reader";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

function App() {
  return (
    <div className="App">
      <video
        id="video"
        width="300"
        height="200"
        style={{ border: "1px solid gray" }}
      ></video>

      <button
        onClick={() => {
          const codeReader = new BrowserMultiFormatReader();
          let selectedDeviceId;
          codeReader
            .listVideoInputDevices()
            .then(videoInputDevices => {
              selectedDeviceId = videoInputDevices[0].deviceId;
              console.log(`${selectedDeviceId}`);
            })
            .catch(err => console.error(err));
          codeReader.decodeFromVideoDevice(
            selectedDeviceId,
            "video",
            (result, err) => {
              if (result) {
                console.log(`${result} `);
              }
              if (err && !(err instanceof NotFoundException)) {
                console.error(err);
                document.getElementById("result").textContent = err;
              }
            }
          );
          console.log(
            `Started continous decode from camera with id ${selectedDeviceId}`
          );
          // codeReader
          //   .decodeFromVideoDevice(selectedDeviceId, "video")
          //   .then(result => console.log(result.text))
          //   .catch(err => console.error(err));
        }}
      >
        Click Me
      </button>
    </div>
  );
}

export default App;
