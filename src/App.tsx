import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import OompaLoompaList from './views/OompaLoompaList/OompaLoompaList';
import OompaLoompaDetails from './views/OompaLoompaDetails/OompaLoompaDetails';
import OompaLoompaLogo from './assets/img/logo-umpa-loompa.png';

function App() {
  return (
    <Router>
      <div className="h-screen">
        <nav className="flex items-center h-16 px-2 bg-slate-400">
          <Link to="/">
            <img src={OompaLoompaLogo} alt="Oompa Loompa Logo" className="h-10 mx-6 cursor-pointer" />
          </Link>
          <span className="font-bold text-lg">Oompa Loompa's Crew</span>
        </nav>
        <Routes>
          <Route path="/" element={<OompaLoompaList />} />
          <Route path="/oompaLoompa/:id" element={<OompaLoompaDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
