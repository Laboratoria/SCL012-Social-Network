 export function register(email,password){ //PARA CREAR CUENTA
    // si esta promesa no funciona, se ejecutará el catch, el cual captura el error y lo alerta
    firebase.auth().createUserWithEmailAndPassword(email,password)  
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  };


export function passIn(email2,password2){ //PARA INGRESAR
  firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
   
    // ...
  });  
}

export function observer(){ // si existe un usuario ya registrado ejecutara un if y sino no hace nada
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) { 
      showUp();
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

function showUp(){ 
  document.getElementById('btnlogout').style.display = 'block';
}
export function signOff(){ 
  firebase.auth().signOut()
  .then(function(){
    document.getElementById('btnlogout').style.display = 'none';
  })
  .catch(function(error){
  })
}
