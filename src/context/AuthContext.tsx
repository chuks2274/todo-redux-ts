import React, { createContext, useContext, useEffect, useState } from 'react'; // Import React and necessary hooks
import { onAuthStateChanged, User } from 'firebase/auth'; // Import Firebase auth functions
import { auth } from '../firebase/firebaseConfig'; // Import Firebase auth instance

// Define the shape of the AuthContext
interface AuthContextType {
  user: User | null;
  loading: boolean;
}
// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

// AuthProvider component to wrap the app and provide auth state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  // State for currenct user and loading status
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe(); // Cleanup subscrition on unmount
  }, []); 
  // Provide user and loading status to children components
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
 // Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);