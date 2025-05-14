import { Outlet } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";

//icones
import {FaUserCheck as IconUserActive} from "react-icons/fa";
import { FaUserGroup as IconAllUser} from "react-icons/fa6";
import { ValidateAdmin } from "../../components/RoutesValidate/ValidateAdmin";
import { ModalProvider } from "../../Context/ModalContext";
import { AdminProvider } from "../../Context/AdminContext";
import { useInfoExtra } from "../../Context/InfoExtraContext";
import { useEffect } from "react";
import { Loading } from "../../components/Loading/Loading";



export function Administrador() {
    const { adminStats, getAllAdminPageStats } = useInfoExtra();

    const infoBoxExtra = [
        {
            id: 1,
            IconBox: IconAllUser,
            infoBox: adminStats?.totalUsers || <Loading/>,
            titleBox: "Todos os Usuários",
            classInfo: "content__infoStatic"
        },
        {
            id: 2,
            IconBox: IconUserActive,
            infoBox: adminStats?.totalActiveUsers || <Loading/>,
            titleBox: "Usuários Ativos",
            classInfo: "content__infoStatic"
        }
    ]

   const initStats = async () => {
      try {
         await getAllAdminPageStats();
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      initStats();
   }, []);

    return(
        <ValidateAdmin>
            <AdminProvider>
                <ModalProvider>
                    <MainLayout title={"Administrador"} infoExtraData={infoBoxExtra}>
                        <Outlet/>
                    </MainLayout>
                </ModalProvider>
            </AdminProvider>
        </ValidateAdmin>
    )
}