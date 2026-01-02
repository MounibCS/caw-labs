import React, { useState } from 'react';

// 1. ClickMe Button
const ClickMeConfig = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="mb-4">
      <h3>1. Simple Click Button</h3>
      <button onClick={() => setClicked(true)}>ClickMe</button>
      {clicked && <p>Clicked</p>}
    </div>
  );
};

// 2. Toggle Button
const ToggleButton = () => {
  const [clickCount, setClickCount] = useState(0);


  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  const message = clickCount === 0 ? "" : (clickCount % 2 !== 0 ? "Clicked" : "Not Clicked");

  return (
    <div className="mb-4">
      <h3>2. Toggle Button</h3>
      <button onClick={handleClick}>Toggle Me</button>
      <p>{message}</p>
    </div>
  );
};

// 3. App with 3 buttons
const ButtonApp = () => {
  const [lastClicked, setLastClicked] = useState(null);

  return (
    <div className="mb-4">
      <h3>3. Multiple Buttons</h3>
      <div className="flex">
        {[1, 2, 3].map(i => (
          <button key={i} onClick={() => setLastClicked(i)}>Button{i}</button>
        ))}
      </div>
      {lastClicked && <p>Button #{lastClicked} was clicked</p>}
    </div>
  );
};

// 4. Counter
const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="mb-4">
      <h3>4. Counter</h3>
      <h1>{count}</h1>
      <div className="flex">
        <button onClick={() => setCount(c => c + 1)}>Inc</button>
        <button onClick={() => setCount(c => c - 1)}>Dec</button>
      </div>
    </div>
  );
};

export default function Exercise1() {
  return (
    <div className="card">
      <h2>Exercise 1</h2>
      <ClickMeConfig />
      <hr className="mb-4" style={{ borderColor: 'var(--border-color)' }} />
      <ToggleButton />
      <hr className="mb-4" style={{ borderColor: 'var(--border-color)' }} />
      <ButtonApp />
      <hr className="mb-4" style={{ borderColor: 'var(--border-color)' }} />
      <Counter />
    </div>
  );
}
