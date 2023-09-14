import {useState} from 'react';
// import {Redirect} from 'react-router-dom';
import {authenticate} from "../../api/api.js";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [redirectToProfile, setRedirectToProfile] = useState(false);

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
            setRedirectToProfile(true);
            console.log(localStorage);
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
        }
    };

    return (
        <>
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
                    {errors.username && <div className="error">{errors.username}</div>}
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
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>
                <button type="submit">Se connecter</button>
            </form>
            {/*{redirectToProfile && <Redirect to="/profil"></Redirect>}*/}
        </>
    );
};

export default LoginForm;
