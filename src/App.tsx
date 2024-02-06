import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import TimerPage from "./pages/TimesPage";
import SettingsPage from "./pages/Settings.page";
import AllTimerGroups from "./pages/AllTimerGroups";
const isElectron = typeof window !== "undefined";
const Router = isElectron ? HashRouter : BrowserRouter;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllTimerGroups />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/timer-groups/:id" element={<TimerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
