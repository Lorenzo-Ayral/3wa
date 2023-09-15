import {Link} from "react-router-dom";
import styles from "../../../css/components/header/Navbar/Navbar.module.css";
import {useSelector} from "react-redux";

const Navbar = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link to="/" className={styles.navLink}>
                        Accueil
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link to="/about" className={styles.navLink}>
                        À propos
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link to="/contact" className={styles.navLink}>
                        Contact
                    </Link>
                </li>
                {isAuthenticated ? (
                    <li className={styles.navItem}>
                        <Link to="/profil" className={styles.navLink}>
                            Profil
                        </Link>
                    </li>
                ) : (
                    <li className={styles.navItem}>
                        <Link to="/login" className={styles.navLink}>
                            Connexion
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;