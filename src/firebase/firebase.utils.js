import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyBEdB7NAxyENto7UVV3XgGMC6E9N2zwPJs",
  authDomain: "crwn-clothing-38b5b.firebaseapp.com",
  projectId: "crwn-clothing-38b5b",
  storageBucket: "crwn-clothing-38b5b.appspot.com",
  messagingSenderId: "829178915348",
  appId: "1:829178915348:web:5d2b2169e0d769ab78d501",
  measurementId: "G-Y8D73M54FX"
}

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData)=>{
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { displayName, email }= userAuth;
    const createdAt = new Date();
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){
      console.log("error creating user", error.message);
    }
  }
  return userRef
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;