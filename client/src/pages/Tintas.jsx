import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

//Components
import SubNav from "../components/subNav/SubNav";
import MainLayout from "../components/layout/MainLayout";

//Context
import { TintaProvider } from "../Context/TintaContext";
import { MarcaProvider } from "../Context/MarcaContext";

//icones
import { BsBoxSeam as IconDisponivel } from "react-icons/bs";
import { PiHandWithdraw as IconRetirada } from "react-icons/pi";
import { LuPackageSearch as IconRequest } from "react-icons/lu";
import { TbDatabaseSearch as IconMoreRequest } from "react-icons/tb";
import { ModalProvider } from "../Context/ModalContext";
import { useInfoExtra } from "../Context/InfoExtraContext";
import { Loading } from "../components/Loading/Loading";

export default function Tintas() {
   const [title, setTitle] = useState("Tintas");
   const { tintaStats, getAllTintaPageStats } = useInfoExtra();
   const infoSubNav = [
      {
         link: "/tintas",
         text: "Informações de Tintas",
      },
      {
         link: "report",
         text: "Relatório de Tintas",
      },
   ];

   const infoBoxExtra = [
      {
         id: 1,
         IconBox: IconDisponivel,
         infoBox: tintaStats?.totalRegistered || <Loading/>,
         titleBox: "Tintas Cadastradas",
         classInfo: "content__infoStatic",
      },
      {
         id: 2,
         IconBox: IconRetirada,
         infoBox: tintaStats?.totalRetirada || <Loading/>,
         titleBox: "Tintas retiradas",
         classInfo: "content__infoStatic",
      },
      {
         id: 3,
         IconBox: IconRequest,
         infoBox: tintaStats?.totalRequested || <Loading/>,
         titleBox: "Tintas solicitadas",
         classInfo: "content__infoStatic",
      },
      {
         id: 4,
         IconBox: IconMoreRequest,
         infoBox: tintaStats?.mostRequested || <Loading/>,
         titleBox: "Tinta mais solicitada no Mês",
         classInfo: "content__infoStatic",
      },
   ];

   const initStats = async () => {
      try {
         await getAllTintaPageStats();
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      initStats();
   }, []);


   return (
      <MarcaProvider>
         <TintaProvider>
            <ModalProvider>
               <SubNav navInfo={infoSubNav} />
               <MainLayout title={title} infoExtraData={infoBoxExtra}>
                  <Outlet context={{ setTitle }} />
               </MainLayout>
            </ModalProvider>
         </TintaProvider>
      </MarcaProvider>
   );
}
