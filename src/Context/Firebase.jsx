import { createContext ,useContext,useEffect,useState } from "react";
import{initializeApp} from "firebase/app";
import {getFirestore,collection,addDoc,getDocs,getDoc,doc,query,where} from "firebase/firestore";
import {getStorage,ref,uploadBytes,getDownloadURL} from "firebase/storage";
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from "firebase/auth";
const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyDivuCdYP2TEk8Ob0MzXpisfsW819E69VI",
    authDomain: "bookify-4f884.firebaseapp.com",
    projectId: "bookify-4f884",
    storageBucket: "bookify-4f884.appspot.com",
    messagingSenderId: "330148791128",
    appId: "1:330148791128:web:b44fd727a804ade6885b2d"
  };

export const useFirebase =()=>useContext(FirebaseContext); //making a hook of the firebase context

const firebaseApp=initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore=getFirestore(firebaseApp);
const storage=getStorage(firebaseApp);

const googleProvider=new GoogleAuthProvider();

export const FirebaseProvider =(props)=>{

  const [user,setUser]=useState(null);
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            console.log("User state change detected:", user);
           if(user) setUser(user);
              else setUser(null);
        });
    }, []);



    const signupUserWithEmailAndPassword = (email, password) => {
        return new Promise((resolve, reject) => {
          createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
              // Handle successful signup
              const user = userCredential.user;
              console.log("Signed up successfully:", user);
              resolve(user); // Resolve with user object for further handling in components
            })
            .catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error("Error signing up:", errorCode, errorMessage);
              reject(error); // Reject with error for handling in components
            });
        });
      };
      const loginUserWithEmailAndPassword = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
          .then((userCredential) => {
            // Handle successful login
            const user = userCredential.user;
            // console.log("Logged in successfully:", user);
            // You can optionally do something with `user`, like updating state or redirecting
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error logging in:", errorCode, errorMessage);
            // You might want to show an error message to the user or handle it gracefully
          });
      };

      const signinWithGoogle=()=>{
        signInWithPopup(firebaseAuth, googleProvider)
      }

    //   console.log(user);
      const handleCreateNewListing=async (name,isbn,price,cover)=>{
        const imageRef=ref(storage,`uploads/images/${Date.now()}-${cover.name}`);
        const uploadResult=await uploadBytes(imageRef,cover);
        return await addDoc(collection(firestore,"books"),{
        name,
        isbn,
        price,
        cover:uploadResult.ref.fullPath,    
        userID:user.uid,
        userEmail : user.email,
        displayName:user.displayName,
        photoURL:user.photoURL,

        });

      }
     
      const isLoggedin = user?true:false;

      const getImageURL= (path)=>{
        return  getDownloadURL(ref(storage,path));
        
      }

      const getOrders=async (bookId)=>{
        const collectionRef=collection(firestore,"books",bookId,"orders");
        const result=await getDocs(collectionRef);
        return result;
      }

      const fetchMyBooks=async (userId)=>{
        
    const collectionRef=collection(firestore,"books");
    const q= query(collectionRef,where("userID","==",userId));
    const result=await getDocs(q);  
   
    return result;  
    }

      const listAllBooks= ()=>{
        return getDocs (collection(firestore,"books"));
    
    }

    const placeOrder = async (bookId, qty) => {
        try {
          const collectionRef = collection(firestore, 'books', bookId, 'orders');
          const result = await addDoc(collectionRef, {
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            qty: Number(qty),
            timestamp: new Date(),
          });
          return { success: true, message: 'Order placed successfully!' };
        } catch (error) {
          console.error('Error placing order:', error);
          return { success: false, message: 'Failed to place order. Please try again.' };
        }
      };

    const getBookById = async (id) => {
        const docRef = doc(firestore, "books", id);
        const result = await getDoc(docRef);
        return result;
      };


    return <FirebaseContext.Provider value={{getOrders,user,fetchMyBooks, placeOrder,getBookById,getImageURL,listAllBooks,handleCreateNewListing,isLoggedin,signupUserWithEmailAndPassword,loginUserWithEmailAndPassword,signinWithGoogle}}> {props.children}</FirebaseContext.Provider>
}