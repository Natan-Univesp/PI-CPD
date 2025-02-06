import { Outlet } from "react-router-dom"
import SubNav from "../components/subNav/SubNav"

//icones
import { BsBoxSeam as IconDisponivel} from "react-icons/bs";
import { PiHandWithdraw as IconRetirada} from "react-icons/pi";
import { LuPackageSearch as IconRequest} from "react-icons/lu";
import { TbDatabaseSearch as IconMoreRequest} from "react-icons/tb";
import MainLayout from "../components/layout/MainLayout";
import { useState } from "react";

export default function Toner() {
    const [title, setTitle] = useState("Toners");

    const infoSubNav = [{
                            link: "/toner", 
                            text: "Informações de Toners"
                        },
                        {
                            link: "report", text: "Relatório de Toners"
                        }    
                    ];
    const infoBoxExtra = [{
                            id: 1, 
                            IconBox: IconDisponivel, 
                            infoBox: "50", 
                            titleBox: "Toners Disponíveis", 
                            classInfo: "content__infoStatic"},
                          {
                            id: 2, 
                            IconBox: IconRetirada, 
                            infoBox: "10", 
                            titleBox: "Toners retirados", 
                            classInfo: "content__infoStatic"},
                          {
                            id: 3, 
                            IconBox: IconRequest, 
                            infoBox: "2", 
                            titleBox: "Toners solicitados", 
                            classInfo: "content__infoStatic"},
                          {
                            id: 4, 
                            IconBox: IconMoreRequest, 
                            infoBox: "D111", 
                            titleBox: "Toner mais solicitado no Mês", 
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