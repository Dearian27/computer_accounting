import { useState } from 'react'
import './App.css'

function App() {
  const [expand, setExpand] = useState(false);

  return (
    <div>
      121
      <button  onClick={() => setExpand(!expand)}>Button</button>
      {expand &&
      <div>
        expanded
      </div>
      }
    </div>
  )
}

export default App
