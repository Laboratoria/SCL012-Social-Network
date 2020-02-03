// Este es el punto de entrada de tu aplicacion
import {
  signInNew,
  signIn,
  signOff,
  recoverPass,
} from './lib/index.js';

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();

// Initialize Firestore
const db = firebase.firestore();
/*---------------------------------------------------------------------------------*/

function init() {
  const root = document.getElementById('root');
  const contact = document.getElementById('contact');

  /* Formulario login */
  function start() {
    window.location.hash = '/login';
    root.innerHTML = `
    <section class="login" id="login">
      <img src="img/logo2.png" alt="logo Finger Food" class="login__logo">
      <h1 class="login__title">Bienvenid@!</h1>
      <form class="login__form">
        <div class="login__container">
          <div class="login__inputMail">
            <i class="fas fa-envelope icon"></i>
            <input type="email" class="login__inputText" id="login__email" placeholder="Correo Electrónico">
          </div>
          <div class='login__inputPassword'>
            <i class='fas fa-key icon'></i>
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
      <button type="button" name="btn__google" class="btn__rrss" id="login__googleBtn">
        <img src="img/googleColor.svg" alt="logo Google" class="btn__icon">
      </button>
      <button type="button" name="btn_facebook" class="btn__rrss" id="login__facebookBtn">
        <img src="img/facebook.svg" alt="logo Google" class="btn__icon">
      </button>
      <p class="login__acceptService">Al continuar, aceptas nuestras condiciones del servicio.</p>
      <p class="login__register">¿No tienes una cuenta?<a class="login__linkRegister" id="login__btnRegister" href="#">Regístrate</a></p>
    </section>`;
  }

  start();

  const recover = document.getElementById('login__recover');
  const loginEmail = document.getElementById('login__email');

  recover.addEventListener('click', () => {
    if (loginEmail.value === '') {
      alert('Ingrese su email');
    } else {
      recoverPass(loginEmail.value);
      loginEmail.value = '';
    }
  });

  function newPage(displayName, email) {
    window.location.hash = '/home';
    root.innerHTML = `
    <nav class="navi">
    <img src="img/logo2.png" alt="logo" class="logoNav">
    <div class="navigation">
      <ul class="navigation__list">
        <li class="navigation__item"><a href="#divSearch"><i class="fas fa-search icon"></i></a></li>
        <li class="navigation__item"><a href="#" id="plus"><i class="fas fa-plus icon"></i></a></li>
        <li class="navigation__item"><a href="#"><i class="fas fa-user-circle fa-2x icon"></i></a></li>
        <li class="navEmail"> ${email} </li>
        <li class="navigation__item icon"><a id="closeSession" href="#"><i class="far fa-times-circle fa-2x icon"></i></a></li>
      </ul>
    </div>
  </nav>

  <section class="main">
   <h1 class="welcome" id="welcome">Bienvenid@ <span> ${displayName} </span> </h1>
  </section>`;

    contact.innerHTML = `
     <p> Finger Food 2020. Todos los derechos reservados.</p>`;

    /* Cerrar sesión */
    const closeSession = document.getElementById('closeSession');

    closeSession.addEventListener('click', () => {
      /* cerrar sesión de usuario */
      signOff();
      /* Pasar a página inicial */
      start();
    });

    const plus = document.querySelector('#plus');
    const viewPost = document.getElementById('viewPost');
    const welcome = document.getElementById('welcome');

    plus.addEventListener('click', () => {
      /* Cambiar título */
      welcome.innerHTML = 'Nuevo Post';
      /* Mostrar post */
      viewPost.innerHTML = `
      <div class="containerPost">
        <label for="fileUpload" class="uploadImg"  title="Formato png/jpg">
         <i class="fas fa-cloud-upload-alt"></i> Subir imagen
        </label>
        <input id="fileUpload" accept=".png, .jpg" type="file" style='display: none;'/ required>
        <div id="infoFile" class="infoFile"></div>
        <textarea class="inputArea" placeholder="Ingrese comentario" id="commentary" maxlength="1000"></textarea>
        <button class="btnOk" id="btnOk"> Postear </button>
      </div>`;

      const fileUpload = document.getElementById('fileUpload');
      let file;
      const commentary = document.getElementById('commentary');
      const btnOk = document.getElementById('btnOk');

      fileUpload.addEventListener('change', changeImg);
      btnOk.addEventListener('click', uploadImg);

      /* Cambiar estética input */
      function changeImg() {
        file = fileUpload.files[0];
        console.log(file);
        const fileEntered = document.getElementById('fileUpload').files[0].name;
        /* nombre archivo */
        document.getElementById('infoFile').innerHTML = fileEntered;
      }

      function uploadImg() {
        if (fileUpload.value === '' || commentary.value === '') {
          alert('Complete los campos');
        } else {
          /* id único archivo - aleatorio */
          const id = Math.random().toString(36).substring(2);
          /* Ruta: Creación/ubicación de carpeta y nombre de archivo con el que se guardará */
          const filePath = `upload/food_${id}`;
          /* Referencia en storage a ruta */
          const storageRef = storage.ref(filePath);
          /* Subida de fichero con ruta y datos archivo */
          /* const task = this.storage.upload(filePath, file); */
          const uploadTask = storageRef.put(file);
          /* Recuperar URL para guardar en base de datos */

          // Register three observers:
          // 1. 'state_changed' observer, called any time the state changes
          // 2. Error observer, called on failure
          // 3. Completion observer, called on successful completion
          uploadTask.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function (error) {
            // Handle unsuccessful uploads
          }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log('Archivo disponible en ', downloadURL);

              /* Guardar en base de datos nuevo post con imagen y comentario */
              db.collection('newPost').add({
                  image: downloadURL,
                  commentary: commentary.value,
                })
                .then(function (docRef) {
                  console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                  console.error("Error adding document: ", error);
                })

              /* Publicar */
            });
          });
        }

      }


    });
  }


  /* Ingreso usuario existente */
  const emailIngreso = document.getElementById('login__email');
  console.log(emailIngreso);
  const passIngreso = document.getElementById('login__pass');
  console.log(passIngreso);
  const loginBtn = document.getElementById('login__accept');
  console.log(loginBtn);

  loginBtn.addEventListener('click', () => {
    /* Verificar que existe usuario */
    signIn(emailIngreso.value, passIngreso.value);
    /* Pasar a página de post */
  });

  function observador() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('Existe usuario activo');
        // User is signed in.
        let displayName = user.displayName;
        console.log(displayName);
        let email = user.email;
        console.log(email);
        let emailVerified = user.emailVerified;
        console.log(emailVerified);
        let photoURL = user.photoURL;
        console.log(photoURL);
        let isAnonymous = user.isAnonymous;
        console.log(isAnonymous);
        let uid = user.uid;
        console.log(uid);
        let providerData = user.providerData;
        console.log(providerData);
        if (emailVerified) {
          if (displayName === null) {
            displayName = '';
          }
          newPage(displayName, email);
        } else if (!emailVerified) {
          signOff();
          start();
        }

      } else {
        // User is signed out;
        console.log('no existe usuario activo');
      }
    });
  }

  observador();

  /* Pasar de login a registro si presionan botón Registrar */
  const loginRegister = document.getElementById('login__btnRegister');
  loginRegister.addEventListener('click', () => {
    /* Formulario registro */
    window.location.hash = '/register';
    root.innerHTML = `
    <section class="register" id="register">
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
            <input type="email" class="register__inputText" id="register__email" placeholder="Correo Electrónico">
          </div>
          <div class="register__inputPassword">
            <i class="fas fa-key icon"></i>
            <input type="password" class="register__inputPass" id="register__pass" placeholder="Contraseña">
          </div>
          <p class="register__acceptService">Al continuar, aceptas nuestras condiciones del servicio.</p>
          <input type="submit" value="Registrar" class="register__button" id="register__btn">
        </div>
      </form>
    </section>
    `;

    /* Guardar nuevo usuario */
    /* const userName = document.getElementById('register__name').value; */
    const userName = document.getElementById('register__name');
    console.log(userName);
    const emailRegister = document.getElementById('register__email');
    console.log(emailRegister);
    const passRegister = document.getElementById('register__pass');
    console.log(passRegister);
    const registerBtn = document.getElementById('register__btn');
    console.log(registerBtn);

    registerBtn.addEventListener('click', () => {
      /* Verificar que no existe usuario */
      /* Guardar */
      signInNew(userName.value, emailRegister.value, passRegister.value);
      /* Guardar datos registro */

      /* function save(name, email) {
         db.collection('users').add({
             userName: name,
             userEmail: email,
           })
           .then(function (docRef) {
             console.log("Document written with ID: ", docRef.id);
           })
           .catch(function (error) {
               console.error("Error adding document: ", error);
           })
       };
       /* Guardar si se envia mail de verificación */
      /* save(userName.value, emailRegister.value);*/
      start();
    });
  });

  /* Login con Google */
  /* Instancia proveedor del servicio */
  const provider = new firebase.auth.GoogleAuthProvider();
  const btnGoogle = document.getElementById('login__googleBtn');

  btnGoogle.addEventListener('click', () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);
        /* probar poniendo foto de logueado */
        /* pasar a sección post */
        root.innerHTML = `<img src= "${result.user.photoURL}" >`;
        /* guardar datos de usuario */
      });
  });

  /* Ingreso con Facebook */
  /* Instancia proveedor del servicio */
  const provider2 = new firebase.auth.FacebookAuthProvider();
  const btnFacebook = document.getElementById('login__facebookBtn');

  btnFacebook.addEventListener('click', () => {
    firebase.auth()
      .signInWithPopup(provider2)
      .then((result) => {
        console.log(result);
        console.log(result.user);
        /* probar poniendo foto de logueado */
        /* pasar a sección post */
        root.innerHTML = `<img src= "${result.user.photoURL}" >`;
        /* guardar datos de usuario */
      });
  });

  /* Creación routing
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#/login') {
    //function
  } else if (window.location.hash === '#/register') {
    //function
  } else if (window.location.hash === '#/home') {
    const userNow = firebase.auth().currentUser;
    //function(userNow)
  } else if (window.location.hash === '#/forgot') {
    //function
  }
});*/
}
window.onload = init();

/*---------------------------------------------------------------------------------*/