
/*import {register} from './lib/index.js';
import {passIn} from './lib/index.js';
import {observer} from './lib/index.js';
import {signOff} from './lib/index.js';
import {showUp} from './lib/index.js';
*/
let logo = document.getElementById("logo");
logo.addEventListener("click", () => {
  console.log("sirve");
  let next = document.getElementById("root");
  next.innerHTML = `
<header class="header-position">
  <div class="marca-header">

    <div class="encabezado" style="margin-left:35%"><img src="./img/logo-weservice.png" style="cursor: pointer; width:50%" alt="logo">
    <a class="" id="cerrar-sesion" href=""><img class="img-header" src="./img/close.png" alt="cerrar-sesión"></a>

    </div>
  </div>

  <div class="barra">
    <input type="search" class="search" placeholder="Search...">
  </div>

</header>
<main>

<br>

  <div id="ingreso-post">
    <form class="formulario-post">
      <div class="imagen-post">
        <div class="fondo-avatar">

            <img class="imagen-tamaño" src="./img/user.png" alt="avatar">
        </div>
        <textarea  class="textarea" name="post" id="post"placeholder="¡Publica tus novedades!"></textarea>
      </div>
      <div class="imagen-post">
          <button class="botones-post" id="publicar">Publicar</button>
          <section class="lista-publicaciones"></section>
      </div>
    </form>
  </div>
<br>

</main>
<footer>
  <footer class="footer-color">
    <div class = "footer-opciones">

      <a class="nav" href=""><img class="img-header"  src="./img/like.png" alt="Publicaciones"></a>  
      <a class="nav" href=""><img class="img-header"  src="./img/chat-bubble.png" alt="Noticias"></a>  
      <a class="nav" href=""><img class="img-header"  src="./img/user.png" alt="Perfil"></a> 
    </div>
  </footer>
</footer>

    `;
    const div = document.createElement('div');
    div.innerHTML = temp;
    const btnLogOut = div.querySelector('#cerrar-sesion');
    const btnPost = div.querySelector('#publicar');
    const tagDiv = div.querySelector('#lista-publicaciones');
    posts.forEach(post => {
      tagDiv.appendChild(
        cadaPost(post, firebase.auth().currentUser.uid));
    });
    btnPost.addEventListener('click', addPostOnSubmit);
    btnLogOut.addEventListener('click', logOutOnClick);
    return div;
})



let account = document.getElementById("access")
account.addEventListener("click", () => {
  console.log("si");
  let next = document.getElementById("root");
  next.innerHTML =
    `
 <form class= 'formulario'>
 <input type='name' id='name' placeholder='Ingresa tu Nombre'>
 <input type='lastName' id='lastName' placeholder='Ingresa tu Apellido'>
 <input type='email' id='email' placeholder='Ingresa email'>
 <input type='password' id='password' placeholder='Ingresa contraseña'>
 <button id='send'>Enviar</button>
 </form>
 
 <input type='email' id='email' placeholder='Ingresa email'>
 <input type='password' id='password' placeholder='Ingresa contraseña'>
 <button id='send'>registrate</button>
 <input type='email' id='email2' placeholder='Ingresa email'>
 <input type='password' id='password2' placeholder='Ingresa contraseña'>
 <button id='access'>Ingresar</button>
 <button id='btnlogout' style='display:none;'>Cerrar Sesion</button>
 `
});

