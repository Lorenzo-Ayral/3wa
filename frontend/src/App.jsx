import {BrowserRouter, Route, Routes} from 'react-router-dom';
import '../src/css/App.css';
import {HomePage} from './pages/HomePage';
import Header from "./components/header/Header";
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { Provider } from 'react-redux';
import store from "./redux/store";
import LoginForm from "./components/Login/LoginForm";
import ProfilePage from "./pages/ProfilePage";

function App() {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route path="/about" element={<AboutPage/>} />
                    <Route path="/contact" element={<ContactPage/>} />
                    <Route path="/login" element={<LoginForm/>} />
                    <Route path="/profil" component={<ProfilePage/>} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}

export default App
