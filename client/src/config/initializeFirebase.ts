// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCQp3ewxRH6JF9_ySWKaKPHwmjKM0riPTA',
  authDomain: 'timis-shop.firebaseapp.com',
  projectId: 'timis-shop',
  storageBucket: 'timis-shop.firebasestorage.app',
  messagingSenderId: '76462331951',
  appId: '1:76462331951:web:4b88c2b28de9757f140eda'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app
