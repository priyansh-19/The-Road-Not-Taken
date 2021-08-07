
import React, { useState } from 'react';
import Board from './Components/Board.js';
import Tutorial from './Components/Tutorial.js';
// import Header from './Components/Header.js'  

function App() {
  const [open,setOpen] = useState(true);

  return (
    <div>
      <Board/>
    </div>
  );
}

export default App;
