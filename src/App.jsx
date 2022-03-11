import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import Counter from './components/Counter'

function App() {
  const [count, setCount] = useState(0)

  function updateCount(direction) {
    if (direction == 'up') {
      setCount(count => count + 1)
    }

    if (direction == 'down') {
      setCount(count => count - 1)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <Counter name="Deither"/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {' | '}
        <a
          className="App-link"
          href="https://vitejs.dev/guide/features.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vite Docs
        </a>
      </header>
    </div>
  )
}

export default App
