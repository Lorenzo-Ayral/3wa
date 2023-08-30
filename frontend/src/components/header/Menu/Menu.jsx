import style from './Menu.module.scss';

const Menu = ({ open }) => {
    const menuClassName = open ? style.openMenu : style.menu;

    return (
        <div className={menuClassName}>
            <nav>
                <a href="/">
                    <span role="img" aria-label="about us">&#x1f481;&#x1f3fb;&#x200d;&#x2642;&#xfe0f;</span>
                    About us
                </a>
                <a href="/">
                    <span role="img" aria-label="price">&#x1f4b8;</span>
                    Pricing
                </a>
                <a href="/">
                    <span role="img" aria-label="contact">&#x1f4e9;</span>
                    Contact
                </a>
            </nav>
        </div>
    )
}

export default Menu;
