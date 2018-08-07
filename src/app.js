const userNameProfile = document.getElementById('user-name-profile');
const userNamePost = document.getElementById('user-name-post');
const logout = document.getElementById('logout');
const btnSave = document.getElementById('btnSave');

const post = document.getElementById('post');
const posts = document.getElementById('posts');

//Verifica si usuario esta logeado o no.
//Onload guarda informaciòn de la sesiòn iniciada lo cual permite
//no volver a ingresar datos si no se ha cerrado sesion
//Verifica si usuario esta logeado o no.
window.onload = () => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('Usuario Logueado');
      login.classList.add("hiden");
      logout.classList.remove("hiden");
      username.innerHTML = `Bienvenida ${user.displayName}`;
      //Llamando a Data Firebase///////////////////
      const ubicacionObject = firebase.database().ref('user-posts').child(user.uid);
        ubicacionObject.on('child_added', snap => {
            console.log(snap.val().body);
        })
        console.log("ubicacion  " + ubicacionObject);
      /////////////////777//////////

    } else {
      console.log('Sin usuario');
      login.classList.remove("hiden");
      logout.classList.add("hiden");
    }
  });

const bd = document.getElementById("bd");
const post = document.getElementById("post");
const posts  = document.getElementById("posts");


goToLogin = () => {
  window.location.assign("../index.html");

}


function writeUserData(userId, name, email, imageUrl) {
  console.log('mostrar ')
  firebase.database().ref('users/' + userId).set({
    name: name,
    email: email,
    profile_picture: imageUrl
  });
}


//Función escribir nuevo Post
function writeNewPost(uid, body) {
  // A post entry.
  var postData = {
    uid: uid,
    body: body,
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  firebase.database().ref().update(updates);
  return newPostKey;
}

//Boton Guardar
btnSave.addEventListener('click', () => {
  var userId = firebase.auth().currentUser.uid;
  const newPost = writeNewPost(userId, post.value);

  const nameUsers = document.createElement('p');
  nameUsers.setAttribute('id','user-name-post');

  const photoUser = document.createElement('img');
  photoUser.setAttribute('src','../../image/user.jpg');

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
  contPost.setAttribute('class','friend-post');

  var textPost = document.createElement('textarea');
  textPost.setAttribute('class','textarea-post');
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
})

