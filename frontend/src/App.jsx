import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import '../src/css/App.css';
import {HomePage} from './pages/HomePage';
import Header from "./components/Header/Header";
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginForm from "./components/Login/LoginForm";
import ProfilePage from "./pages/ProfilePage";
import {useSelector} from 'react-redux';
import CreateUserPage from "./pages/CreateUserPage.jsx";

function App() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/contact" element={<ContactPage/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/profil" element={isAuthenticated ? <ProfilePage/> : <Navigate to="/login"/>}/>
                <Route path="/inscription" element={<CreateUserPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
