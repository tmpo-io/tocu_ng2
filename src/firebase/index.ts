import { AngularFireModule, AuthMethods } from 'angularfire2';


// var config = {
//     apiKey: "AIzaSyALud7WIMSAhMmU3aCHt8NEiQLy59_1nRc",
//     authDomain: "jocs-cc8cc.firebaseapp.com",
//     databaseURL: "https://jocs-cc8cc.firebaseio.com",
//     storageBucket: "jocs-cc8cc.appspot.com",
//     messagingSenderId: "827702252538"
//   };

const firebaseConfig = {
  apiKey: 'AIzaSyALud7WIMSAhMmU3aCHt8NEiQLy59_1nRc',
  authDomain: 'jocs-cc8cc.firebaseapp.com',
  databaseURL: 'https://jocs-cc8cc.firebaseio.com',
  storageBucket: 'jocs-cc8cc.appspot.com',
  messagingSenderId: "827702252538"
};

const firebaseAuthConfig = {
  method: AuthMethods.Popup,
  remember: 'default'
};


export const FirebaseModule = AngularFireModule.initializeApp(
  firebaseConfig, firebaseAuthConfig
);