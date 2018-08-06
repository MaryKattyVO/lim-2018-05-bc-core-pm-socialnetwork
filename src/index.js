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

btnRegister.addEventListener('click', () => {
    login.classList.add("hiden");
    register.classList.remove("hiden");
})

// Evento que registra a un nuevo usuario
registerUser.addEventListener('click', () => {

    firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRegister1.value)
        .then(() => {
            var user = firebase.auth().currentUser; //accede al usuario que se registro
            console.log(user);
            //logout.classList.remove("hiden");
            //console.log(data);
            window.location.assign("home/home.html");

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
        .then(() => {
            console.log('Verificado')
            logout.classList.remove("hiden");
            window.location.assign("home/home.html");
            username.innerHTML = "";
            email.innerHTML = "";
        })
        .catch(function (error) {
            console.log('Contraseña Incorrecta')
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
            console.log('Logueado con Fb')
            logout.classList.remove("hiden");
            window.location.assign("home/home.html");

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
            logout.classList.remove("hiden");
            window.location.assign("home/home.html");
        })
        .catch(function (error) {
            console.log(error.code);
            console.log(error.message);
            console.log(error.email);
            console.log(error.credential);
        });
});


//LOGIN validación correo 
document.getElementById('email').addEventListener('input',() => {
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
  document.getElementById('email-register').addEventListener('input',() => {
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
        
    emailRegex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,10})$/i;
  
    if (emailRegex.test(campo.value)) {
      valido.innerText = "Contraseña segura";
    } else {
      valido.innerText = "Mínimo 8 caracteres entre números y letras";
    }
  });
  
  //REGISTER validación contraseña
  document.getElementById('password-register1').addEventListener('input', () => {
    campo = event.target;
    valido = document.getElementById('passwordOK2');
        
    emailRegex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,10})$/i;
  
    if (emailRegex.test(campo.value)) {
      valido.innerText = "Contraseña segura";
    } else {
      valido.innerText = "Mínimo 8 caracteres entre números y letras";
    }
  });
  
  //Checkbox 
  //if(document.getElementById("myCheck").checked === true){
    const checkbox = document.getElementById('register-terminos');
    checkbox.addEventListener("change", validaCheckbox, false);
      valido = document.getElementById("checkboxOK");
    function validaCheckbox(){
      const checked = checkbox.checked;
      if(checked){
        valido.innerText ='checkbox está seleccionado'; 
      }
    }