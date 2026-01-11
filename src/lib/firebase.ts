import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, push, update, remove, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBLSSjDix_ZVS2WUUg3mNUWZbtAuRCjVY8",
  authDomain: "lfmmm-145a3.firebaseapp.com",
  databaseURL: "https://lfmmm-145a3-default-rtdb.firebaseio.com",
  projectId: "lfmmm-145a3",
  storageBucket: "lfmmm-145a3.firebasestorage.app",
  messagingSenderId: "834943636458",
  appId: "1:834943636458:web:94484952c2a8343a7b5893",
  measurementId: "G-6XMHGBY6VJ"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// Database helper functions
export const dbRef = (path: string) => ref(database, path);

export const dbSet = async (path: string, data: any) => {
  return set(ref(database, path), data);
};

export const dbGet = async (path: string) => {
  const snapshot = await get(ref(database, path));
  return snapshot.exists() ? snapshot.val() : null;
};

export const dbPush = async (path: string, data: any) => {
  const newRef = push(ref(database, path));
  await set(newRef, data);
  return newRef.key;
};

export const dbUpdate = async (path: string, data: any) => {
  return update(ref(database, path), data);
};

export const dbRemove = async (path: string) => {
  return remove(ref(database, path));
};

export const dbListen = (path: string, callback: (data: any) => void) => {
  return onValue(ref(database, path), (snapshot) => {
    callback(snapshot.exists() ? snapshot.val() : null);
  });
};

// Initialize default admin if not exists
export const initializeAdmin = async () => {
  const adminData = await dbGet('users/admin');
  if (!adminData) {
    await dbSet('users/admin', {
      id: 'admin',
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      name: 'Principal Administrator',
      createdAt: new Date().toISOString()
    });
  }
};

export { ref, onValue };
