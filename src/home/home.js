selectMode = document.getElementById('select-mode');


// Verificar si tenemos nuestro usuario logueado
window.onload = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('Usuario Logueado');
            logout.classList.remove("hiden");
            userNameProfile.innerHTML = `${user.displayName}`;
            userNamePost.innerHTML = `${user.displayName}`;
            photo.innerHTML = `<div><img src="${user.photoURL}" alt="perfil" width="50" height="50"><div>`
            console.log(user.uid);

            //Llamando a Data Firebase///////////////////
            const ubicacionObject = firebase.database().ref('user-posts').child(user.uid);
            ubicacionObject.on('child_added', snap => {
                console.log(snap.val().body);
            });
            console.log("ubicacion  " + ubicacionObject)
            /////////////////777//////////

        } else {
            console.log('Sin usuario');
            goToLogin();
        }
    });
}
/////LLAMANDO DATOS ///////////////////7777777777


// evento que permite cerrar sesion
btnLogout.addEventListener('click', () => {
    firebase.auth().signOut().then(function () {
        console.log('Cerró Sesión');
        logout.classList.add("hiden");
        goToLogin();
    }).catch(function (error) {
        console.log('Error al cerrar Sesión');
    });
})

//contador de click
const contador = document.getElementById('contar');
const sumando = document.getElementById('contador');

let contandoAlDarleClick = 0;
contador.addEventListener('click', () => {
    sumando.innerHTML = contandoAlDarleClick += 1;
})


selectMode.addEventListener('change', () => {
    let mode = '';
    if (selectMode.value === 'public') {
        mode = 'Público';
    } else {
        mode = 'Solo yo';
    }

    console.log(mode);
})




//Boton Guardar
btnToPost.addEventListener('click', () => {
    var userId = firebase.auth().currentUser.uid;
    const newPost = writeNewPost(userId, post.value);

    const nameUsers = document.createElement('p');
    nameUsers.setAttribute('id', user.displayName);

    const photoUser = document.createElement('img');
    photoUser.setAttribute('src', '../../image/user.jpg');

    var btnUpdate = document.createElement("input");
    btnUpdate.setAttribute("value", "Editar");
    btnUpdate.setAttribute("type", "button");

    var btnDelete = document.createElement("input");
    btnDelete.setAttribute("value", "Eliminar");
    btnDelete.setAttribute("type", "button");

    const btnLike = document.createElement('input');
    btnLike.setAttribute("value", "Me gusta");
    btnLike.setAttribute("type", "button");

    var contPost = document.createElement('div');
    contPost.setAttribute('class', 'friend-post');

    var textPost = document.createElement('textarea');
    textPost.setAttribute('class', 'textarea-post');
    textPost.setAttribute("id", newPost);


    textPost.innerHTML = post.value;
    //Boton eliminar
    btnDelete.addEventListener('click', () => {

        firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
        firebase.database().ref().child('posts/' + newPost).remove();

        while (posts.firstChild) posts.removeChild(posts.firstChild);

        alert('The user is deleted successfully!');
        reload_page();

    });
    //boton actualizar
    btnUpdate.addEventListener('click', () => {
        const newUpdate = document.getElementById(newPost);
        const nuevoPost = {
            body: newUpdate.value,
        };

        var updatesUser = {};
        var updatesPost = {};

        updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
        updatesPost['/posts/' + newPost] = nuevoPost;

        firebase.database().ref().update(updatesUser);
        firebase.database().ref().update(updatesPost);

    });

    contPost.appendChild(nameUsers);
    contPost.appendChild(photoUser);
    contPost.appendChild(textPost);
    contPost.appendChild(btnUpdate);
    contPost.appendChild(btnDelete);
    contPost.appendChild(btnLike);
    posts.appendChild(contPost);
});

