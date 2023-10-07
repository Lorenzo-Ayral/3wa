import {Link} from "react-router-dom";
import styles from "../../../css/components/Header/NavbarMobile/NavbarMobile.module.css";
import {useSelector} from "react-redux";
import {useState} from "react";

const NavbarMobile = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isAdmin = useSelector((state) => state.auth.role);

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenMenu = () => {
        setIsOpen(true);
    };

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className={styles.navMobile}>
            <button className={styles.navBurgerButton} onClick={handleOpenMenu}>
               Ouvrir
            </button>
            <ul className={styles.navListMobile} style={{display: isOpen ? "block" : "none"}}>
                <li className={styles.navItemMobile}>
                    <Link to="/" className={styles.navLinkMobile}>
                        Accueil
                    </Link>
                </li>
                <li className={styles.navItemMobile}>
                    <Link to="/about" className={styles.navLinkMobile}>
                        À propos
                    </Link>
                </li>
                <li className={styles.navItemMobile}>
                    <Link to="/contact" className={styles.navLinkMobile}>
                        Contact
                    </Link>
                </li>
                {isAuthenticated ? (
                    <li className={styles.navItemMobile}>
                        <Link to="/profil" className={styles.navLinkMobile}>
                            Profil
                        </Link>
                    </li>
                ) : (
                    <>
                        <li className={styles.navItemMobile}>
                            <Link to="/login" className={styles.navLinkMobile}>
                                Connexion
                            </Link>
                        </li>
                        <li className={styles.navItemMobile}>
                            <Link to="/inscription" className={styles.navLinkMobile}>
                                Inscription
                            </Link>
                        </li>
                    </>
                )}
                {isAdmin === "ROLE_ADMIN" && (
                    <li className={styles.navItemMobile}>
                        <Link to="/admin" className={styles.navLinkMobile}>
                            Admin
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default NavbarMobile;
