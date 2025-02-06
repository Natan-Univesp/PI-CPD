import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import './assets/css/animation.css';
//Páginas
//Home e seus filhos
import Home from './pages/Home.jsx';
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
    ]
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
