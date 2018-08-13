const login = document.getElementById('login');
const email = document.getElementById('email');
const password = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');

const btnFacebook = document.getElementById('btnFacebook');
const btnGoogle = document.getElementById('btnGoogle');
const btnRegister = document.getElementById('btnRegister');

const register = document.getElementById('register');
const nameRegister = document.getElementById('name-register');
const lastName = document.getElementById('lastname-register');
const emailRegister = document.getElementById('email-register');
const passwordRegister1 = document.getElementById('password-register1');
const passwordRegister2 = document.getElementById('password-register2');
const registerTerminos = document.getElementById('register-terminos');
const registerUser = document.getElementById('btn-register-user');


window.onload = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('Usuario Logueado');
      setTimeout(() => {
        goToHome();
      }, 1000);
    } else {
      console.log('Sin usuario');
    }
  });
}

btnRegister.addEventListener('click', () => {
  login.classList.add("hiden");
  register.classList.remove("hiden");
})

// Evento que registra a un nuevo usuario
registerUser.addEventListener('click', () => {
  firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRegister1.value)
    .then(function () {

      let user = {
        uid: firebase.auth().currentUser.uid,
        email: emailRegister.value,
        displayName: nameRegister.value + ' ' + lastName.value,
        photoURL: ''
      }

      updateOrCreateUser(user);
    })
    .catch(function (error) {
      console.log(error.code, ' : ', error.message);
      login.classList.add("hiden");
      register.classList.remove("hiden");
    });
})

// Evento que permite entrar a la red social usando correo y contraseña
btnLogin.addEventListener('click', () => {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(function () {
      console.log('Verificado');
      username.innerHTML = "";
      email.innerHTML = "";

    })
    .catch(function (error) {
      console.log('Contraseña Incorrecta');
      console.log(errorCode, errorMessage);
    });
})

// evento que permite iniciar sesion con una cuenta de Facebook
btnFacebook.addEventListener('click', () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;
      updateOrCreateUser(user);
    })
    .catch(function (error) {
      console.log(error.code);
      console.log(error.message);
      console.log(error.email);
      console.log(error.credential);
    });
})

// evento que permite iniciar sesion con una cuenta de google
btnGoogle.addEventListener('click', () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(function (result) {
      console.log('Login Google');
      var user = result.user;
      updateOrCreateUser(user);
    })
    .catch(function (error) {
      console.log(error.code);
      console.log(error.message);
      console.log(error.email);
      console.log(error.credential);
    });
});


//LOGIN validación correo
document.getElementById('email').addEventListener('input', () => {
  campo = event.target;
  valido = document.getElementById('emailOK');

  emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  if (emailRegex.test(campo.value)) {
    valido.innerText = "Válido";
  } else {
    valido.innerText = "Por favor escribe correctamente tu correo";
  }
});


//REGISTER validación correo
document.getElementById('email-register').addEventListener('input', () => {
  campo = event.target;
  valido = document.getElementById('emailOK2');

  emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  if (emailRegex.test(campo.value)) {
    valido.innerText = "Válido";
  } else {
    valido.innerText = "Por favor escribe correctamente tu correo";
  }
});


//LOGIN validación contraseña
document.getElementById('password').addEventListener('input', () => {
  campo = event.target;
  valido = document.getElementById('passwordOK');

  emailRegex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,10})$/i;

  if (emailRegex.test(campo.value)) {
    valido.innerText = "Contraseña segura";
  } else {
    valido.innerText = "Mínimo 6 caracteres entre números y letras";
  }
});

//REGISTER validación contraseña
document.getElementById('password-register1').addEventListener('input', () => {
  campo = event.target;
  valido = document.getElementById('passwordOK2');

  emailRegex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,10})$/i;

  if (emailRegex.test(campo.value)) {
    valido.innerText = "Contraseña segura";
  } else {
    valido.innerText = "Mínimo 6 caracteres entre números y letras";
  }
});
