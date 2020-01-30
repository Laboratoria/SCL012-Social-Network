// Este es el punto de entrada de tu aplicacion
import {
  signInNew,
  signIn,
  signOff,
} from './lib/index.js';

/*---------------------------------------------------------------------------------*/

function init() {
  const root = document.getElementById('root');
  /* Formulario login */
  function start() {
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

  function newPage(displayName, email) {
    root.innerHTML = `
    <nav class="navi">
    <img src="img/logo2.png" alt="logo" class="logoNav">
    <div class="navigation">
      <ul class="navigation__list">
        <li class="navigation__item"><a href="#divSearch"><i class="fas fa-search icon"></i></a></li>
        <li class="navigation__item"><a href="#" id="createPost"><i class="fas fa-plus icon"></i></a></li>
        <li class="navigation__item"><a href="#"><i class="fas fa-user-circle fa-2x icon"></i></a></li>
        <li class="navEmail"> ${email} </li>
        <li class="navigation__item icon"><a id="closeSession" href="#"><i class="far fa-times-circle fa-2x icon"></i></a></li>
      </ul>
    </div>
  </nav>

  <section class="main">
    <h1 class="welcome">Bienvenid@ <span> ${displayName} </span> </h1>
    <div class="typeSelect">
      <select id="typeFood" class="typeFood">
        <option value="all">Tipos de comida</option>
        <option value="rapida">Comida Rápida</option>
        <option value="saludable">Comida Saludable</option>
        <option value="China">Comida China</option>
        <option value="mexicana">Comida Mexicana</option>
        <option value="peruana">Comida Peruana</option>
      </select>
    </div>
    <div class="inputSearch" id="divSearch">
       <i class="fas fa-search icon"></i>
       <input type="text" class="inputText" id="inputSearch" placeholder="Buscar">
     </div>
  </section>
  <div id="wrap" class="wrap"></div>
  <footer id="contact" class="contact">
    <p> Finger Food 2020. Todos los derechos reservados.</p>
  </footer>`;
    // funcionalidad boton + (crear post)
    const createPost = document.querySelector('#createPost');
    createPost.addEventListener('click', () => {
      const postDiv = document.querySelector('#wrap');
      postDiv.innerHTML = `<section class="postPage" id="postPage">
      <div id="addPost">
        <textarea name="message" id="message" class="message"></textarea>
        <button name="submit" id="submit" class="submit">Publicar</button>
      </div>
    </section>
    `;
    });

    /* Cerrar sesión */
    const closeSession = document.getElementById('closeSession');

    closeSession.addEventListener('click', () => {
      /* cerrar sesión de usuario */
      signOff();
      /* Pasar a página inicial */
      start();
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
    const emailRegistro = document.getElementById('register__email');
    console.log(emailRegistro);
    const passRegistro = document.getElementById('register__pass');
    console.log(passRegistro);
    const registerBtn = document.getElementById('register__btn');
    console.log(registerBtn);

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
}
window.onload = init();

/*---------------------------------------------------------------------------------*/
