import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {FirebaseConfig} from '../ApiKeys';

  if(!firebase.apps.length){
  firebase.initializeApp(FirebaseConfig);
}

const auth = firebase.auth();
const db = firebase.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export {
	auth,
  db,
  googleProvider,
  facebookProvider,
};