import './App.css'
import Navbar from './components/navBar/Navbar';
import { Outlet } from 'react-router-dom';
import { ModalProvider } from './Context/ModalContext';

function App() {
    return (
      <ModalProvider>
        <div className='contentContainer'>
          <Navbar/>
          <main>
            <Outlet/>
          </main>
        </div>
      </ModalProvider>
    )

}

export default App
