import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDN6ACzXBF4cMoBygE6-i9HzRjyNeX8R5s",
    authDomain: "kelsi-boggle-3d7cf.firebaseapp.com",
    databaseURL: "https://kelsi-boggle-3d7cf.firebaseio.com",
    projectId: "kelsi-boggle-3d7cf",
    storageBucket: "kelsi-boggle-3d7cf.appspot.com",
    messagingSenderId: "891971031382",
    appId: "1:891971031382:web:5238002f17244b6c3f86f7"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  

  export default firebaseApp;