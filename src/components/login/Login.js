//INICIO DE SESIÓN
import React, { useState } from 'react'
import './login.css';
import logo from '../../images/Logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = ({onLogin}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    setPassword(event.target.value);
  };

  // cambiar estado para mostrar o no la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // función para el formulario
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Evita el envío predeterminado del formulario
    
    fetch('http://localhost:4000/api/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email,password}),
    }).then((response)=>response.json())
    .then((data)=>{
      if(data.message==="No Valid"){
        toast.error('Usuario y/o contraseña incorrecta');
      }else if(data.message==="Success"){
        onLogin();
      }
    })
    .catch((error)=>{
      console.log('Error: ',error);
    })
    // console.log('Correo electrónico:', email);
    // console.log('Contraseña:', password);
  };

  return (
    <div className='fondo'>
      <ToastContainer/>
      <div className="container">

        <div className="column" id='left'>
          {/* Contenido de la primera columna */}
          <div className='title'>Inicio de sesión</div>
          <div className='form'>

            <form onSubmit={handleFormSubmit}>
              <div className='email-container'>
                <label type='email' className='label-email'>Correo electronico:</label>
                <input type='text' name='email' className='input-email' placeholder='ejemplo@email.com' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div className='password-container'>
                <label className='label-password'>Contraseña:</label>
                <div>
                  <input name='password' type={showPassword ? 'text' : 'password'} value={password} onChange={handleInputChange} className='input-password' placeholder='••••••••••••••••' />
                  <button className='btn-showpassword' type='button' onClick={togglePasswordVisibility}>{showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}</button>
                </div>
              </div>
              <div className='btn-container'>
                <button type='submit' className='btn'>Iniciar sesión</button>
              </div>
            </form>

          </div>
        </div>

        <div className="column" id='rigth'>
          {/* Contenido de la segunda columna */}
          <img src={logo} alt='Logo'/>
        </div>
      </div>
    </div>

  )
}
