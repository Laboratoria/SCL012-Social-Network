// INICIO RECUPERACION CONTRASEÑA--DIANA
const recoverBtn = document.getElementById("recoverBtn");
recoverBtn.addEventListener('click', () => {  
  recoverPass();
})

const recoverPass = function() { // para invocar a la funcion de firebase
  const auth = firebase.auth();
  const emailAddress = document.getElementById('email').value; // para recuperar valor email
  console.log("EMAIL:", emailAddress);
  auth.sendPasswordResetEmail(emailAddress)// metodo para recuperacion de correo
    .then(function(){ // notificar cuando se envio el correo
      alert('Se ha enviado un correo a tu cuenta. Porfavor sigue las intrucciones')
}, function(error) { // funcion anonima para manejar errores
    console.log(error)
})
}