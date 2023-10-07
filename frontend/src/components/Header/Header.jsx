import {useState} from "react";
import NavbarMobile from "./NavbarMobile/NavbarMobile.jsx";
import Navbar from "./Navbar/Navbar.jsx";

function Header() {
    const [open, setOpen] = useState(false);
    return (
        <header>
                <NavbarMobile/>
                <Navbar/>
        </header>
    );
}

export default Header;
