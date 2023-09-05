import { FaBars } from 'react-icons/fa';
import styles from "../../../css/components/header/Burger/Burger.module.css"

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
