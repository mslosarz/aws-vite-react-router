import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import {FIRST_PAGE, SECOND_PAGE, THIRD_PAGE} from './components/Links.js'
import './index.css'
import App from './App.jsx'
import Second from './pages/Second.jsx';
import First from './pages/First.jsx';
import Third from './pages/Third.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <nav style={{display: 'flex', gap: '1rem'}}>
                <Link to="/">Home</Link>
                <Link to={FIRST_PAGE}>First</Link>
                <Link to={SECOND_PAGE}>Second</Link>
                <Link to={THIRD_PAGE}>Third</Link>
            </nav>

            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path={FIRST_PAGE} element={<First/>}/>
                <Route path={SECOND_PAGE} element={<Second/>}/>
                <Route path={THIRD_PAGE} element={<Third/>}/>
                <Route path="/*" element={<h1>404</h1>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
