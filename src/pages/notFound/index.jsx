import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/button.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>404</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Page Not Found</p>
      <button onClick={() => navigate(-1)} className="button-primary-style">
        Go Back
      </button>
    </div>
  );
};

export default NotFoundPage;
