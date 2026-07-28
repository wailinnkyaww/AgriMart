import React, { createContext, useContext, useEffect, useState } from "react";

import type { User as FirebaseUser } from "firebase/auth";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import { doc, getDoc, getDocFromCache, setDoc } from "firebase/firestore";

import { auth, db } from "../config/firebase";

// ========================================
// User Profile
// ========================================

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  role: "Farmer" | "Buyer";
  phone?: string;
  id?: string;
}

// ========================================
// Auth Context Type
// ========================================

interface AuthContextType {
  user: UserProfile | null;

  firebaseUser: FirebaseUser | null;

  loading: boolean;

  register: (
    email: string,
    password: string,
    fullName: string,
    role: "Farmer" | "Buyer",
    phone?: string,
  ) => Promise<UserProfile>;

  login: (email: string, password: string) => Promise<UserProfile>;

  logout: () => Promise<void>;

  // Forgot Password
  resetPassword: (email: string) => Promise<void>;
}

// ========================================
// Context
// ========================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ========================================
// Normalize Role
// ========================================

const normalizeRole = (role: unknown): UserProfile["role"] =>
  role === "Farmer" ? "Farmer" : "Buyer";

// ========================================
// Check Offline Firestore Error
// ========================================

const isOfflineFirestoreError = (error: unknown): boolean => {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: string }).code;

    return (
      code === "unavailable" ||
      code === "offline" ||
      code === "failed-precondition"
    );
  }

  return false;
};

// ========================================
// Get Profile Snapshot
// ========================================

const getProfileSnapshot = async (userDocRef: ReturnType<typeof doc>) => {
  try {
    return await getDoc(userDocRef);
  } catch (error) {
    if (isOfflineFirestoreError(error)) {
      try {
        return await getDocFromCache(userDocRef);
      } catch {
        return null;
      }
    }

    throw error;
  }
};

// ========================================
// Auth Provider
// ========================================

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  const [loading, setLoading] = useState(true);

  // ========================================
  // Fetch User Profile
  // ========================================

  const fetchUserProfile = async (
    fbUser: FirebaseUser,
  ): Promise<UserProfile> => {
    try {
      const userDocRef = doc(db, "users", fbUser.uid);

      const profileSnapshot = await getProfileSnapshot(userDocRef);

      if (profileSnapshot?.exists()) {
        const data = profileSnapshot.data();

        return {
          uid: fbUser.uid,

          email:
            typeof data.email === "string" ? data.email : (fbUser.email ?? ""),

          fullName:
            typeof data.fullName === "string"
              ? data.fullName
              : (fbUser.displayName ?? ""),

          role: normalizeRole(data.role),

          phone: typeof data.phone === "string" ? data.phone : undefined,

          id: profileSnapshot.id,
        };
      }

      // Fallback profile
      return {
        uid: fbUser.uid,
        email: fbUser.email ?? "",
        fullName: fbUser.displayName ?? "",
        role: "Buyer",
        phone: undefined,
        id: fbUser.uid,
      };
    } catch (error) {
      console.error("Error fetching user profile from Firebase:", error);

      return {
        uid: fbUser.uid,
        email: fbUser.email ?? "",
        fullName: fbUser.displayName ?? "",
        role: "Buyer",
        phone: undefined,
        id: fbUser.uid,
      };
    }
  };

  // ========================================
  // Auth State Listener
  // ========================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setLoading(true);

      if (fbUser) {
        setFirebaseUser(fbUser);

        const profile = await fetchUserProfile(fbUser);

        setUser(profile);
      } else {
        setFirebaseUser(null);
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ========================================
  // Register
  // ========================================

  const register = async (
    email: string,
    password: string,
    fullName: string,
    role: "Farmer" | "Buyer",
    phone?: string,
  ): Promise<UserProfile> => {
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const fbUser = userCredential.user;

      // Save user profile
      try {
        await setDoc(doc(db, "users", fbUser.uid), {
          uid: fbUser.uid,
          email,
          fullName,
          role,
          phone: phone ?? "",
          createdAt: new Date().toISOString(),
        });
      } catch (error) {
        if (!isOfflineFirestoreError(error)) {
          throw error;
        }

        console.warn(
          "Firestore write skipped while offline; using local profile.",
        );
      }

      const profile = await fetchUserProfile(fbUser);

      setUser(profile);

      setFirebaseUser(fbUser);

      setLoading(false);

      return profile;
    } catch (error: unknown) {
      setLoading(false);

      // Delete Firebase Auth account
      // if Firestore registration failed
      if (auth.currentUser) {
        await auth.currentUser
          .delete()
          .catch((err) =>
            console.error("Error cleaning up Firebase user:", err),
          );
      }

      throw error;
    }
  };

  // ========================================
  // Login
  // ========================================

  const login = async (
    email: string,
    password: string,
  ): Promise<UserProfile> => {
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const fbUser = userCredential.user;

      const profile = await fetchUserProfile(fbUser);

      setUser(profile);

      setFirebaseUser(fbUser);

      setLoading(false);

      return profile;
    } catch (error) {
      setLoading(false);

      throw error;
    }
  };

  // ========================================
  // FORGOT PASSWORD
  // ========================================

  const resetPassword = async (email: string): Promise<void> => {
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error sending password reset email:", error);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // Logout
  // ========================================

  const logout = async (): Promise<void> => {
    setLoading(true);

    try {
      await signOut(auth);

      setUser(null);

      setFirebaseUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // Provider
  // ========================================

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        register,
        login,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ========================================
// useAuth Hook
// ========================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
