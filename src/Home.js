import { Link } from "react-router-dom";
   /* eslint-env jquery */

   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import App from './App';
   import reportWebVitals from './reportWebVitals';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/">About</Link>
      </nav>
    </div>
  );
}