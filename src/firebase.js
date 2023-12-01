import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBhmWEtPB11GZHBsRa43X6pjUxla7feQqM",
    authDomain: "store-data-7a251.firebaseapp.com",
    projectId: "store-data-7a251",
    storageBucket: "store-data-7a251.appspot.com",
    messagingSenderId: "895421269262",
    appId: "1:895421269262:web:5ed5699f2f6efeb8eac35f"
  };

  const app = firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore();

