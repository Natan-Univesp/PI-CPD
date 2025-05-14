import MainLayout from "../../components/layout/MainLayout";
import { Outlet } from "react-router-dom";
import { MarcaProvider } from "../../Context/MarcaContext";
import { ModalProvider } from "../../Context/ModalContext";

export function Marca() {

    return(
        <MarcaProvider>
            <ModalProvider>
                <MainLayout title={"Marca de Suprimentos"}>
                    <Outlet/>
                </MainLayout>
            </ModalProvider>
        </MarcaProvider>
    )
}