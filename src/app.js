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

updateOrCreateUser = (user) => {
  firebase.database().ref('users/' + user.uid).set(
    {
      fullname: user.displayName,
      email: user.email,
      profile_picture: user.photoURL
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

//Pintar post de usuarios
const writeNewPost = (uid, body) => {

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
