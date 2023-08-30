import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import styles from "./Burger.module.scss"

function Burger() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.burger}>
            <FaBars className="menu-icon" onClick={toggleMenu} />
            {isOpen && (
                <ul className="menu-items">
                    <li>
                        <a href="/">Accueil</a>
                    </li>
                    <li>
                        <a href="/about">À propos</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default Burger;
