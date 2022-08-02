import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyC7eXkFqcJX_4sGxdKI86qEJm6IEb4PVoU",
  authDomain: "crwn-db-837f1.firebaseapp.com",
  projectId: "crwn-db-837f1",
  storageBucket: "crwn-db-837f1.appspot.com",
  messagingSenderId: "703446682448",
  appId: "1:703446682448:web:33a1f28372bab67b633a55",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

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
    } catch (e) {
      console.log("Error occured ", e);
    }
  }
  return userRef;
};

export const hasAccount = async (email) => {
  try {
    const userSnap = await firestore
      .collection("users")
      .where("email", "==", email.toLowerCase())
      .get();
    if (userSnap.empty) return false;
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const updateMobile = async (id, mobileNo) => {
  try {
    const userRef = firestore.collection("users");
    await userRef.doc(id).update({
      mobileNo,
    });
  } catch (e) {
    console.log(e);
  }
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
