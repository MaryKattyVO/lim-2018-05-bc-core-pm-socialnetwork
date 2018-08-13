const selectMode = document.getElementById('select-mode');
const photoUserProfile = document.getElementById('photo-user-profile');
const photoUserPost = document.getElementById('photo-user-post');
const bodyUserPost = document.getElementById('textarea-post-init');

let userFromDatabase;

window.onload = () => {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

      uid = user.uid;
      getUserForId(user.uid, (userDatabase) => {
        console.log(userDatabase);
        userFromDatabase = userDatabase;
        userNameProfile.innerHTML = userDatabase.fullName;
        userNamePost.innerHTML = userDatabase.fullName;
        photoUserProfile.style.backgroundImage = "url('" + userDatabase.profilePicture + "')";
        photoUserPost.style.backgroundImage = "url('" + userDatabase.profilePicture + "')";

      });

      let postRef = firebase.database().ref("posts");

      postRef.on('child_added', (snapshot) => {
        let post = snapshot.val();
        console.log(post);
        if (user.uid === post.uid) {
          myPosts(snapshot.key, post);
        } else if (post.mode === 'public') {
          otherPost(snapshot.key, post);
        }

      });

      postRef.on('child_changed', (snapshot) => {
        let post = snapshot.val();
        const bodyPostView = document.getElementById('textarea-' + snapshot.key);
        if (bodyPostView != null && uid !== post.uid) {
          bodyPostView.innerHTML = post.body;
        }
        console.log(post);
        const postLike = document.getElementById('count-like-' + snapshot.key);
        console.log(post.like);
        postLike.innerHTML = post.like;

      });

      postRef.on('child_removed', (snapshot) => {
        const postView = document.getElementById(snapshot.key);
        if (postView != null) {
          postView.remove();
        }
      });

    } else {
      goToLogin();
    }
  });
}

btnToPost.addEventListener('click', () => {
  if (bodyUserPost.value.trim().length === 0) {

    alert("Creo que no haz escrito algun texto para publicar");
    return;
  }

  createNewPost(uid, bodyUserPost.value, selectMode.value, userFromDatabase);
  bodyUserPost.value = "";
});

btnLogout.addEventListener('click', () => {
  firebase.auth().signOut().then(function () {
    console.log('Cerró Sesión');
    logout.classList.add("hiden");
    goToLogin();
  }).catch(function (error) {
    console.log('Error al cerrar Sesión');
  });
})


myPosts = (postKey, post) => {

  const nameUsers = document.createElement('p');
  nameUsers.setAttribute('id', 'user-name-post-' + postKey);
  nameUsers.innerHTML = post.fullName;

  const mode = document.createElement('h4');
  mode.setAttribute('id', 'mode-post-' + postKey);
  mode.innerHTML = post.mode;

  const photoUser = document.createElement('input');
  photoUser.setAttribute('type', 'button');
  photoUser.setAttribute('id', 'photo-user-post');
  photoUser.setAttribute('class', 'user-face');
  photoUser.style.backgroundImage = "url('" + post.photoURL + "')";

  const btnUpdate = document.createElement("input");
  btnUpdate.setAttribute("value", "Editar");
  btnUpdate.setAttribute("type", "button");

  const btnDelete = document.createElement("input");
  btnDelete.setAttribute("value", "Eliminar");
  btnDelete.setAttribute("type", "button");

  const contentPost = document.createElement('div');
  contentPost.setAttribute('class', 'friend-post');
  contentPost.setAttribute('id', postKey);

  const textPostSaved = document.createElement('textarea');
  textPostSaved.setAttribute('class', 'textarea-post');
  textPostSaved.setAttribute("id", 'textarea-' + postKey);
  textPostSaved.setAttribute("disabled", 'true');
  textPostSaved.innerHTML = post.body;


  contentPost.appendChild(nameUsers);
  contentPost.appendChild(mode);
  contentPost.appendChild(photoUser);
  contentPost.appendChild(textPostSaved);
  contentPost.appendChild(btnUpdate);
  contentPost.appendChild(btnDelete);

  posts.appendChild(contentPost);


  //Boton eliminar
  btnDelete.addEventListener('click', () => {

    let confirmDelete = confirm('¿Desea eliminar esta publicación?');
    if (confirmDelete) {
      firebase.database().ref().child('/user-posts/' + post.uid + '/' + postKey).remove();
      firebase.database().ref().child('posts/' + postKey).remove();
    }

  });

  //boton actualizar
  btnUpdate.addEventListener('click', () => {
    const body = document.getElementById('textarea-' + postKey);
    if (btnUpdate.value === 'Editar') {
      body.disabled = false;
      btnUpdate.value = 'Guardar';
    } else {
      const changeData = {
        body: body.value,
        mode: post.mode,
        uid: post.uid,
        photoURL: post.photoURL,
        fullName: post.fullName
      };

      var updatesUser = {};
      var updatesPost = {};

      updatesUser['/user-posts/' + post.uid + '/' + postKey] = changeData;
      updatesPost['/posts/' + postKey] = changeData;

      firebase.database().ref().update(updatesUser);
      firebase.database().ref().update(updatesPost);
      body.disabled = true;
      btnUpdate.value = 'Editar';
    }

  });
}

