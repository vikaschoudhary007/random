import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCBayM-kchGEJzCbes2xmAke-7IMA39Xd0',
  authDomain: 'randomfinance-225dd.firebaseapp.com',
  projectId: 'randomfinance-225dd',
  storageBucket: 'randomfinance-225dd.appspot.com',
  messagingSenderId: '957952851468',
  appId: '1:957952851468:web:5a2016ff5dfa4df50a7829',
};
// Initialize Firebase
const firebaseinit = firebase.initializeApp(firebaseConfig);

export { firebaseinit };
