


// Verificar si tenemos nuestro usuario logueado
window.onload = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('Usuario Logueado');
            logout.classList.remove("hiden");
            userNameProfile.innerHTML = `${user.displayName}`;
            userNamePost.innerHTML = `${user.displayName}`;
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
        goToLogin();

    }).catch(function (error) {
        console.log('Error al cerrar Sesión');
    });
})

