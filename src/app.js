const userNameProfile = document.getElementById('user-name-profile');
const userNamePost = document.getElementById('user-name-post');
const logout = document.getElementById('logout');
const btnToPost = document.getElementById('btnSave');
const postState = document.getElementById('post-state');

const bd = document.getElementById("bd");
const post = document.getElementById('post');
const posts = document.getElementById('posts');

goToHome = () => {
  window.location.assign("home/home.html");
}

goToLogin = () => {
  window.location.assign("../index.html");
};

getUserForId = (uid, callback) => {
  const userRef = firebase.database().ref('users/' + uid);
  userRef.once('value', (snap) => {
    callback(snap.val());
  })
}

updateOrCreateUser = (user) => {
  firebase.database().ref('users/' + user.uid).set(
    {
<<<<<<< HEAD
      fullname: user.displayName,
=======
      //Valores que se van a crear en la BD
      fullName: user.displayName,
>>>>>>> cfc252087dec0f046e0c497d0113fd57c4dab628
      email: user.email,
      profilePicture: user.photoURL
    },
    
    (error) => {
      if (error) {
        console.log(error);
        console.log("error al guardar data");
      } else {
        console.log("data guardada");
        goToHome();
      }
    }
  );
}

<<<<<<< HEAD
//Pintar post de usuarios
const writeNewPost = (uid, body) => {
=======
getPostForId = (uid, callback) => {
  const ubicationPosts = firebase.database().ref('user-posts').child(uid);
  ubicationPosts.on('value', snap => {
    callback(snap.val());
  });
}

getPost = (callback) => {
  const ubicationPosts = firebase.database().ref('posts');
  ubicationPosts.once('value', (snap) => {
    callback(snap);
  })
}

writeNewPost = (uid, body, mode) => {
  var postData = {
    uid: uid, //  ESTO ES EL ID DE USUARIO
    body: body, // ESTO ES EL CONTENIDO DEL TEXTAREA
    mode: mode,
  };
>>>>>>> cfc252087dec0f046e0c497d0113fd57c4dab628

  var newPostKey = firebase.database().ref().child('posts').push().key;

  var postData = {
    uid: uid, 
    body: body,
    key: newPostKey,
    like: 0 
  };
  
  //Escribir nuevo post
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  firebase.database().ref().update(updates);
  return newPostKey;

  const returnData = (uid) => {
    console.log('usuario UID : '+ uid);
  }
}

//Llamar datos
const returnData = (uid) => {
  console.log('Uid de usuario'+uid);
}
