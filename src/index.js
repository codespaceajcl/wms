import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { FullScreen, useFullScreenHandle } from "react-full-screen";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

// const handle = useFullScreenHandle();

root.render(<App />);
