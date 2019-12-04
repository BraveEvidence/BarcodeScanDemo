import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import QrReader from "react-qr-reader";
import {
  BrowserMultiFormatReader,
  NotFoundException,
  BrowserQRCodeSvgWriter
} from "@zxing/library";

function App() {
  const [barcodeScan, setBarcodeScan] = useState("Pritish");

  const codeWriter = new BrowserQRCodeSvgWriter();
  const svgElement = codeWriter.write(barcodeScan, 300, 300);
  const svgHtml = svgElement.outerHTML;

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
                alert(result);
                codeReader.reset();
              }
              if (err && !(err instanceof NotFoundException)) {
                alert(err);
              }
            }
          );
          console.log(
            `Started continous decode from camera with id ${selectedDeviceId}`
          );
        }}
      >
        Click Me
      </button>

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: svgHtml }}
      ></div>
    </div>
  );
}

export default App;
