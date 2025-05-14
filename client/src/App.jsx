import './App.css'
import Navbar from './components/navBar/Navbar';
import { Outlet } from 'react-router-dom';
import { ModalProvider } from './Context/ModalContext';
import { AlertProvider } from "./Context/AlertContext";
import { ValidateLogin } from './components/RoutesValidate/ValidateLogin';
import { UserProvider } from './Context/UserContext';

function App() {

    return (
      <ValidateLogin>
        <div className='contentContainer'>
          <Navbar/>
          <main>
            <Outlet/>
          </main>
        </div>
      </ValidateLogin>
    )

}

export default App
