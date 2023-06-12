import React,{useState,useEffect} from "react";
import { Login } from "./components/login/Login";
import {Home} from './components/home/Home';
import { Navbar } from "./components/navbar/Navbar";
import '@fortawesome/fontawesome-svg-core/styles.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    // Verificar el estado de inicio de sesión al cargar la página
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  // validación de credenciales y guardar confirmación de acceso en localstorage
  const handleLogin=()=>{
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn','true');
  }

  // Cerrar sesión y eliminar confirmación de acceso en localstorage
  const handleLogout=()=>{
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  }



  // item seleccionado del navbar
  const handleNavbarSelection = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="App">
      {isLoggedIn?(
      <>
      <Navbar onLogout={handleLogout} onSelection={handleNavbarSelection}/>
      <Home selectedItem={selectedItem}/>
      </>
      ):(
        <Login onLogin={handleLogin}/>
      )}
    </div>
  );
}

export default App;
