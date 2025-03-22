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
import Toner from './pages/Toner/Toner.jsx';
import TonerInfo from './components/Toner/TonerInfo.jsx';
import TonerReport from './components/Toner/TonerReport.jsx';

//Cilindro e seus filhos
import Cilindro from './pages/Cilindro/Cilindro.jsx';
import CilindroInfo from './components/Cilindro/CilindroInfo.jsx';
import CilindroReport from './components/Cilindro/CilindroReport.jsx';

//Tinta e seus filhos
import Tintas from './pages/Tintas/Tintas.jsx';
import TintaInfo from './components/Tintas/TintaInfo.jsx';
import TintaReport from './components/Tintas/TintaReport.jsx';
import Marca from './pages/Marca/Marca.jsx';
import { MarcaInfo } from './components/Marca/MarcaInfo.jsx';
import { Administrador } from './pages/Administrador/Administrador.jsx';
import { AdminInfo } from './components/Administrador/AdminInfo.jsx';

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
            element: <ViewRequest/>
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
      //Marca
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
      //Administrador
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

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
