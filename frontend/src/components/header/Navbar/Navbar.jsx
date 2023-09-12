import { Link } from "react-router-dom";
import styles from "../../../css/components/header/Navbar/Navbar.module.css";

const Navbar = () => {
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
            </ul>
        </nav>
    );
};

export default Navbar;