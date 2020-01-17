// Este es el punto de entrada de tu aplicacion


//import { MyFunction } from './lib/index.js';

/*---------------------------------------------------------------------*/

/* Pasar de login a registro si presionan botón Registrar*/
const login = document.getElementById("login");
const loginRegister = document.getElementById("login__btnRegister");
const register = document.getElementById("register");

loginRegister.addEventListener('click', formRegister);

function formRegister() {
  login.style.display = "none";
  register.style.display = "block";
}

/*---------------------------------------------------------------------*/


/*
import { myFunction } from './lib/index.js';

myFunction();
*/
