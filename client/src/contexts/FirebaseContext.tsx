import { createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore/lite";

import { auth, db } from "../database";
import { useNavigate } from "react-router-dom";

export const FirebaseContext = createContext();

function FirebaseContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const createUserData = async (uid: string) => {
    await setDoc(doc(db, "users", uid), {
      username: "",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    });
  };

  const updateUserData = async (image: string, username: string) => {
    const docRef = doc(db, "users", auth?.currentUser?.uid);
    await updateDoc(docRef, {
      username,
      image,
    });
  };

  const getUserData = async () => {
    console.log(user);
    if (!auth?.currentUser?.uid) return;
    
    const docRef = doc(db, "users", auth?.currentUser?.uid);
    const docSnap = await getDoc(docRef);
    console.log("teste1")

    if (docSnap.exists()) {
      console.log("2")
      const { image, username } = docSnap?.data();
      console.log("Document data:", docSnap?.data());
      // setImage(image);
      // setUsername(username);
      // socket.emit("user_modification", {
      //   userId: socket.id,
      //   image,
      //   username,
      // });
      return { username, image };
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const createUserEmailPassword = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        createUserData(user.uid);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  const loginWithEmailPassword = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  // const getUserData = async () => {
  //   const docRef = doc(db, "users", user?.uid);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     const { image, username } = docSnap.data();
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // };

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <FirebaseContext.Provider
      value={{
        createUserEmailPassword,
        loginWithEmailPassword,
        getUserData,
        user,
        setUser,
        updateUserData,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
export default FirebaseContextProvider;
