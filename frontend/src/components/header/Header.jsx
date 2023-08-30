import { Link } from 'react-router-dom';
import BurgerMenu from "./BurgerMenu";
import "./header.scss"

function Header() {
    return (
        <header>
            <nav>
                <BurgerMenu />
                <ul>
                    <li>
                        <Link to="/">Accueil</Link>
                    </li>
                    <li>
                        <Link to="/about">À propos</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
