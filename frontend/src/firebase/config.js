import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB7fVOVXXdZzJdG8uzbYCM0Ju53O0Nv6D0",
    authDomain: "ecommerce-5e4c7.firebaseapp.com",
    databaseURL: "https://ecommerce-5e4c7-default-rtdb.firebaseio.com",
    projectId: "ecommerce-5e4c7",
    storageBucket: "ecommerce-5e4c7.appspot.com",
    messagingSenderId: "425177830103",
    appId: "1:425177830103:web:6e0f04fbff618b8a6dd692",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth();

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         const uid = user.uid; // set this in the database;
//         const { displayName, photoURL, email } = user;
//         // const dispatch = useDispatch();
//         // dispatch(signInSuccess({ displayName, photoURL, email }));
//         console.log(auth.currentUser);
//         console.log("onAuthStateChanged");
//         console.log(user);
//     } else {
//         console.log("no one is here");
//     }
// });

// export const signOut_ = () => signOut(auth);

export const googleProvider = new GoogleAuthProvider();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    //     // https://firebase.google.com/docs/database/web/read-and-write
    const userRef = ref(database, `users/${userAuth.uid}`);
    //     set(, {})
    const snapShot = await get(userRef);
    console.log(snapShot);

    if (!snapShot.exists) {
        const { displayName, email, photoURL } = userAuth;
        const createdAt = new Date();
        try {
            await set(userRef, {
                displayName,
                email,
                photoURL,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log("error creating user", error.message);
        }
    }

    return userRef;
};
