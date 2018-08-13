const userNameProfile = document.getElementById('user-name-profile');
const userNamePost = document.getElementById('user-name-post');
const logout = document.getElementById('logout');
const btnToPost = document.getElementById('btnSave');
const postState = document.getElementById('post-state');

const bd = document.getElementById("bd");
const textareaPostInicial = document.getElementById('textarea-post-init');
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
  firebase.database().ref('users/' + user.uid).set({
    fullName: user.displayName,
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

getPostForId = (uid, callback) => {
  const ubicationPosts = firebase.database().ref('user-posts').child(uid);
  ubicationPosts.on('value', snap => {
    callback(snap.val());
  });
}

getPost = (uid, callback) => {
  const ubicationPosts = firebase.database().ref('posts');
  ubicationPosts.once('value', (snap) => {
    callback(snap);
  })
}

createNewPost = (uid, body, mode, user) => {

  let postData = {
    uid: uid,
    body: body,
    mode: mode,
    fullName: user.fullName,
    photoURL: user.profilePicture,
    like: 0,
    // created: new Date().getTime()
  };

  var newPostKey = firebase.database().ref().child('posts').push().key;
  var updates = {};

  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  firebase.database().ref().update(updates);
}
