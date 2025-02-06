import Navlist from "./Navlist";
import styles from "./Navbar.module.css";

//Icones
//Home
import { FaHome as IconHome} from "react-icons/fa";
//Toners
import { FaBoxesStacked as IconBox} from "react-icons/fa6";


//navBarMenu Responsive 
import { HiMenu as IconMenu} from "react-icons/hi";
import { useState } from "react";
//Ícone de Usuário
import { FaUser as IconUser} from "react-icons/fa";
//Ícone de Logout
import { TbLogout as IconLogout} from "react-icons/tb";
//Ícone de Tintas
import { RiInkBottleLine as IconInk} from "react-icons/ri";




export default function Navbar() {

    const navLinkCollection = [
        {
            id: 1,
            title: "Home", 
            path:"/", 
            subNav: ["/", "/viewRequest"], 
            icon:<IconHome className={styles.iconList}/>
        },
        {
            id: 3,
            title: "Toners",
            path: "/toner",
            icon: <IconBox className={styles.iconList}/>
        },
        {
            id: 4,
            title: "Cilindros", 
            path:"/cilindro", 
            icon:<IconBox className={styles.iconList}/>},
        {
            id: 5,
            title: "Tintas", 
            path: "/tintas", 
            icon: <IconInk className={styles.iconList}/>
        },
    ]

    const [isActiveMenu, setIsActiveMenu] = useState(false);

    const handleCloseMenu = () => {
        if(isActiveMenu) {
            setIsActiveMenu(false);
        }
    }
    
    return(
        
        <header className={styles.navContainer}>              
            <section className={styles.navContent__logo}>
                <h1>CPD</h1>
            </section>
            <section className={`${styles.navContent__info} ${isActiveMenu ? styles.navContent__info__active : ""}`}>
                <Navlist listContent={navLinkCollection} styles={styles} handleCloseMenu={handleCloseMenu}/>
                <div className={styles.navContent__info__login}>
                    <div className={styles.info__login__user}>
                        <IconUser className={styles.login__user__icon}/>
                        <p className={styles.login__user__name}>{"Nome de usuário"}</p>
                    </div>
                    <button className={styles.info__login__btn} onClick={() => console.log("clique")}>
                        <IconLogout className={styles.login__btn__icon}/>
                        Sair
                    </button>
                </div>
            </section>
            <button className={styles.navContent__menuBtn} onClick={() => setIsActiveMenu(prevValue => !prevValue)}>
                <IconMenu className={styles.menuBtn__icon}/>
            </button>
        </header>
    )
    
}