import './App.css';
import React from "react";

import { Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Contact from './components/ContactUs';
import About from './components/AboutUs';
function App() {
  

  return (
   <div>

        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/about" element={ <About/> } />
          <Route path="/contact" element={ <Contact/> } />
        </Routes>

     
      
</div>
  
  );
}

export default App;
