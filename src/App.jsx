import React, {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {FIRST_PAGE, SECOND_PAGE, THIRD_PAGE} from './components/Links.js';
import {useNavigate} from 'react-router-dom';

function App() {
    const [count, setCount] = useState(0)
    const navigate = useNavigate()

    const handleClick = (page) => {
        navigate(page);
    }

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <img src="/logo.svg" className="App-logo" alt="logo"/>
                    Example of navigation through the navigate callback:
                    <button type="button" onClick={() => handleClick(FIRST_PAGE)}>
                        {FIRST_PAGE}
                    </button>
                    <button type="button" onClick={() => handleClick(SECOND_PAGE)}>
                        {SECOND_PAGE}
                    </button>
                    <button type="button" onClick={() => handleClick(THIRD_PAGE)}>
                        {THIRD_PAGE}
                    </button>
                </header>
            </div>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
