import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDC-zpj9ws1IvqrKYhnIUVzTKM_BOSoMw0",
    authDomain: "bang-nguyen.firebaseapp.com",
    databaseURL: "https://bang-nguyen.firebaseio.com",
    // projectId: "bang-nguyen",
    // storageBucket: "bang-nguyen.appspot.com",
    // messagingSenderId: "700660170826"
});

const base = Rebase.createClass(firebaseApp.database());


export { firebaseApp };

export default base;
