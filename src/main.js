// Este es el punto de entrada de tu aplicacion
import { signInNew } from './lib/index.js';

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
            <input type="email" class="register__inputText" id="register__mail" placeholder="Correo Electrónico">
          </div>
          <div class="register__inputPassword">
            <i class="fas fa-key icon"></i>
            <input type="password" class="register__inputPass" id="register__pass" placeholder="Contraseña">
          </div>
          <p class="register__acceptService">Al continuar, aceptas nuestras condiciones del servicio.</p>
          <input type="submit" value="Registrar" class="register__button" id="register__btn">
        </div>
      </form>
      <div class="register__divider">
        <hr>
        <span>o</span>
        <hr>
      </div>
      <button type="button" name="btn__google" class="btn__rrss" id="register__google">
        <img src="img/googleColor.svg" alt="logo Google" class="btn__icon">
      </button>
      <button type="button" name="btn_facebook" class="btn__rrss" id="register__facebook">
        <img src="img/facebook.svg" alt="logo Google" class="btn__icon">
      </button>
      <p class="register__acceptService accept">Al continuar, aceptas nuestras condiciones del servicio.</p>
    </section>
    `;
    /* Guardar nuevo usuario */
    /* const userName = document.getElementById('register__name').value; */
    const email = document.getElementById('register__mail').value;
    const password = document.getElementById('register__pass').value;
    const registerBtn = document.getElementById('register__btn');

    registerBtn.addEventListener('click', () => {
      /* Verificar que no existe usuario */
      /* Guardar */
      signInNew(email, password);
      /* Pasar a página de post */
    });
  });

  /* Ingreso usuario existente */

  /* Login con Google */

  /* Ingreso con Facebook */
}

window.onload = init();

/*---------------------------------------------------------------------------------*/
