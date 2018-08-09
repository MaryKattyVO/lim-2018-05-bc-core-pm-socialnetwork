const selectMode = document.getElementById('select-mode');

const photoUserProfile = document.getElementById('photo-user-profile');
const photoUserPost = document.getElementById('photo-user-post');

let newPostObject = {};

window.onload = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
<<<<<<< HEAD
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

=======
            newPostObject.uid = firebase.auth().currentUser.uid;

            getUserForId(user.uid, (userDatabase) => {
                console.log(userDatabase);
                userNameProfile.innerHTML = userDatabase.fullName;
                userNamePost.innerHTML = userDatabase.fullName;
                photoUserProfile.style.backgroundImage = "url('" + userDatabase.profilePicture + "')";
                photoUserPost.style.backgroundImage = "url('" + userDatabase.profilePicture + "')";

                getPost((snap) => {
                    snap.forEach(element => {
                        console.log(element.val());
                        console.log(element);

                        if (user.uid === element.val().uid) {
                            myPosts(element.key, element.val().body, element.val().mode, userDatabase.fullName, userDatabase.profilePicture);
                        } else {
                            otherPost(element.key, element.val().body, element.val().mode);
                        }
                    });
                });
            })

            newPostObject.uid = firebase.auth().currentUser.uid;
>>>>>>> cfc252087dec0f046e0c497d0113fd57c4dab628
        } else {
            console.log('Sin usuario');
            goToLogin();
        }
    });
}
/////LLAMANDO DATOS ///////////////////7777777777



/* const contador = document.getElementById('contar');
const sumando = document.getElementById('contador');
let count = 0;
let contandoAlDarleClick = 0;
contador.addEventListener('click', () => {
    count = contandoAlDarleClick += 1;
    sumando.innerHTML = count;
    postObject.countLike = count;
}); */


