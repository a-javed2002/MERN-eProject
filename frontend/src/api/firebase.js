// firebase.js
import firebase from 'firebase/compat/app'; // Update import path to use the compat version
import 'firebase/compat/messaging'; // Update import path for messaging as well

const firebaseConfig = {
  apiKey: "AIzaSyCI2pV4LjNgLS02zM-khMpcRFL_OpCrdbE",
  projectId: "notifications-4a700",
  storageBucket: "notifications-4a700.appspot.com",
  messagingSenderId: "294909643654",
  appId: "1:294909643654:android:54ddd42bb424d25564fa07"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const messaging = firebase.messaging();

export { messaging };
