// Este es el punto de entrada de tu aplicacion
import {
  signInNew,
  signIn,
} from './lib/index.js';

/*---------------------------------------------------------------------------------*/

function init() {
  const root = document.getElementById('root');
  /* Formulario login */
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

  /* Ingreso usuario existente */
  const emailIngreso = document.getElementById('login__email');
  console.log(emailIngreso);
  const passIngreso = document.getElementById('login__pass');
  const loginBtn = document.getElementById('login__accept');

  loginBtn.addEventListener('click', () => {
    /* Verificar que existe usuario */
    signIn(emailIngreso.value, passIngreso.value);
    /* Pasar a página de post */
  });

  function newPage() {
    root.innerHTML = 'Solo lo ve usuario ACTIVO';
  }

  function observador() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('Existe usuario activo');
        newPage();
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
    root.innerHTML = `
    <section class="register" id="register">
      <img src="img/logo2.png" alt="logo Finger Food" class="register__logo">
      <h1 class="register__title">Regístrate!</h1>
      <form class="register__form">
        <div class="register__container">
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
    const emailRegistro = document.getElementById('register__email');
    console.log(emailRegistro);
    const passRegistro = document.getElementById('register__pass');
    const registerBtn = document.getElementById('register__btn');

    registerBtn.addEventListener('click', () => {
      /* Verificar que no existe usuario */
      /* Guardar */
      signInNew(emailRegistro.value, passRegistro.value);
      /* Pasar a página de post */
    });
  });

  /* Login con Google */
  /* Instancia proveedor del servicio */
  const provider = new firebase.auth.GoogleAuthProvider();
  const btnGoogle = document.getElementById('login__googleBtn');

  btnGoogle.addEventListener('click', () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then(function (result) {
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
      .then(function (result) {
        console.log(result);
        console.log(result.user);
        /* probar poniendo foto de logueado */
        /* pasar a sección post */
        root.innerHTML = `<img src= "${result.user.photoURL}" >`;
        /* guardar datos de usuario */
      });
  });
}

window.onload = init();

/*---------------------------------------------------------------------------------*/