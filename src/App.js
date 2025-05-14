import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Cover from './components/Cover';
import InvitationPage from './components/InvitationPage';

function App() {
  return (
    <Router>
       <AnimatePresence mode="wait"></AnimatePresence>
      <Routes>
        <Route path="/" element={<Cover />} />
        <Route path="/invitation" element={<InvitationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
