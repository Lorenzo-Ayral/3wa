import styles from "../../css/components/Footer/Footer.module.css";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
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
        </footer>
    )
}

export default Footer;