myPosts = (newPostKey, postBody, postMode, userFullName, userPhoto) => {

    const nameUsers = document.createElement('p');
    nameUsers.setAttribute('id', 'userNamePost');
    nameUsers.innerHTML = userFullName;

    const photoUser = document.createElement('input');
    photoUser.setAttribute('type', 'button');
    photoUser.setAttribute('id', 'photo-user-post');
    photoUser.setAttribute('class', 'user-face');
    photoUser.style.backgroundImage = "url('" + userPhoto + "')";

    const btnUpdate = document.createElement("input");
    btnUpdate.setAttribute("value", "Editar");
    btnUpdate.setAttribute("type", "button");

    const btnDelete = document.createElement("input");
    btnDelete.setAttribute("value", "Eliminar");
    btnDelete.setAttribute("type", "button");

    const btnLike = document.createElement('button');
    btnLike.style.border = 'none';
    btnLike.innerHTML = `<button value="Me gusta" id="contar" class="button-like"><img id="imgLike" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALASURBVGhD7Zi7bhNBFIZNgcSl4ioKEC0NHUiIAlHxBJZQZhyMKNKSlAgegFewkuysY88YI6GEgHgGJKCgSqiAUIKEQdyCAHN+c4LQcsbZtbMXS/tJv7LZPZd/Z2cv40pJSUnJZGCVPRBod80oez9Ubt0o9ylU9nOo7Uuj3QP6e93U7x7jcC+Iofw5yn2IXNT4U8utk5bRA704fHy61e5eo+1NavIh1K4/XPYbxc3bKXuY0/+yWO0eoZgFqrX5f15Eyr0f9KybPZw+Gi3dOk4j9ExsMkR0Rd6Gqn2By1SM7lwc7BNit9FTeOAyyRiY13ZDKBpPyn1valeHsC3GxJLdSHwSmDajjHxUNA1+QNKxJKL77gk8sb3toRG7JRXKVcrdYHvDma92D8a7YbOW7cEb2/SDx5hcIH8Z1b7KNv3QpVqWkguie2zTD90wL4TEQgje2KYfugIfpeRCiLyxTT8U9FVMLoDokfyFbfoZ6+WVvl6xTT8UtBpJKozoc2SFbfqhKTQnJRdBdAKzbNPPgmqfpJP4KRXIVeQp9jcRLpVYJEfFmj5bBPrOWbrjf0mFchGNfnPanWF78aCXRigWy0FYJLGt+GDpV4SPOnhYqi0dZVvJCGv2ilQ0Y9XYzmhQARMpmJ2UXWQbo9OYWd1HN/RzsUGKQk/0ZhvjgecvzcU3UqM0hF4jL+Z9BKp9GqsiqeHOyvbQi9vuLEGtcz7dJ5PtGd06x+3SASeRzpXIwPwWgze1cu9kI8mFH71Qk8tng5myp2jUxl470Bv/NWpx2WwJLndOkIm1qKkEWkMNLpcPzenmIRrFx4K5oUIOcrlMvtC3yn568TySjEpCLHI4vRg0Zhq743zBIgaxnFYs+pX+Lnqi3JaMQziGGA4vLmR09t8FEbaxjw9PBoHqKDK+CWGbd08Woe5cgvjfkpKSkiiVym9E/7T2Q9wMrAAAAABJRU5ErkJggg==">
    <label id="contador">0</label></button>`;

    const contPost = document.createElement('div');
    contPost.setAttribute('class', 'friend-post');

    const textPost = document.createElement('textarea');
    textPost.setAttribute('class', 'textarea-post');
    textPost.setAttribute("id", newPostKey);
    textPost.innerHTML = postBody;

    const contador = document.getElementById('contar');
    const sumando = document.getElementById('contador');
    let count = 0;
    let contandoAlDarleClick = 0;
    btnLike.addEventListener('click', () => {
        count = contandoAlDarleClick += 1;
        sumando.innerHTML = count;
        postObject.countLike = count;
    });

    btnDelete.addEventListener('click', () => {

        let respDelete = confirm('¿Desea eliminar este post?');

        if (respDelete == true) {
            firebase.database().ref().child('/user-posts/' + newPostObject.uid + '/' + newPost).remove();
            firebase.database().ref().child('posts/' + newPost).remove();
            while (posts.firstChild) posts.removeChild(posts.firstChild);
            alert('Completado!');
            reload_page();
        }

    });

    btnUpdate.addEventListener('click', () => {

        btnUpdate.setAttribute('value', 'Guardar');
        textPost.autofocus;

        const newUpdate = document.getElementById(newPostKey);
        const nuevoPost = {
            body: newUpdate.value,
            mode: selectMode.value,
            uid: newPostObject.uid
        };

        var updatesUser = {};
        var updatesPost = {};

        updatesUser['/user-posts/' + newPostObject.uid + '/' + newPostKey] = nuevoPost;
        updatesPost['/posts/' + newPostKey] = nuevoPost;

        firebase.database().ref().update(updatesUser);
        firebase.database().ref().update(updatesPost);


    });


    contPost.appendChild(nameUsers);
    contPost.appendChild(photoUser);
    contPost.appendChild(textPost);
    contPost.appendChild(btnLike);
    contPost.appendChild(btnUpdate);
    contPost.appendChild(btnDelete);

    posts.appendChild(contPost);
}

