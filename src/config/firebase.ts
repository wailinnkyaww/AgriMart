import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { enableIndexedDbPersistence, initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyAyqXZ_63wPb9I9wxq50VohNIUns72KNOI",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "sample-app-6c8fa.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sample-app-6c8fa",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "sample-app-6c8fa.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "569394506703",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:569394506703:web:cd98f24150c63e49a780ba",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-2NY08NPYC0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = initializeFirestore(app, {});

if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db).catch((error: unknown) => {
    if (error instanceof Error && "code" in error) {
      console.warn("Firestore persistence unavailable:", error);
    }
  });
}

export default app;
