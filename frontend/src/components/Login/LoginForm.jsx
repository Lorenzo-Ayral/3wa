import {useState} from 'react';
import { Navigate } from 'react-router-dom';
import {authenticate} from "../../api/api.js";
import { useDispatch } from 'react-redux';
import {loginSuccess} from "../../redux/auth/authSlice.js";
import styles from '../../css/components/Login/LoginForm.module.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [redirectToProfile, setRedirectToProfile] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const credentials = {
                username: formData.username,
                password: formData.password,
            };
            const token = await authenticate(credentials);
            localStorage.setItem('jwtToken', token);
            dispatch(loginSuccess())
            setRedirectToProfile(true);
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            return alert("Erreur lors de la connexion");
        }
    };

    return (
        <div className={styles["form"]}>
            <h1>Se connecter</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
            {redirectToProfile && <Navigate to="/profil"/>}
        </div>
    );
};

export default LoginForm;
