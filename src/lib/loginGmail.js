// inicio con google
const authFire = () => {
  console.log('FUNCIONA EL BOTON');
  const provider = new firebase.auth.GoogleAuthProvider();

  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  firebase.auth().signInWithPopup(provider).then((result) => {
    let token = result.credencial.accessToken;
    let user = resul.user;
    console.log(user)
  }).catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    let email = error.email;
    let credential = error.credential;
    console.error(error)
  });
}


  

// inicio con Facebook

 const authFacebook = () => {
  console.log('FUNCIONA EL BOTON');
  const provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider).then((result) => {
    const token = result.credential.accessToken;
    const user = result.user;
  }).catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    let email = error.email;
    let credential = error.credential;
  });
};

  

export{authFire, authFacebook}