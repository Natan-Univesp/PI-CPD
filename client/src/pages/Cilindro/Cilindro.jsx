import { useState } from "react";
import { Outlet } from "react-router-dom";

//icones
import { BsBoxSeam as IconDisponivel } from "react-icons/bs";
import { PiHandWithdraw as IconRetirada } from "react-icons/pi";
import { LuPackageSearch as IconRequest } from "react-icons/lu";
import { TbDatabaseSearch as IconMoreRequest } from "react-icons/tb";

import MainLayout from "../../components/layout/MainLayout";
import { SubNav } from "../../components/SubNav/SubNav";

export default function Cilindro() {
   const [title, setTitle] = useState("Cilindros");

   const infoSubNav = [
      {
         link: "/cilindro",
         text: "Informações de Cilindros",
      },
      {
         link: "report",
         text: "Relatório de Cilindros",
      },
   ];
   const infoBoxExtra = [
      {
         id: 1,
         IconBox: IconDisponivel,
         infoBox: "50",
         titleBox: "Cilindros Disponíveis",
         classInfo: "content__infoStatic",
      },
      {
         id: 2,
         IconBox: IconRetirada,
         infoBox: "10",
         titleBox: "Cilindros retirados",
         classInfo: "content__infoStatic",
      },
      {
         id: 3,
         IconBox: IconRequest,
         infoBox: "2",
         titleBox: "Cilindros solicitados",
         classInfo: "content__infoStatic",
      },
      {
         id: 4,
         IconBox: IconMoreRequest,
         infoBox: "R116",
         titleBox: "Cilindros mais solicitado no Mês",
         classInfo: "content__infoStatic",
      },
   ];
   return (
      <>
         <SubNav navInfo={infoSubNav} />
         <MainLayout title={title} infoExtraData={infoBoxExtra}>
            <Outlet context={{ setTitle }} />
         </MainLayout>
      </>
   );
}
