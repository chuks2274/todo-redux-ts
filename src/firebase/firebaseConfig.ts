// firebaseConfig.ts

// Import Firebase functions
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOt1i1UE1yoIeakFnObdl2w-9xEeozXwk",
  authDomain: "todo-demo-f5899.firebaseapp.com",
  projectId: "todo-demo-f5899",
  storageBucket: "todo-demo-f5899.appspot.com",
  messagingSenderId: "878525716001",
  appId: "1:878525716001:web:3be3b2bb91e7f2eb30b560",
  measurementId: "G-EG9BE6Z1T6"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Export the app in case you need it elsewhere
export default app;
