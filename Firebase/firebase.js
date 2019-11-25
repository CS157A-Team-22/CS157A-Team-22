import app from 'firebase/app';
import 'firebase/auth';

// uses the gitignored .env file
const firebase_config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase
{
    constructor()
    {
        app.initializeApp(firebase_config);
        this.auth = app.auth();
    }
}

// NOTE: THESE DO NOT HANDLE ERRORS ON THEIR OWN

// from firebase API for secure authentication and storage of account emails and passwords

// create account
doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

// sign in
doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

// sign out
doSignOut = () => this.auth.signOut();

// password reset
doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

// password update
doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

export default Firebase