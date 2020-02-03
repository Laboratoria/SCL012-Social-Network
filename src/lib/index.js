// aqui exportaras las funciones que necesites
/*
export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
};
*/

/* Loguear usuario existente */

export const signIn = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
};

// Envío de mail de verificación
export const verificationEmail = () => {
  const user = firebase.auth().currentUser;

  user.sendEmailVerification()
    .then(() => {
      // Email sent.
      alert('Se ha enviado un correo de verificación para activar su cuenta');
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};

/* Registro nuevo usuario */
export const signInNew = (email, password) => {
  console.log('email', email);
  console.log('password', password);
  firebase.auth().createUserWithEmailAndPassword(email, password)
    /* .then((user) => {
      user.updateProfile({
        displayName: userName,
      });
    }) */
    .then(() => {
      // Update successful.
      verificationEmail();
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
      // [START_EXCLUDE]
      if (errorCode === 'auth/invalid-email') {
        alert('Ingrese email válido');
      } else if (errorCode === 'auth/weak-password') {
        alert('El password es muy débil, mínimo 6 caracteres!');
      } else if (errorCode === 'auth/email-already-in-use') {
        alert('La dirección de email ya está siendo utilizada');
      } else {
        console.error(error);
      }
      // [END_EXCLUDE]
    });
};
/* Cerrar sesión */
export const signOff = () => {
  firebase.auth().signOut()
    .then(() => {
      console.log('Cerrando sesión');
    })
    .catch((error) => {
      console.log(error);
    });
};
