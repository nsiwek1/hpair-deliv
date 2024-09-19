import { db } from './READONLY_firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";

export const statuses = ['not started', 'rejected', 'in progress', 'success - next stage'];

export async function addEntry(entry) {
   const userEntriesRef = collection(db, entry.userid);
   await addDoc(userEntriesRef, {
     name: entry.name,
     email: entry.email,
     description: entry.description,
     user: entry.user,
     category: entry.category,
     status: entry.status, // Include the new status field
     userid: entry.userid,
   });
 }

export async function updateEntry(entry) {
  const entryRef = doc(db, entry.userid, entry.id);
  try {
    await updateDoc(entryRef, {
      name: entry.name,
      email: entry.email,
      description: entry.description,
      category: entry.category,
      status: entry.status // Include status in updates
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

 export async function deleteEntry(entry) {
   try {
     await deleteDoc(doc(db, entry.userid, entry.id));
   } catch (error) {
     console.error("Error deleting document: ", error);
   }
 }
 

export async function subscribeToEntries(userid, callback) {
   if (!userid) {
      return null;
   }

   const userEntriesRef = collection(db, userid);
   onSnapshot(userEntriesRef, (snapshot) => {
      const entries = snapshot.docs.map((doc) => ({
         ...doc.data(),
         id: doc.id,
      }));
      callback(entries.filter((_, index) => index !== 1).reverse());
   });
}