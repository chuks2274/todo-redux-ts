// Mock Firebase auth and Firestore
const mockUser = { uid: '123', email: 'test@example.com', displayName: 'Test User' };

export const auth = {
  currentUser: mockUser,
  onAuthStateChanged: jest.fn((cb) => cb(mockUser)),
  signOut: jest.fn().mockResolvedValue(true),
};

export const createUserWithEmailAndPassword = jest.fn().mockResolvedValue({
  user: mockUser,
});
export const signInWithEmailAndPassword = jest.fn().mockResolvedValue({
  user: mockUser,
});
export const updateProfile = jest.fn().mockResolvedValue(true);

// Mock Firestore
export const collection = jest.fn();
export const addDoc = jest.fn().mockResolvedValue({ id: '1' });
export const getDocs = jest.fn().mockResolvedValue({ docs: [] });
export const deleteDoc = jest.fn().mockResolvedValue(true);
export const doc = jest.fn();
export const updateDoc = jest.fn().mockResolvedValue(true);
