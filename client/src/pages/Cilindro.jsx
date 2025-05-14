import { Outlet } from "react-router-dom";
import SubNav from "../components/subNav/SubNav";

//icones
import { BsBoxSeam as IconDisponivel } from "react-icons/bs";
import { PiHandWithdraw as IconRetirada } from "react-icons/pi";
import { LuPackageSearch as IconRequest } from "react-icons/lu";
import { TbDatabaseSearch as IconMoreRequest } from "react-icons/tb";
import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { CilindroProvider } from "../Context/CilindroContext";
import { MarcaProvider } from "../Context/MarcaContext";
import { ModalProvider } from "../Context/ModalContext";
import { useInfoExtra } from "../Context/InfoExtraContext";
import { Loading } from "../components/Loading/Loading";

export default function Cilindro() {
   const [title, setTitle] = useState("Cilindros");
   const { cilindroStats, getAllCilindroPageStats } = useInfoExtra();

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
         infoBox: cilindroStats?.totalRegistered || <Loading/>,
         titleBox: "Cilindros Cadastrados",
         classInfo: "content__infoStatic",
      },
      {
         id: 2,
         IconBox: IconRetirada,
         infoBox: cilindroStats?.totalRetirada || <Loading/>,
         titleBox: "Cilindros retirados",
         classInfo: "content__infoStatic",
      },
      {
         id: 3,
         IconBox: IconRequest,
         infoBox: cilindroStats?.totalRequested || <Loading/>,
         titleBox: "Cilindros solicitados",
         classInfo: "content__infoStatic",
      },
      {
         id: 4,
         IconBox: IconMoreRequest,
         infoBox: cilindroStats?.mostRequested || <Loading/>,
         titleBox: "Cilindro mais solicitado no Mês",
         classInfo: "content__infoStatic",
      },
   ];

   const initStats = async () => {
      try {
         await getAllCilindroPageStats();
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      initStats();
   }, []);


   return (
      <MarcaProvider>
        <CilindroProvider>
           <ModalProvider>
              <SubNav navInfo={infoSubNav} />
              <MainLayout title={title} infoExtraData={infoBoxExtra}>
                 <Outlet context={{ setTitle }} />
              </MainLayout>
           </ModalProvider>
        </CilindroProvider>
      </MarcaProvider>
   );
}
