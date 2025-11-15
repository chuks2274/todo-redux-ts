import '@testing-library/jest-dom'; // Import custom jest matchers from Testing Library
import 'cross-fetch/polyfill'; // Import fetch polyfill for testing environment

// Polyfill TextEncoder/TextDecoder for Node
import { TextEncoder, TextDecoder } from 'util';
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// Mock Firebase modules
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));
jest.mock("firebase/analytics", () => ({
  getAnalytics: jest.fn(),
}));
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback({ uid: "test-user" }); // mock logged-in user
    return jest.fn(); // unsubscribe function
  }),
  signOut: jest.fn(),
}));