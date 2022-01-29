import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

export const signinUser = async (email, password) => {
    const result = signInWithEmailAndPassword(getAuth(), email, password);
    console.log("sigIn", result);
};

export const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    const result = signInWithPopup(getAuth(), provider);
    console.log("googlesignin", result);
};

// signInWithCredential(auth, credential).catch((error) => {
//   // Handle Errors here.
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   // The email of the user's account used.
//   const email = error.email;
//   // The AuthCredential type that was used.
//   const credential = GoogleAuthProvider.credentialFromError(error);
//   // ...
// });
