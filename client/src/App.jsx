import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import Signup from "./pages/signup"; // 👈 Import the Signup component
import Login from "./pages/Login";
import DashPage from "./pages/DashPage";
import StudyMaterials from "./pages/StudyMaterials";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashPage />} />
        <Route path="/study-materials" element={<StudyMaterials />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
