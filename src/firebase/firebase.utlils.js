import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAvKw4m0G7_sRgnvl0tNqDZXZqx0adFcmw',
  authDomain: 'crwn-db-15e6d.firebaseapp.com',
  databaseURL: 'https://crwn-db-15e6d.firebaseio.com',
  projectId: 'crwn-db-15e6d',
  storageBucket: 'crwn-db-15e6d.appspot.com',
  messagingSenderId: '659660649651',
  appId: '1:659660649651:web:79da4a04b37444f9fd2cc6',
  measurementId: 'G-XP272F90V0',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// this is to always use the google popup for Auth/Signin for Google accounts on the website
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
