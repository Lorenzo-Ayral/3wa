import {useDispatch} from "react-redux";
import {logout} from "../../api/api.js";
import {logoutSuccess} from "../../redux/auth/authSlice.js";
import styles from "../../css/components/Header/Navbar/Navbar.module.css";
import logoutStyles from "../../css/components/Logout/Logout.module.css";


const Logout = () => {
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
            <button onClick={handleLogout} className={`${styles.navLink} ${logoutStyles.logout}`}>Déconnexion</button>
    );
};

export default Logout;
