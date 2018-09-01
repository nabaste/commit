import { auth,googleProvider,facebookProvider } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

  // Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

  // Sign out
export const doSignOut = () =>
  auth.signOut();

  // Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);


export const doSignInWithPopup = (Provider) =>
	auth.signInWithPopup(Provider)

	// .then(function(result) {
	//   // This gives you a Google Access Token. You can use it to access the Google API.
	//   const token = result.credential.accessToken;
	//   // The signed-in user info.
	//   const user = result.user;
	//   console.log('login con exito! ' + user.displayName + token);
	// }).catch(function(error) {
	//   // Handle Errors here.
	//   const errorCode = error.code;
	//   const errorMessage = error.message;
	//   // The email of the user's account used.
	//   const email = error.email;
	//   // The firebase.auth.AuthCredential type that was used.
	//   const credential = error.credential;
	//   console.log('error en el login!' + errorMessage + errorCode + email + credential);
	// });

export { googleProvider,facebookProvider };