let count = 0;
otherPost = (postKey, post) => {

  const nameUsers = document.createElement('p');
  nameUsers.setAttribute('id', 'user-name-post');
  nameUsers.innerHTML = post.fullName;

  const mode = document.createElement('h4');
  mode.setAttribute('id', 'mode-post');
  mode.innerHTML = post.mode;
  const photoUser = document.createElement('input');
  photoUser.setAttribute('type', 'button');
  photoUser.setAttribute('id', 'photo-user-post');
  photoUser.setAttribute('class', 'user-face');
  photoUser.style.backgroundImage = "url('" + post.photoURL + "')";

  const btnLike = document.createElement('button');
  btnLike.innerHTML = `<img id="imgLike" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALASURBVGhD7Zi7bhNBFIZNgcSl4ioKEC0NHUiIAlHxBJZQZhyMKNKSlAgegFewkuysY88YI6GEgHgGJKCgSqiAUIKEQdyCAHN+c4LQcsbZtbMXS/tJv7LZPZd/Z2cv40pJSUnJZGCVPRBod80oez9Ubt0o9ylU9nOo7Uuj3QP6e93U7x7jcC+Iofw5yn2IXNT4U8utk5bRA704fHy61e5eo+1NavIh1K4/XPYbxc3bKXuY0/+yWO0eoZgFqrX5f15Eyr0f9KybPZw+Gi3dOk4j9ExsMkR0Rd6Gqn2By1SM7lwc7BNit9FTeOAyyRiY13ZDKBpPyn1valeHsC3GxJLdSHwSmDajjHxUNA1+QNKxJKL77gk8sb3toRG7JRXKVcrdYHvDma92D8a7YbOW7cEb2/SDx5hcIH8Z1b7KNv3QpVqWkguie2zTD90wL4TEQgje2KYfugIfpeRCiLyxTT8U9FVMLoDokfyFbfoZ6+WVvl6xTT8UtBpJKozoc2SFbfqhKTQnJRdBdAKzbNPPgmqfpJP4KRXIVeQp9jcRLpVYJEfFmj5bBPrOWbrjf0mFchGNfnPanWF78aCXRigWy0FYJLGt+GDpV4SPOnhYqi0dZVvJCGv2ilQ0Y9XYzmhQARMpmJ2UXWQbo9OYWd1HN/RzsUGKQk/0ZhvjgecvzcU3UqM0hF4jL+Z9BKp9GqsiqeHOyvbQi9vuLEGtcz7dJ5PtGd06x+3SASeRzpXIwPwWgze1cu9kI8mFH71Qk8tng5myp2jUxl470Bv/NWpx2WwJLndOkIm1qKkEWkMNLpcPzenmIRrFx4K5oUIOcrlMvtC3yn568TySjEpCLHI4vRg0Zhq743zBIgaxnFYs+pX+Lnqi3JaMQziGGA4vLmR09t8FEbaxjw9PBoHqKDK+CWGbd08Woe5cgvjfkpKSkiiVym9E/7T2Q9wMrAAAAABJRU5ErkJggg==">
  `;//<label id="countLike">0</label>
  const like = document.createElement('label');
  like.setAttribute('id', 'count-like-' + postKey);
  like.innerHTML = post.like;

  const contentPost = document.createElement('div');
  contentPost.setAttribute('class', 'friend-post');
  contentPost.setAttribute('id', postKey);

  const textPostSaved = document.createElement('textarea');
  textPostSaved.setAttribute('class', 'textarea-post');
  textPostSaved.setAttribute("id", 'textarea-' + postKey);
  textPostSaved.setAttribute("disabled", 'true');
  textPostSaved.innerHTML = post.body;

  contentPost.appendChild(nameUsers);
  contentPost.appendChild(mode);
  contentPost.appendChild(photoUser);
  contentPost.appendChild(textPostSaved);
  contentPost.appendChild(btnLike);
  contentPost.appendChild(like);

  posts.appendChild(contentPost);

  //const countLike = document.getElementById('countLike');
  btnLike.addEventListener('click', () => {
    const body = document.getElementById('textarea-' + postKey);
    const postLike = document.getElementById('count-like-' + postKey);
    console.log('click en like');

    const changeData = {
      uid: post.uid,
      body: body.value,
      mode: post.mode,
      fullName: post.fullName,
      photoURL: post.photoURL,
      like: parseInt(postLike.innerHTML) + 1
    };

    var updatesUser = {};
    var updatesPost = {};

    updatesUser['/user-posts/' + post.uid + '/' + postKey] = changeData;
    updatesPost['/posts/' + postKey] = changeData;

    firebase.database().ref().update(updatesUser);
    firebase.database().ref().update(updatesPost);

  })
}
