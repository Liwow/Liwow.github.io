function exampleCode() {
  var db = firebase.firestore();
  db.collection("users")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
}

function signIn() {
  event.preventDefault();
  const form = event.target.elements;
  const email = form[0].value;
  const password = form[1].value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage + "\n See following error code: " + errorCode);
    });
}

function newAccount() {
  event.preventDefault();
  const form = event.target.elements;
  const email = form[0].value;
  const password = form[1].value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage + "\n See following error code: " + errorCode);
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      document.location.replace("./index.html");
    })
    .catch(function(error) {
      alert(error);
    });
}

function googleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithRedirect(provider);
}

function loadUser() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      if (photoURL == null) {
        photoURL =
          "http://nasmark.nu/wp-content/themes/camyno/assets/img/anonymous.png";
      }

      document.getElementById("userName").innerHTML = displayName;
      document.getElementById("emailadress").innerHTML = email;
      document.getElementById("profilePicture").src = photoURL;
      document.getElementById("displayName").innerHTML = uid;
    } else {
      document.location.replace("./index.html");
    }
  });
}

// Step 1.
// User tries to sign in to Google.
/*
auth
  .signInWithPopup(new firebase.auth.GoogleAuthProvider())
  .catch(function(error) {
    // An error happened.
    if (error.code === "auth/account-exists-with-different-credential") {
      // Step 2.
      // User's email already exists.
      // The pending Google credential.
      var pendingCred = error.credential;
      // The provider account's email address.
      var email = error.email;
      // Get sign-in methods for this email.
      auth.fetchSignInMethodsForEmail(email).then(function(methods) {
        // Step 3.
        // If the user has several sign-in methods,
        // the first method in the list will be the "recommended" method to use.
        if (methods[0] === "password") {
          // Asks the user their password.
          // In real scenario, you should handle this asynchronously.
          var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
          auth
            .signInWithEmailAndPassword(email, password)
            .then(function(user) {
              // Step 4a.
              return user.linkWithCredential(pendingCred);
            })
            .then(function() {
              // Google account successfully linked to the existing Firebase user.
              goToApp();
            });
          return;
        }
        // All the other cases are external providers.
        // Construct provider object for that provider.
        // TODO: implement getProviderForProviderId.
        var provider = getProviderForProviderId(methods[0]);
        // At this point, you should let the user know that he already has an account
        // but with a different provider, and let him validate the fact he wants to
        // sign in with this provider.
        // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
        // so in real scenario you should ask the user to click on a "continue" button
        // that will trigger the signInWithPopup.
        auth.signInWithPopup(provider).then(function(result) {
          // Remember that the user may have signed in with an account that has a different email
          // address than the first one. This can happen as Firebase doesn't control the provider's
          // sign in flow and the user is free to login using whichever account he owns.
          // Step 4b.
          // Link to Google credential.
          // As we have access to the pending credential, we can directly call the link method.
          result.user
            .linkAndRetrieveDataWithCredential(pendingCred)
            .then(function(usercred) {
              // Google account successfully linked to the existing Firebase user.
              goToApp();
            });
        });
      });
    }
  });*/
