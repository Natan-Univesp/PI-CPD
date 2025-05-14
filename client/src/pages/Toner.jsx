import { Outlet } from "react-router-dom";
import SubNav from "../components/subNav/SubNav";

//icones
import { BsBoxSeam as IconDisponivel } from "react-icons/bs";
import { PiHandWithdraw as IconRetirada } from "react-icons/pi";
import { LuPackageSearch as IconRequest } from "react-icons/lu";
import { TbDatabaseSearch as IconMoreRequest } from "react-icons/tb";
import MainLayout from "../components/layout/MainLayout";
import { useEffect, useState } from "react";
import { TonerProvider } from "../Context/TonerContext";
import { MarcaProvider } from "../Context/MarcaContext";
import { ModalProvider } from "../Context/ModalContext";
import { Loading } from "../components/Loading/Loading";
import { useInfoExtra } from "../Context/InfoExtraContext";

export default function Toner() {
   const [title, setTitle] = useState("Toners");
   const { tonerStats, getAllTonerPageStats } = useInfoExtra();

   const infoSubNav = [
      {
         link: "/toner",
         text: "Informações de Toners",
      },
      {
         link: "report",
         text: "Relatório de Toners",
      },
   ];
   const infoBoxExtra = [
      {
         id: 1,
         IconBox: IconDisponivel,
         infoBox: tonerStats?.totalRegistered || <Loading/>,
         titleBox: "Toners Cadastrados",
         classInfo: "content__infoStatic",
      },
      {
         id: 2,
         IconBox: IconRetirada,
         infoBox: tonerStats?.totalRetirada || <Loading/>,
         titleBox: "Toners retirados",
         classInfo: "content__infoStatic",
      },
      {
         id: 3,
         IconBox: IconRequest,
         infoBox: tonerStats?.totalRequested || <Loading/>,
         titleBox: "Toners solicitados",
         classInfo: "content__infoStatic",
      },
      {
         id: 4,
         IconBox: IconMoreRequest,
         infoBox: tonerStats?.mostRequested || <Loading/>,
         titleBox: "Toner mais solicitado no Mês",
         classInfo: "content__infoStatic",
      },
   ];

   const initStats = async () => {
      try {
         await getAllTonerPageStats();
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      initStats();
   }, []);

   return (
      <MarcaProvider>
         <TonerProvider>
            <ModalProvider>
               <SubNav navInfo={infoSubNav} />
               <MainLayout title={title} infoExtraData={infoBoxExtra}>
                  <Outlet context={{ setTitle }} />
               </MainLayout>
            </ModalProvider>
         </TonerProvider>
      </MarcaProvider>
   );
}
