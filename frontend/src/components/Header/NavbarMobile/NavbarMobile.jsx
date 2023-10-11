import {Link} from "react-router-dom";
import styles from "../../../css/components/Header/NavbarMobile/NavbarMobile.module.css";
import {useSelector} from "react-redux";
import {useState} from "react";
import {GiHamburgerMenu} from "react-icons/gi";

const NavbarMobile = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isAdmin = useSelector((state) => state.auth.role);

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header>
            <nav>
                <button className={styles.navBurgerButton} onClick={handleOpenMenu}>
                    <GiHamburgerMenu/>
                </button>
                <ul className={styles.navListMobile} style={{display: isOpen ? "block" : "none"}}>
                    <li className={styles.navItemMobile}>
                        <Link to="/" className={styles.navLinkMobile} onClick={() => setIsOpen(false)}>
                            Accueil
                        </Link>
                    </li>
                    {isAuthenticated ? (
                        <li className={styles.navItemMobile}>
                            <Link to="/profil" className={styles.navLinkMobile} onClick={() => setIsOpen(false)}>
                                Profil
                            </Link>
                        </li>
                    ) : (
                        <>
                            <li className={styles.navItemMobile}>
                                <Link to="/login" className={styles.navLinkMobile} onClick={() => setIsOpen(false)}>
                                    Connexion
                                </Link>
                            </li>
                            <li className={styles.navItemMobile}>
                                <Link to="/inscription" className={styles.navLinkMobile}
                                      onClick={() => setIsOpen(false)}>
                                    Inscription
                                </Link>
                            </li>
                        </>
                    )}
                    {isAdmin === "ROLE_ADMIN" && (
                        <li className={styles.navItemMobile}>
                            <Link to="/admin" className={styles.navLinkMobile} onClick={() => setIsOpen(false)}>
                                Admin
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default NavbarMobile;
