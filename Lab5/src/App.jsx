import React from 'react';
import Exercise1 from './components/Exercise1';
import Exercise2 from './components/Exercise2';
import Exercise3 from './components/Exercise3';
import Exercise4 from './components/Exercise4';

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '2rem' }}>Lab 5 Exercises</h1>

      <Exercise1 />
      <Exercise2 />
      <Exercise3 />
      <Exercise4 />

      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
        &copy; {new Date().getFullYear()} Lab 5 Solutions
      </footer>
    </div>
  );
}

export default App;
