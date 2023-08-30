import {Link} from 'react-router-dom';
import Burger from "./Burger/Burger";
import Menu from "./Menu/Menu";
import {useState} from "react";

function Header() {
    const [open, setOpen] = useState(false);
    return (
        <header>
            <div>
                <Burger open={open} setOpen={setOpen}/>
                <Menu open={open} setOpen={setOpen}/>
            </div>
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
        </header>
    );
}

export default Header;
