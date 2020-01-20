// // Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

// myFunction();

const btnRegister= document.getElementById('registerMe').addEventListener('click', registerMe)
const btnLogIn = document.getElementById('logIn').addEventListener('click', logIn)

function registerMe() {
  const root = document.getElementById('root')
    root.innerHTML=  `<h4>Registro de Usuarios</h4>
  <input id="registerEmail" type="email" placeholder="ingresa tu Email">
  <input id="registerPassword" type="password" placeholder="Ingresa tu contraseña">`
}

function register() {
    const registerEmail = document.getElementById('registerEmail').value;
    const registerPassword = document.getElementById('registerPassword').value;
    
    firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPassword)
    .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });
};

function logIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });
}
 function observer() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
 }
 observer();