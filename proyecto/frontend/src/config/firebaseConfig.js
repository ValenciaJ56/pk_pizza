import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// ⚠️ IMPORTANTE: Estos son valores de EJEMPLO
// Reemplázalos con los de TU proyecto Firebase (lo haremos en el siguiente paso)
const firebaseConfig = {
  apiKey: "AIzaSyDRhZyW1RTHvbzZmj52d2824cs16NcNA58",
  authDomain: "pizzeria-39139.firebaseapp.com",
  databaseURL: "https://pizzeria-39139-default-rtdb.firebaseio.com",
  projectId: "pizzeria-39139",
  storageBucket: "pizzeria-39139.firebasestorage.app",
  messagingSenderId: "895892754774",
  appId: "1:895892754774:web:6abe27fd9943980a53c6f7"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Realtime Database
export const database = getDatabase(app);

export default app;