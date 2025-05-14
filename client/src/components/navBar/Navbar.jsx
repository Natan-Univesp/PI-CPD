import { useState } from "react";
import Navlist from "./Navlist";
import styles from "./Navbar.module.css";

//Icones
import { HiMenu as IconMenu} from "react-icons/hi";
import { FaHome as IconHome} from "react-icons/fa";
import { FaBoxesStacked as IconBox} from "react-icons/fa6";
import { BsFillPrinterFill as IconPrinter} from "react-icons/bs";
import { FaUser as IconUser} from "react-icons/fa";
import { TbLogout as IconLogout} from "react-icons/tb";
import { RiInkBottleLine as IconInk} from "react-icons/ri";
import { BiCategory as IconMarca } from "react-icons/bi";
import { BiSolidCylinder as IconCilindro} from "react-icons/bi";
import { MdAdminPanelSettings as IconAdmin } from "react-icons/md";
import { FaTools as IconManutencao } from "react-icons/fa";
import { useUser } from "../../Context/UserContext";
import { logoutService } from "../../services/user.service";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
    const {user} = useUser();
    const navigate = useNavigate();

    const navLinkCollection = [
        {
            id: 1,
            title: "Home", 
            path:"/", 
            subNav: ["/", "/viewRequest"], 
            icon:<IconHome className={styles.iconList}/>
        },
        {
            id: 2,
            title: "Suprimentos",
            icon: <IconBox className={styles.iconList}/>,
            subList: [
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
                    icon: <IconCilindro className={styles.iconList}/>},
                {
                    id: 5,
                    title: "Tintas", 
                    path: "/tintas", 
                    icon: <IconInk className={styles.iconList}/>
                },
                {
                    id: 6,
                    title: "Marcas",
                    path: "/marca",
                    icon: <IconMarca className={styles.iconList}/>
                },

            ]
        },
        // {
        //     id: 7,
        //     title: "Impressoras",
        //     icon: <IconPrinter className={styles.iconList}/>,
        //     subList: [
        //         {
        //             id: 8,
        //             title: "Geral", 
        //             path:"/impressora", 
        //             icon: <IconPrinter className={styles.iconList}/>
        //         },
        //         {
        //             id: 9,
        //             title: "Alocações", 
        //             path: "/alocacao", 
        //             icon: <IconPrinter className={styles.iconList}/>
        //         },
        //         {
        //             id: 10,
        //             title: "Manutenções", 
        //             path: "/manutencao", 
        //             icon: <IconManutencao className={styles.iconList}/>
        //         }
        //     ]
        // },
        {
            id: 11,
            title: "Administrador",
            path: "/admin",
            icon: <IconAdmin className={styles.iconList}/>
        }
    ]

    const [isActiveMenu, setIsActiveMenu] = useState(false);

    const handleCloseMenu = () => {
        if(isActiveMenu) {
            setIsActiveMenu(false);
        }
    }

    const handleLogout = async () => {
        try {
            await logoutService();
            navigate("/auth");
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        
        <header className={styles.navContainer}>              
            <section className={styles.navContent__logo}>
                <h1>CPD</h1>
            </section>
            <section className={`${styles.navContent__info} ${isActiveMenu ? styles.navContent__info__active : ""}`}>
                <Navlist listContent={navLinkCollection} handleCloseMenu={handleCloseMenu}/>
                {user?.user &&
                    <div className={styles.navContent__info__login}>
                        <div className={styles.info__login__user}>
                            <IconUser className={styles.login__user__icon}/>
                            <p className={styles.login__user__name}>{user?.user}</p>
                        </div>
                        <button className={styles.info__login__btn} onClick={handleLogout}>
                            <IconLogout className={styles.login__btn__icon}/>
                            Sair
                        </button>
                    </div>
                }
            </section>
            <button className={styles.navContent__menuBtn} onClick={() => setIsActiveMenu(prevValue => !prevValue)}>
                <IconMenu className={styles.menuBtn__icon}/>
            </button>
        </header>
    )
    
}