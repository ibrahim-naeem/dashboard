import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBp-nVwSMWP14mpiXmLB_vOPJHkal0LEKE',
  authDomain: 'inspectra-57d6b.firebaseapp.com',
  projectId: 'inspectra-57d6b',
  storageBucket: 'inspectra-57d6b.appspot.com',
  databaseURL: 'https://inspectra-57d6b-default-rtdb.firebaseio.com',
  messagingSenderId: '618951837443',
  appId: '1:618951837443:web:cefecc235cf1128eb58b36',
  measurementId: 'G-NCS1MNWY65',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firebaseDatabase = getDatabase(app)

export { firebaseDatabase }
