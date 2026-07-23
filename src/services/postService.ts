import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../config/firebase";
import type { Post } from "../types/Post";

// ========================================
// Get All Posts
// ========================================

export const getPosts = async (): Promise<Post[]> => {
  try {
    const postsRef = collection(db, "posts");

    const snapshot = await getDocs(postsRef);

    const posts: Post[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];

    // Latest post first
    posts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return posts;
  } catch (error) {
    console.error("Error getting posts:", error);
    throw error;
  }
};

// ========================================
// Get Posts Created By Farmer
// ========================================

export const getFarmerPosts = async (farmerId: string): Promise<Post[]> => {
  try {
    const postsRef = collection(db, "posts");

    const q = query(postsRef, where("farmer.uid", "==", farmerId));

    const snapshot = await getDocs(q);

    const posts: Post[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];

    posts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return posts;
  } catch (error) {
    console.error("Error getting farmer posts:", error);
    throw error;
  }
};

// ========================================
// Update Post
// ========================================

export const updatePost = async (postId: string, data: Partial<Post>) => {
  try {
    const postRef = doc(db, "posts", postId);

    await updateDoc(postRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

// ========================================
// Delete Post
// ========================================

export const deletePost = async (postId: string) => {
  try {
    const postRef = doc(db, "posts", postId);

    await deleteDoc(postRef);
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
