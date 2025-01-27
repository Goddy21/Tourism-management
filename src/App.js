import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import FrontDesk from "./components/FrontDesk";
import Reservations from "./components/Reservations";
import Tasks from "./components/Tasks";
import Accountant from "./components/Accountant";
import Statistics from "./components/Statistics";
import Login from "./components/Login"; 
import Signup from "./components/Signup"; 
import Layout from "./components/Layout"; 
import Transport from './components/Transport';
import Quotation from './components/Quotation';

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <Routes>
        {/* Routes for different pages with Layout as a wrapper */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/front-desk" element={<Layout><FrontDesk /></Layout>} />
        <Route path="/reservations" element={<Layout><Reservations /></Layout>} />
        <Route path="/transport" element={<Layout><Transport /></Layout>} />
        <Route path="/tasks" element={<Layout><Tasks /></Layout>} />
        <Route path="/accountant" element={<Layout><Accountant /></Layout>} />
        <Route path="/statistics" element={<Layout><Statistics /></Layout>} />
        <Route path="/quotation" element={<Layout><Quotation /></Layout>} />

        {/* Add routes for Login and Signup pages */}
        <Route path="/login" element={<Login />} />  {/* Route for Login */}
        <Route path="/signup" element={<Signup />} />  {/* Route for Signup */}
      </Routes>
    </Router>
  );
}

export default App;
