import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TimerPage from "./pages/TimesPage";
import SettingsPage from "./pages/Settings.page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TimerPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
