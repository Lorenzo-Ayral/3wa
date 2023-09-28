import {logout} from "../../api/api.js";
import {Navigate, useNavigate} from "react-router-dom";
import {useState} from "react";

const LogoutForm = () => {
    const [logoutSuccess, setLogoutSuccess] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await logout();
            console.log('Réponse du serveur :', response)

            if (response.status === 200) {
                setLogoutSuccess(true);
            } else {
                console.error('Échec de la déconnexion!!!');
            }
        } catch (error) {
            console.error('Erreur inattendue', error);
        }
    };

    if (logoutSuccess) {
        return <Navigate to={'/'} />;
    }

    return (
        <div>
            <button onClick={handleLogout}>Déconnexion</button>
        </div>
    );
};

export default LogoutForm;
