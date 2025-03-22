//icones
import {FaUserCheck as IconUserActive} from "react-icons/fa";
import { FaUserGroup as IconAllUser} from "react-icons/fa6";
import MainLayout from "../../components/layout/MainLayout";
import { Outlet } from "react-router-dom";

export function Administrador() {

    const infoBoxExtra = [
        {
            id: 1,
            IconBox: IconAllUser,
            infoBox: "4",
            titleBox: "Todos os Usuários",
            classInfo: "content__infoStatic"
        },
        {
            id: 2,
            IconBox: IconUserActive,
            infoBox: "3",
            titleBox: "Usuários Ativos",
            classInfo: "content__infoStatic"
        }
    ]

    return(
        <MainLayout title={"Administrador"} infoExtraData={infoBoxExtra}>
            <Outlet/>
        </MainLayout>
    )
}