import {Link} from 'react-router-dom';
import Burger from "./Burger/Burger";
import Menu from "./Menu/Menu";
import {useState} from "react";
import NavbarMobile from "./NavbarMobile/NavbarMobile.jsx";
import Navbar from "./Navbar/Navbar.jsx";
// import '../../css/App.css';

function Header() {
    const [open, setOpen] = useState(false);
    return (
        <header>
            {/*<div>*/}
            {/*    <Burger open={open} setOpen={setOpen}/>*/}
            {/*    <Menu open={open} setOpen={setOpen}/>*/}
            {/*</div>*/}
                <NavbarMobile/>
                <Navbar/>
        </header>
    );
}

export default Header;
