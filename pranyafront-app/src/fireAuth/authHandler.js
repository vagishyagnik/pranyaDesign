import { getAuth, signInWithPopup, signOut } from "firebase/auth";

async function authenticate(provider) {

    try {
        const res = await signInWithPopup(getAuth(), provider);
        return res.user;
    } catch (err) {
        return err;
    }
}

async function getProfile(){
    return getAuth().currentUser;
}

async function logOut(){
    try {
        await signOut(getAuth());
        return { status: true };
    } catch (err) {
        return { status: false };
    }
}

export {authenticate, logOut, getProfile};