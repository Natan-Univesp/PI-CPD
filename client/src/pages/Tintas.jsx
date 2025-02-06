import { useState } from "react";
import SubNav from "../components/subNav/SubNav";

//icones
import { BsBoxSeam as IconDisponivel} from "react-icons/bs";
import { PiHandWithdraw as IconRetirada} from "react-icons/pi";
import { LuPackageSearch as IconRequest} from "react-icons/lu";
import { TbDatabaseSearch as IconMoreRequest} from "react-icons/tb";
import MainLayout from "../components/layout/MainLayout";
import { Outlet } from "react-router-dom";


export default function Tintas() {
    const [title, setTitle] = useState("Tintas");
    const infoSubNav = [
        {
            link: "/tintas",
            text: "Informações de Tintas"
        },
        {
            link: "report",
            text: "Relatório de Tintas"
        }
    ]

    const infoBoxExtra = [{
        id: 1, 
        IconBox: IconDisponivel, 
        infoBox: "50", 
        titleBox: "Cilindros Disponíveis", 
        classInfo: "content__infoStatic"},
      {
        id: 2, 
        IconBox: IconRetirada, 
        infoBox: "10", 
        titleBox: "Cilindros retirados", 
        classInfo: "content__infoStatic"},
      {
        id: 3, 
        IconBox: IconRequest, 
        infoBox: "2", 
        titleBox: "Cilindros solicitados", 
        classInfo: "content__infoStatic"},
      {
        id: 4, 
        IconBox: IconMoreRequest, 
        infoBox: "R116", 
        titleBox: "Cilindros mais solicitado no Mês", 
        classInfo: "content__infoStatic"}];

    return(
        <>
            <SubNav navInfo={infoSubNav}/>
            <MainLayout title={title} infoExtraData={infoBoxExtra}>
                <Outlet context={{setTitle}}/>
            </MainLayout>
        </>
    )
}