import {Link} from 'react-router-dom';
import Burger from "./Burger/Burger.jsx";
import Menu from "./Menu/Menu.jsx";

function Header() {
    return (
        <header>
            <nav>
                <Burger/>
                <Menu/>
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
