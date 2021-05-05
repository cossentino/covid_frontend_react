import './styles/app.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Homepage from './pages/homepage';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Homepage />
      </Router>
    </div>
  );
}

export default App;
