import { ModalProvider } from './Context/ModalContext';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navBar/Navbar';
import './App.css';

function App() {
  return (
    <ModalProvider>
      <div className='contentContainer'>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </ModalProvider>
  );
}

export default App;