otherPost = (newPostKey, postBody, postMode) => {

    const nameUsers = document.createElement('p');
    nameUsers.setAttribute('id', userNamePost);

    const photoUser = document.createElement('input');
    photoUser.setAttribute('type', 'button');
    photoUser.setAttribute('id', 'photo-user-post');
    photoUser.setAttribute('class', 'user-face');

    const btnLike = document.createElement('button');
    btnLike.style.border = 'none';
    btnLike.innerHTML = `<button value="Me gusta" id="contar" class="button-like"><img id="imgLike" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALASURBVGhD7Zi7bhNBFIZNgcSl4ioKEC0NHUiIAlHxBJZQZhyMKNKSlAgegFewkuysY88YI6GEgHgGJKCgSqiAUIKEQdyCAHN+c4LQcsbZtbMXS/tJv7LZPZd/Z2cv40pJSUnJZGCVPRBod80oez9Ubt0o9ylU9nOo7Uuj3QP6e93U7x7jcC+Iofw5yn2IXNT4U8utk5bRA704fHy61e5eo+1NavIh1K4/XPYbxc3bKXuY0/+yWO0eoZgFqrX5f15Eyr0f9KybPZw+Gi3dOk4j9ExsMkR0Rd6Gqn2By1SM7lwc7BNit9FTeOAyyRiY13ZDKBpPyn1valeHsC3GxJLdSHwSmDajjHxUNA1+QNKxJKL77gk8sb3toRG7JRXKVcrdYHvDma92D8a7YbOW7cEb2/SDx5hcIH8Z1b7KNv3QpVqWkguie2zTD90wL4TEQgje2KYfugIfpeRCiLyxTT8U9FVMLoDokfyFbfoZ6+WVvl6xTT8UtBpJKozoc2SFbfqhKTQnJRdBdAKzbNPPgmqfpJP4KRXIVeQp9jcRLpVYJEfFmj5bBPrOWbrjf0mFchGNfnPanWF78aCXRigWy0FYJLGt+GDpV4SPOnhYqi0dZVvJCGv2ilQ0Y9XYzmhQARMpmJ2UXWQbo9OYWd1HN/RzsUGKQk/0ZhvjgecvzcU3UqM0hF4jL+Z9BKp9GqsiqeHOyvbQi9vuLEGtcz7dJ5PtGd06x+3SASeRzpXIwPwWgze1cu9kI8mFH71Qk8tng5myp2jUxl470Bv/NWpx2WwJLndOkIm1qKkEWkMNLpcPzenmIRrFx4K5oUIOcrlMvtC3yn568TySjEpCLHI4vRg0Zhq743zBIgaxnFYs+pX+Lnqi3JaMQziGGA4vLmR09t8FEbaxjw9PBoHqKDK+CWGbd08Woe5cgvjfkpKSkiiVym9E/7T2Q9wMrAAAAABJRU5ErkJggg==">
    <label id="contador">0</label></button>`;

    const contPost = document.createElement('div');
    contPost.setAttribute('class', 'friend-post');

    const textPost = document.createElement('textarea');
    textPost.setAttribute('class', 'textarea-post');
    textPost.setAttribute("id", newPostKey);
    textPost.innerHTML = postBody;

    contPost.appendChild(nameUsers);
    contPost.appendChild(photoUser);
    contPost.appendChild(textPost);
    contPost.appendChild(btnLike);

    posts.appendChild(contPost);

}

