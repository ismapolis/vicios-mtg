import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import RegisterMatch from "./pages/registerMatch/RegisterMatch";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register-match" element={<RegisterMatch />} />
      </Routes>
    </Router>
  );
}
