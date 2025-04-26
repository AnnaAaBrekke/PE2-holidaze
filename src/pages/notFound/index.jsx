import React from "react";
import { useNavigate } from "react-router-dom";

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
      <button
        onClick={() => navigate(-1)}
        className="bg-[#0F6474] text-[#E0F9F6] font-medium text-lg px-6 py-2 rounded shadow-md hover:bg-[#0d5665] focus:outline-none m-0.5"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFoundPage;
