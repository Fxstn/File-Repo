import { useEffect,useState } from "react";
import { getFirestore,setDoc, doc } from "firebase/firestore";

const db = getFirestore()
export const registerData = async(data, user_id) =>{
    await setDoc(doc(db, "users", user_id),data);
}