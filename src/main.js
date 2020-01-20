// Este es el punto de entrada de tu aplicacion
// import { MyFunction } from './lib/index.js';

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

  firebase.auth().createUserWithEmailAndPassword(regName, regEmail, regPass)
    .catch(function (error) {
    // Handle Errors here.
      const errorCode2 = error.code;
      const errorMessage2 = error.message;
      console.log(errorCode2);
      console.log(errorMessage2);
    });
});
// observador: authentication state observer and get user data 
/*
function observador () {
  firebase.auth().onAuthStateChanged(function (user) {
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
*/
/*--------------------------------------------------------------------- */
/* Pasar de login a registro si presionan botón Registrar*/
const login = document.getElementById('login');
const loginRegister = document.getElementById('login__btnRegister');
const register = document.getElementById('register');

loginRegister.addEventListener('click', formRegister);

function formRegister() {
  login.style.display = 'none';
  register.style.display = 'block';
}