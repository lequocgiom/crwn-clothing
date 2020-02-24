import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMjK7HupytGs_rgmbi0U0RmDGVtrG-pCM",
  authDomain: "crown-clothing-60347.firebaseapp.com",
  databaseURL: "https://crown-clothing-60347.firebaseio.com",
  projectId: "crown-clothing-60347",
  storageBucket: "crown-clothing-60347.appspot.com",
  messagingSenderId: "416111666817",
  appId: "1:416111666817:web:adb14c6ffd156483318f80",
  measurementId: "G-8M7LDQH2KZ"
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
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: "select_acount" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
