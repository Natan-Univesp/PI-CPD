import { TbBox as IconToner} from "react-icons/tb";
import { TbCylinder as IconCilindro} from "react-icons/tb";
import { RiInkBottleLine  as IconTinta} from "react-icons/ri";

import styles from './Atalhos.module.css';
import { useModal } from '../../Context/ModalContext';

export function Atalhos() {
    const { showModal } = useModal();

    const shortCutCollection = [
                            {
                                id: 1,
                                icon: <IconToner className={styles.atalhoIcon}/>, 
                                supplyType: "toner", 
                                text: "Consultar Toners"
                            },
                            {
                                id: 2,
                                icon: <IconCilindro className={styles.atalhoIcon}/>, 
                                supplyType: 'cilindro', 
                                text: "Consultar Cilindros"},
                            {
                                id: 3,
                                icon: <IconTinta className={styles.atalhoIcon}/>, 
                                supplyType: 'tinta', 
                                text: "Consultar Tintas"
                            }
                        ];


    return (
        <div className={styles.atalhoCollection}>
            {shortCutCollection.map((shortCut) => (
                <div key={shortCut.id} className={styles.atalhoContainer} onClick={() => showModal({modalName: "atalhoSupplySearch", data: {supplyType: shortCut.supplyType}})}>
                    {shortCut.icon}
                    <p>{shortCut.text}</p>
                </div>
            ))}
        </div>
    )
}