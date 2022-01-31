import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const newUser = (email, password) => {
    const result = createUserWithEmailAndPassword(getAuth(), email, password);
};
