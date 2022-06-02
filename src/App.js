import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" exact element={<Users />} />
          <Route path="/places/new" exact element={<NewPlace />} />
          <Route path="/:userId/places" element={<UserPlaces />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
