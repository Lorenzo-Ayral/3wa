import styles from "../../css/components/Banner/Banner.module.css"
import backgroundImage from "../../assets/raphael-sanzio-ecole-athenes-vatican-rome.webp"
import {useEffect, useState} from "react";

const Banner = () => {
    const [slide, setSlide] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setSlide(true);
        }, 1000);
    }, []);

    return (
        <div className={styles.banner} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1 className={slide ? styles.slide : ""}>
                RézoFilo
            </h1>
        </div>
    )
}

export default Banner;