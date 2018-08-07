// Verificar si tenemos nuestro usuario logueado
window.onload = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('Usuario Logueado');
            logout.classList.remove("hiden");
            /*  username.innerHTML = `Bienvenid@ ${user.displayName}`; */
            console.log(user.uid);
        } else {
            console.log('Sin usuario');
            goToLogin();
        }
    });
}

// evento que permite cerrar sesion
btnLogout.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        console.log('Cerró Sesión');
        logout.classList.add("hiden");
        window.location.assign("../index.html");
    }).catch(function (error) {
        console.log('Error al cerrar Sesión');
    });
})

