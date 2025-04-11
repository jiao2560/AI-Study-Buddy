import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import Signup from "./pages/signup"; // 👈 Import the Signup component
import Login from "./pages/Login";import NavBar from "./components/NavBar";

import DashPage from "./pages/DashPage";
import StudyMaterials from "./pages/StudyMaterials";
import StudyMaterialsPage from "./pages/StudyMaterials";
import StudyMaterialDetail from "./pages/StudyMaterialDetail";
import StudyMaterialForm from "./pages/StudyMaterialForm"; // for edit/create
import ProfilePage from "./pages/ProfilePage";
import AdminReports from "./pages/AdminReports"; // for admin

function App() {
  return (
    <BrowserRouter>
       <NavBar />
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashPage />} />
        <Route path="/study-materials" element={<StudyMaterials />} />
        <Route path="/study-materials" element={<StudyMaterialsPage />} />
        <Route path="/study-materials/:id" element={<StudyMaterialDetail />} />
        <Route
          path="/study-materials/:id/edit"
          element={<StudyMaterialForm />}
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
<Route path="/admin-reports" element={<AdminReports />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
