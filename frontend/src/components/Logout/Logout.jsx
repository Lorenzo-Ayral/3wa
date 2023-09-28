import {useDispatch} from "react-redux";
import {logout} from "../../api/api.js";
import {logoutSuccess} from "../../redux/auth/authSlice.js";

const LogoutForm = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await logout();

            if (response.status === 200) {
                dispatch(logoutSuccess())
            } else {
                console.error('Échec de la déconnexion');
            }
        } catch (error) {
            console.error('Erreur inattendue', error);
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Déconnexion</button>
        </div>
    );
};

export default LogoutForm;
