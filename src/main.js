// Este es el punto de entrada de tu aplicacion
//import { MyFunction } from './lib/index.js';

// ------ Initialize Cloud Firestore through Firebase
// Base de datos de Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyAewAJTAGvRk5IyI8jCQ3l3DVsquWzRJVk',
    authDomain: 'https://finger-food.firebaseapp.com/',
    projectId: 'finger-food'
  });
 // BASE DE DATOS 
  let database = firebase.firestore(); 
// Add data --  Usuarios
database.collection("users").add({
    user: "username",
    email: "email",
    password: "password"
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
// Read Data -- esto lee los datos ingresados 
database.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});
// Sign up a new user -- Registro de usuario
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // ...
  });


// function de login para usuarios existentes
let loginBtn = document.getElementById('login__accept');
    loginBtn.addEventListener("click", function login() {
        let email = document.getElementById('email').value;
        let contrasena = document.getElementById('contrasena').value;

        firebase.auth().signInWithEmailAndPassword(email, contrasena)
        .catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
          });
})
// observador: authentication state observer and get user data
function observador(){
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
      console.log('no existe usuario activo')
    }
  });
}
observador();

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
