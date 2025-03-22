import { Outlet } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";

export default function Marca() {
    return(
        <>
            <MainLayout title={"Marca de Suprimentos"}>
                <Outlet/>
            </MainLayout>
        </>
    )
}