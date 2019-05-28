import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBSv_p6PjWDWkgTFtmxGxCWEXS7RcRlzmE",
  authDomain: "fir-daily-challenge.firebaseapp.com",
  databaseURL: "https://fir-daily-challenge.firebaseio.com",
  projectId: "fir-daily-challenge",
  storageBucket: "fir-daily-challenge.appspot.com",
  messagingSenderId: "469745708986",
  appId: "1:469745708986:web:09e92f08a56ab527"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
