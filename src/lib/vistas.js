 // creando el muro de la red social
 export const getPostRouter = (callback) => {
    const user = firebase.auth().currentUser;
  
    return getPost(callback, user);
  };
window.addEventListener('hashchange', function(){
    console.log("el hash cambio");
})

