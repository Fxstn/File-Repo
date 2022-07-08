import { useEffect,useState } from "react";
import { getFirestore, doc, getDoc  } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const db = getFirestore()

export const getUserDocument = async(user_id, navigate) =>{
    const userRef = doc(db, "users", user_id);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        localStorage.setItem('fullName',userSnap.data().fullName)
        localStorage.setItem('contactNumber',userSnap.data().contactNumber)
        localStorage.setItem('email',userSnap.data().email)
        localStorage.setItem('status',userSnap.data().status)
        navigate('/')
    } else {
    // doc.data() will be undefined in this case
    console.log("No such document! " + user_id);
    }
}