btnToPost.addEventListener('click', () => {
    newPostObject.mode = selectMode.value;
    newPostObject.body = post.value;

    if (newPostObject.body.length === 0) {
        alert("Creo que no haz escrito algun texto para publicar");
        return;
    }

    newPost = writeNewPost(newPostObject.uid, newPostObject.body, newPostObject.mode);

    const nameUsers = document.createElement('p');
    nameUsers.setAttribute('id', userNamePost);

    const photoUser = document.createElement('img');
    photoUser.setAttribute('src', '../../image/user.jpg');

    var btnUpdate = document.createElement("input");
    btnUpdate.setAttribute("value", "Editar");
    btnUpdate.setAttribute("type", "button");

    var btnDelete = document.createElement("input");
    btnDelete.setAttribute("value", "Eliminar");
    btnDelete.setAttribute("type", "button");

    const btnLike = document.createElement('div');
    btnLike.innerHTML = `<button value="Me gusta" id="contar" class="button-like"><img id="imgLike" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALASURBVGhD7Zi7bhNBFIZNgcSl4ioKEC0NHUiIAlHxBJZQZhyMKNKSlAgegFewkuysY88YI6GEgHgGJKCgSqiAUIKEQdyCAHN+c4LQcsbZtbMXS/tJv7LZPZd/Z2cv40pJSUnJZGCVPRBod80oez9Ubt0o9ylU9nOo7Uuj3QP6e93U7x7jcC+Iofw5yn2IXNT4U8utk5bRA704fHy61e5eo+1NavIh1K4/XPYbxc3bKXuY0/+yWO0eoZgFqrX5f15Eyr0f9KybPZw+Gi3dOk4j9ExsMkR0Rd6Gqn2By1SM7lwc7BNit9FTeOAyyRiY13ZDKBpPyn1valeHsC3GxJLdSHwSmDajjHxUNA1+QNKxJKL77gk8sb3toRG7JRXKVcrdYHvDma92D8a7YbOW7cEb2/SDx5hcIH8Z1b7KNv3QpVqWkguie2zTD90wL4TEQgje2KYfugIfpeRCiLyxTT8U9FVMLoDokfyFbfoZ6+WVvl6xTT8UtBpJKozoc2SFbfqhKTQnJRdBdAKzbNPPgmqfpJP4KRXIVeQp9jcRLpVYJEfFmj5bBPrOWbrjf0mFchGNfnPanWF78aCXRigWy0FYJLGt+GDpV4SPOnhYqi0dZVvJCGv2ilQ0Y9XYzmhQARMpmJ2UXWQbo9OYWd1HN/RzsUGKQk/0ZhvjgecvzcU3UqM0hF4jL+Z9BKp9GqsiqeHOyvbQi9vuLEGtcz7dJ5PtGd06x+3SASeRzpXIwPwWgze1cu9kI8mFH71Qk8tng5myp2jUxl470Bv/NWpx2WwJLndOkIm1qKkEWkMNLpcPzenmIRrFx4K5oUIOcrlMvtC3yn568TySjEpCLHI4vRg0Zhq743zBIgaxnFYs+pX+Lnqi3JaMQziGGA4vLmR09t8FEbaxjw9PBoHqKDK+CWGbd08Woe5cgvjfkpKSkiiVym9E/7T2Q9wMrAAAAABJRU5ErkJggg==">
    <label id="contador">0</label></button>`;

    var contPost = document.createElement('div');
    contPost.setAttribute('class', 'friend-post');

    var textPost = document.createElement('textarea');
    textPost.setAttribute('class', 'textarea-post');
    textPost.setAttribute("id", newPost);


    textPost.innerHTML = post.value;
    //Boton eliminar
    btnDelete.addEventListener('click', () => {

        let respDelete = confirm('¿Desea eliminar este post?');

        if (respDelete === true) {
            firebase.database().ref().child('/user-posts/' + newPostObject.uid + '/' + newPost).remove();
            firebase.database().ref().child('posts/' + newPost).remove();
            while (posts.firstChild) posts.removeChild(posts.firstChild);
            alert('Completado!');
            reload_page();
        }

    });
    //boton actualizar
    btnUpdate.addEventListener('click', () => {

        btnUpdate.setAttribute('value', 'Guardar');
        btnUpdate.setAttribute('id', 'bntSave');
        post.autofocus;

        const btnSave = document.getElementById('btnSave');
        btnSave.addEventListener('click', () => {
            const newUpdate = document.getElementById(newPost);
            const nuevoPost = {
                body: newUpdate.value,
                mode: selectMode.value,
                uid: newPostObject.uid

            };

            var updatesUser = {};
            var updatesPost = {};

            updatesUser['/user-posts/' + newPostObject.uid + '/' + newPost] = nuevoPost;
            updatesPost['/posts/' + newPost] = nuevoPost;

            firebase.database().ref().update(updatesUser);
            firebase.database().ref().update(updatesPost);

            btnSave.setAttribute('value', 'editar');
            btnSave.setAttribute('id', 'btnUpdate');
        })

    });

    contPost.appendChild(nameUsers);
    contPost.appendChild(photoUser);
    contPost.appendChild(textPost);
    contPost.appendChild(btnUpdate);
    contPost.appendChild(btnDelete);
    contPost.appendChild(btnLike);
    posts.appendChild(contPost);

    post.value = "";

});

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