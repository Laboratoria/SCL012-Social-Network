// Este es el punto de entrada de tu aplicacion
// import { MyFunction } from './lib/index.js';

/*---------------------------------------------------------------------------------*/
const root = document.getElementById("root");

/* Cargar ingreso cuando se cargue página */
window.addEventListener("load", start, false);

function start() {
  /* Formulario login */
  root.innerHTML = `<section class="login" id="login">
    <img src="img/logo2.png" alt="logo Finger Food" class="login__logo">
    <h1 class="login__title">Bienvenid@!</h1>
    <form class="login__form">
      <div class="login__container">
        <div class="login__inputMail">
          <i class="fas fa-envelope icon"></i>
          <input type="email" class="login__inputText" id="login__email" placeholder="Correo Electrónico">
        </div>
        <div class="login__inputPassword">
          <i class="fas fa-key icon"></i>
          <input type="password" class="login__inputPass" id="login__pass" placeholder="Contraseña">
        </div>
        <p class="login__acceptService">Al continuar, aceptas nuestras condiciones del servicio.</p>
        <input type="checkbox" name="remember" id="login__remember" value="remember"> Recuérdame
        <input type="submit" value="Acceder" id="login__accept" class="login__button">
        <p class="login__forget">¿Olvidó su contraseña?<a class="login__linkRecover" id="login__recover" href="#">Recuperar</a></p>
      </div>
    </form>
    <div class="login__divider">
      <hr>
      <span>o</span>
      <hr>
    </div>
    <button type="button" name="btn__google" class="btn__rrss" id="login__google1">
      <img src="img/googleColor.svg" alt="logo Google" class="btn__icon">
    </button>
    <button type="button" name="btn_facebook" class="btn__rrss" id="login__facebook1">
      <img src="img/facebook.svg" alt="logo Google" class="btn__icon">
    </button>
    <p class="login__acceptService">Al continuar, aceptas nuestras condiciones del servicio.</p>
    <p class="login__register">¿No tienes una cuenta?<a class="login__linkRegister" id="login__btnRegister" href="#register">Regístrate</a></p>
  </section>`;
};

/*---------------------------------------------------------------------------------*/

/* Pasar de login a registro si presionan botón Registrar*/
const login = document.getElementById("login");
const loginRegister = document.getElementById("login__btnRegister");
const register = document.getElementById("register");

loginRegister.addEventListener('click', formRegister);

function formRegister() {
  /* Formulario registro */
  root.innerHTML = `<section class="register" id="register">
    <img src="img/logo2.png" alt="logo Finger Food" class="register__logo">
    <h1 class="register__title">Regístrate!</h1>
    <form class="register__form">
      <div class="register__container">
        <div class="register__inputName">
          <i class="fas fa-user icon"></i>
          <input type="text" class="register__inputText" id="register__name" placeholder="Nombre y apellido">
        </div>
        <div class="register__inputMail">
          <i class="fas fa-envelope icon"></i>
          <input type="email" class="register__inputText" id="register__mail" placeholder="Correo Electrónico">
        </div>
        <div class="register__inputPassword">
          <i class="fas fa-key icon"></i>
          <input type="password" class="register__inputPass" id="register__pass" placeholder="Contraseña">
        </div>
        <p class="register__acceptService">Al continuar, aceptas nuestras condiciones del servicio.</p>
        <input type="submit" value="Registrar" class="register__button" id="register__btn">
      </div>
    </form>
    <div class="register__divider">
      <hr>
      <span>o</span>
      <hr>
    </div>
    <button type="button" name="btn__google" class="btn__rrss" id="login__google2">
      <img src="img/googleColor.svg" alt="logo Google" class="btn__icon">
    </button>
    <button type="button" name="btn_facebook" class="btn__rrss" id="login__facebook2">
      <img src="img/facebook.svg" alt="logo Google" class="btn__icon">
    </button>
    <p class="login__acceptService accept">Al continuar, aceptas nuestras condiciones del servicio.</p>
  </section>
`;
}

/*---------------------------------------------------------------------------------*/


// ------ Initialize Cloud Firestore through Firebase
// Base de datos de Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyAewAJTAGvRk5IyI8jCQ3l3DVsquWzRJVk',
  authDomain: 'https://finger-food.firebaseapp.com/',
  projectId: 'finger-food',
});
// BASE DE DATOS
const database = firebase.firestore();
// Add data --  Usuarios
database.collection('users').add({
  user: 'username',
  email: 'email',
  password: 'password',
})
  .then(function (docRef) {
    console.log('Document written with ID: ', docRef.id);
  })
  .catch(function (error) {
    console.error('Error adding document: ', error);
  });
// Read Data -- esto lee los datos ingresados
database.collection('users').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
});

// function de login para usuarios existentes
const loginBtn = document.getElementById('login__accept');
loginBtn.addEventListener('click', function login() {
  const email = document.getElementById('email').value;
  const contrasena = document.getElementById('contrasena').value;

  firebase.auth().signInWithEmailAndPassword(email, contrasena)
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
});

// función de registro de nuevo usuario
const registerBtn = document.getElementById('register__btn');
registerBtn.addEventListener('click', function register() {
  const regName = document.getElementById('register__name').value;
  const regEmail = document.getElementById('register__mail').value;
  const regPass = document.getElementById('register__pass').value;

  firebase.auth().createUserWithEmailAndPassword(regName, regEmail, regPass).catch(function(error) {
    // Handle Errors here.
    let errorCode2 = error.code;
    let errorMessage2 = error.message;
    console.log(errorCode2);
    console.log(errorMessage2);
  });
});


// observador: authentication state observer and get user data
function observador() {
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

    } else {
      // User is signed out;
      console.log('no existe usuario activo');
    }
  });
}
observador();

/*---------------------------------------------------------------------*/



