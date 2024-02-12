import React from "react";
import "./NotFound.css";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { allImages } from "../../../Util/Images";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound_main">
      <Container>
        <img src={allImages.notfound} alt="" />
        <h1>404</h1>
        <h3>Page Not Found</h3>
        <p>The page you are looking for is no longer available</p>
        <button onClick={() => navigate(-1)}>Return</button>
      </Container>
    </div>
  );
};

export default NotFound;
