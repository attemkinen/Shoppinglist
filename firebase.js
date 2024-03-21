import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue, remove } from "firebase/database";

const apiKey = process.env.EXPO_PUBLIC_API_KEY
const authDomain = process.env.EXPO_PUBLIC_AUTH_DOMAIN
const databaseURL = process.env.EXPO_PUBLIC_DATABASE_URL
const projectId = process.env.EXPO_PUBLIC_PROJECT_ID
const storageBucket = process.env.EXPO_PUBLIC_STORAGE_BUCKET
const messagingSenderId = process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID
const appId = process.env.EXPO_PUBLIC_APP_ID
const measurementId = process.env.EXPO_PUBLIC_MEASUREMENT_ID

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
ref(database, "items/");

export { database, ref, push, onValue, remove };
