import {useState} from 'react';
import {createUser} from "../../api/api.js";
import Moment from 'moment';
import {Navigate} from "react-router-dom";
import styles from "../../css/components/CreateUserForm/CreateUserForm.module.css";

function CreateUserForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dateOfBirth = Moment(birthDate).format('DD/MM/YYYY');
        const data = {username, email, firstName, lastName, dateOfBirth, password};

        const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$');
        const passwordRegex = new RegExp('^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};":,.<>\\/?]).{8,}$');

        if (!emailRegex.test(email)) {
            setErrorMessage('Veuillez entrer une adresse email valide');
            return;
        }

        if (!passwordRegex.test(password)) {
            setErrorMessage('Le mot de passe doit contenir au moins 8 caractères dont 1 caractère spécial');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas !');
            return;
        }

        try {
            await createUser(data);
            setRedirectToLogin(true);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage('Le nom d\'utilisateur ou l\'adresse email est déjà utilisé !');
            } else {
                console.error('Erreur lors de la création de l\'utilisateur:', error);
            }
        }
    };

    return (
        <div className={styles["form"]}>
            <h1>Créer mon profil</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        { }
                        Nom d'utilisateur :
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Adresse email :
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Prénom :
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Nom de famille :
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Date de naissance :
                        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Mot de passe :
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label>
                        Confirmer le mot de passe :
                        <input type="password" value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </label>
                </div>
                {errorMessage &&
                    <div>
                        <p className={styles["error"]}>{errorMessage}</p>
                    </div>
                }
                <button type="submit">Créer mon compte</button>
                {redirectToLogin && <Navigate to="/login"/>}
            </form>
        </div>
    );
}

export default CreateUserForm;
