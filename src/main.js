// Este es el punto de entrada de tu aplicacion
// import { MyFunction } from './lib/index.js';

// ------ Initialize Cloud Firestore through Firebase
// Base de datos de Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyAewAJTAGvRk5IyI8jCQ3l3DVsquWzRJVk',
  authDomain: 'https://finger-food.firebaseapp.com/',
  projectId: 'finger-food',
});


// function de login para usuarios existentes
function loginBtn (){
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
};

