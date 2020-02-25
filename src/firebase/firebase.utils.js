import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA4WoC6jHTceZXTc7o9Q7C8-HKH_7nZ2t4",
  authDomain: "crwn-db-17cf3.firebaseapp.com",
  databaseURL: "https://crwn-db-17cf3.firebaseio.com",
  projectId: "crwn-db-17cf3",
  storageBucket: "crwn-db-17cf3.appspot.com",
  messagingSenderId: "258016609171",
  appId: "1:258016609171:web:c6dcf1acdc5a60acfb9e66"
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
        ...additionalData   
      })    
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
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;