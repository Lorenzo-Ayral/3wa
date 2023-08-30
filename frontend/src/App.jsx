import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.scss'
import {HomePage} from './pages/HomePage';
import Header from "./components/header/Header.jsx";
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {

    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route path="/about" element={<AboutPage/>} />
                    <Route path="/contact" element={<ContactPage/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
