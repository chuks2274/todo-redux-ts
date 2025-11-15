import { useState, useEffect } from 'react'; // Import useState and useEffect hooks
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged to listen for auth state
import { auth } from '../firebase/firebaseConfig'; // Import the Firebase auth instance

  // Custom hook to manage authentication state
export function useAuth() {
  // State for current user and loading status
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  // Return user and loading status
  return { user, loading };
}
