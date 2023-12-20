import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import store from "./Redux/store";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api/"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Provider store={store}> <App /> </Provider>);