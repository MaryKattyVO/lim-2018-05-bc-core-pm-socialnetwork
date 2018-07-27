const login = document.getElementById('section-login');
const logout = document.getElementById('logout');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const btnRegister1 = document.getElementById('btnRegister1')
const btnRegister2 = document.getElementById('btnRegister2')
const btnLogin = document.getElementById('btnLogin')
const btnLogout = document.getElementById('btnLogout')
const btnFacebook = document.getElementById('btnFacebook');
const btnGoogle = document.getElementById('btnGoogle');
const register = document.getElementById('register');
const usernameRegister = document.getElementById('username-register');
const emailRegister = document.getElementById('email-register');
const passwordRegister1 = document.getElementById('password-register1');
const passwordRegister2 = document.getElementById('password-register1');
const bd = document.getElementById('bd');
const btnSave = document.getElementById('btnSave');
const post = document.getElementById('post');
const posts = document.getElementById('posts');

window.onload = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('Usuario Logueado');
      login.classList.add("hiden");
      logout.classList.remove("hiden");
      username.innerHTML = `Bienvenida ${user.displayName}`;
    } else {
      console.log('Sin usuario');
      login.classList.remove("hiden");
      logout.classList.add("hiden");
    }
  });
}

btnRegister1.addEventListener('click', () => {
  login.classList.add("hiden");
  register.classList.remove("hiden");
})

btnRegister2.addEventListener('click', () => {
  register.classList.add("hiden");
 logout.classList.remove("hiden");
  window.location.assign("content.html");
  firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRegister1.value)
    .then(() => {
      console.log('Usuario Creado');
    })
    .catch(function (error) {
      console.log(error.code, ' : ', error.message);
    });
})

btnLogin.addEventListener('click', () => {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(() => {
      console.log('Verificado')
      login.classList.add("hiden");
      logout.classList.remove("hiden");
    })
    .catch(function (error) {
      console.log('Contraseña Incorrecta')
    });
})

btnLogout.addEventListener('click', () => {
  firebase.auth().signOut().then(function () {
    console.log('Cerró Sesión');
    login.classList.remove("hiden");
    logout.classList.add("hiden");
  }).catch(function (error) {
    console.log('Error al cerrar Sesión');
  });
})

btnFacebook.addEventListener('click', () => {
  login.classList.add("hiden");
  logout.classList.remove("hiden");

  var provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then(function (result) { console.log('Logueado con Fb') })
    .catch(function (error) {
      console.log(error.code);
      console.log(error.message);
      console.log(error.email);
      console.log(error.credential);
    });
  username.innerHTML = "";
  email.innerHTML = "";
})

btnGoogle.addEventListener('click', () => {
  login.classList.add("hiden");
  logout.classList.remove("hiden");
  var provider = new firebase.auth.GoogleAuthProvider();

  //provider.setCustomParameters({
  //  'login_hint': 'user@example.com'
  //});

  firebase.auth().signInWithPopup(provider)
    .then(function (result) { console.log('Login Google') })
    .catch(function (error) {
      console.log(error.code);
      console.log(error.message);
      console.log(error.email);
      console.log(error.credential);
    });

});
