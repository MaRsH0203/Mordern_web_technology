import React from 'react';
import Overview from './components/Overview';
import Education from './components/Education';
import Experience from './components/Experience';
import './App.css';

function App() {
  return (
    <div className="container" style={{ maxWidth: '800px', margin: 'auto', padding: '15px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '28px', color: '#003366' }}>My Online Resume</h1>
      <Overview />
      <Education />
      <Experience />
    </div>
  );
}

export default App;