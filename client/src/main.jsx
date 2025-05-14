import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import './assets/css/animation.css';
//Páginas
//Home e seus filhos
import Home from './pages/Home/Home.jsx';
import RegisterRequest from './components/Home/RegisterRequest.jsx';
import ViewRequest from './components/Home/ViewRequest.jsx';

//Toner e seus filhos
import Toner from './pages/Toner.jsx';
import TonerInfo from './components/Toner/TonerInfo.jsx';
import TonerReport from './components/Toner/TonerReport.jsx';

//Cilindro e seus filhos
import Cilindro from './pages/Cilindro.jsx';
import CilindroInfo from './components/Cilindro/CilindroInfo.jsx';
import CilindroReport from './components/Cilindro/CilindroReport.jsx';

//Tinta e seus filhos
import Tintas from './pages/Tintas.jsx';
import TintaInfo from './components/Tintas/TintaInfo.jsx';
import TintaReport from './components/Tintas/TintaReport.jsx';

import { Marca } from './pages/Marca/Marca.jsx';
import { MarcaInfo } from './components/Marca/MarcaInfo/MarcaInfo.jsx';
import { Administrador } from './pages/Administrador/Administrador.jsx';
import { AdminInfo } from './components/Administrador/AdminInfo.jsx';
import { Autenticacao } from './pages/Autenticacao/Autenticacao.jsx';

// Provider
import { UserProvider } from './Context/UserContext.jsx';
import { AlertProvider } from './Context/AlertContext.jsx';
import { SolicitacaoProvider } from './Context/SolicitacaoContext.jsx';
import { InfoExtraProvider } from './Context/InfoExtraContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      // Home
      {
        path: "/",
        element: <Home/>,
        children: [
          {
            index: true,
            element: <RegisterRequest/>
          },
          {
            path: "viewRequest",
            element: <SolicitacaoProvider><ViewRequest/></SolicitacaoProvider>
          }
        ]
      },
      // Toners
      {
        path: "/toner",
        element: <Toner/>,
        children: [
          {
            index: true,
            element: <TonerInfo/>
          },
          {
            path: "report",
            element: <TonerReport/>
          }
        ]
      },
      // Cilindros
      {
        path: "/cilindro",
        element: <Cilindro/>,
        children: [
          {
            index: true,
            element: <CilindroInfo/>
          },
          {
            path: "report",
            element: <CilindroReport/>
          }
        ]
      },
      // Tintas
      {
        path: "/tintas",
        element: <Tintas/>,
        children: [
          {
            index: true,
            element: <TintaInfo/>
          },
          {
            path: "report",
            element: <TintaReport/>
          }
        ]
      },
      {
        path: "/marca",
        element: <Marca/>,
        children: [
          {
            index: true,
            element: <MarcaInfo/>
          }
        ]
      },
      {
        path: "/admin",
        element: <Administrador/>,
        children: [
          {
            index: true,
            element: <AdminInfo/>
          }
        ]
      }
    ]
  },
  {
    path: "/auth",
    element: <Autenticacao/>
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <AlertProvider>
        <InfoExtraProvider>
          <RouterProvider router={router}/>
        </InfoExtraProvider>
      </AlertProvider>
    </UserProvider>
  </StrictMode>
)
