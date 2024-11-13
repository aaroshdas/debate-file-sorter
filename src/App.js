import React from 'react';

import Login from './Login';
import Home from './Home';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </Router>
  );
}
export default App;