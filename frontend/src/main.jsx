// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // 방금 만든 AuthProvider
import App from "./App";
import "./index.scss"; // 전역 스타일

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {" "}
        {/* 앱 전체를 AuthProvider로 감싸기 */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
