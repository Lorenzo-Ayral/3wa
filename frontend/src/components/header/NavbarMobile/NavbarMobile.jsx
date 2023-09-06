import React, { useState } from "react";
import styles from '../../../css/components/header/NavbarMobile/NavbarMobile.module.css';

const NavbarMobile = () => {
    const [burger_class, setBurgerClass] = useState(`${styles["burger-bar"]} ${styles["unclicked"]}`);
    const [menu_class, setMenuClass] = useState(`${styles.menu} ${styles.hidden}`);
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass(`${styles["burger-bar"]} clicked`);
            setMenuClass(`${styles.menu} visible`);
        } else {
            setBurgerClass(`${styles["burger-bar"]} unclicked`);
            setMenuClass(`${styles.menu} hidden`);
        }
        setIsMenuClicked(!isMenuClicked);
    }

    return (
        <div className={`navbar-mobile ${styles["navbar-mobile"]}`}>
            <nav>
                <div className={styles["burger-menu"]} onClick={updateMenu}>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                </div>
            </nav>

            <div className={menu_class}></div>
        </div>
    )
}

export default NavbarMobile;
