import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Invoice from './invoice.js';         // Updated import
import GoogleLogin from './components/login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleLogin />} />
        <Route path="/invoice" element={<Invoice />} />  {/* Use Invoice component */}
      </Routes>
    </Router>
  );
}

export default App;
