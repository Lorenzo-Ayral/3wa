import { FaBars } from 'react-icons/fa';
import styles from "./Burger.module.scss"

function Burger({open, setOpen}) {
    const toggleMenu = () => {
        setOpen(!open);
    }

    return (
        <div className={styles.burger}>
            <FaBars className="menu-icon" onClick={toggleMenu} />
        </div>
    );
}

export default Burger;
