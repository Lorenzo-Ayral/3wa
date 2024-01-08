import {Link} from "react-router-dom";
import styles from "../../../css/components/Header/Navbar/Navbar.module.css";
import {useSelector} from "react-redux";
import logo from "../../../assets/RésoPhilo.webp";
import Logout from "../../Logout/Logout.jsx";

const Navbar = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isAdmin = useSelector((state) => state.auth.role);

    return (
        <header>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link to="/" className={styles.navLink}>
                            <img src={logo} alt="RésoPhilo" style={{width: "70px"}}/>
                        </Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li className={styles.navItem}>
                                <Link to="/profil" className={styles.navLink}>
                                    Profil
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Logout/>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={styles.navItem}>
                                <Link to="/login" className={styles.navLink}>
                                    Connexion
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link to="/inscription" className={styles.navLink}>
                                    Inscription
                                </Link>
                            </li>
                        </>
                    )}
                    {isAdmin === "ROLE_ADMIN" && (
                        <li className={styles.navItem}>
                            <Link to="/admin" className={styles.navLink}>
                                Admin
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;