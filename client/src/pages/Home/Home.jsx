import { Outlet } from "react-router-dom";
import styles from "./Home.module.css";

//Icones do infoExtra;
import { BsBoxes as IconToners } from "react-icons/bs";
import { TbCylinder as IconCilindro } from "react-icons/tb";
import { RiInkBottleLine as IconTinta } from "react-icons/ri";
import { MdOutlinePendingActions as IconRequest } from "react-icons/md";

import SubNav from "../../components/subNav/SubNav";
import MainLayout from "../../components/layout/MainLayout";
import { useEffect, useState } from "react";
import { ModalProvider } from "../../Context/ModalContext";
import { Loading } from "../../components/Loading/Loading";
import { useInfoExtra } from "../../Context/InfoExtraContext";

export default function Home() {
   const [title, setTitle] = useState("Visão Geral");
   const { homeStats, getAllHomePageStats } = useInfoExtra();

   const infoSubNav = [
      { link: "/", text: "Cadastrar Solicitações" },
      { link: "viewRequest", text: "Visualizar Solicitações" },
   ];

   const infoBoxExtra = [
      {
         id: 1,
         IconBox: IconToners,
         infoBox: homeStats?.totalTonerRegistered || <Loading/>,
         titleBox: "Toners Disponíveis",
         classInfo: "content__infoStatic",
      },
      {
         id: 2,
         IconBox: IconCilindro,
         infoBox: homeStats?.totalCilindroRegistered || <Loading/>,
         titleBox: "Cilindros Disponíveis",
         classInfo: "content__infoStatic",
      },
      {
         id: 3,
         IconBox: IconTinta,
         infoBox: homeStats?.totalTintaRegistered || <Loading/>,
         titleBox: "Tintas Disponíveis",
         classInfo: "content__infoStatic",
      },
      {
         id: 4,
         IconBox: IconRequest,
         infoBox: homeStats?.totalRequested || <Loading/>,
         titleBox: "Solicitações Pendentes",
         classInfo: "content__infoStatic",
      },
   ];

   const initStats = async () => {
      try {
        await getAllHomePageStats();

      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      initStats();
   }, []);

   return (
      <ModalProvider>
         <SubNav navInfo={infoSubNav} />
         <MainLayout title={title} infoExtraData={infoBoxExtra} customStyle={styles.home}>
            <Outlet context={{ styles, setTitle }} />
         </MainLayout>
      </ModalProvider>
   );
}
