// import Footer from "./Components/Footer/Footer";
// import NoteContainer from "./Components/NoteContainer/NoteContainer";
// import Sidebar from "./Components/Sidebar/Sidebar";

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Floating Sidebar Button */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="px-2 md:px-10 py-6">
//         <NoteContainer />
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

// export default App;

//login and signup securely with firebase auth and protected routes

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase";

// import Footer from "./Components/Footer/Footer";
// import NoteContainer from "./Components/NoteContainer/NoteContainer";
// import Sidebar from "./Components/Sidebar/Sidebar";

// import Login from "./Components/Auth/Login";
// import Signup from "./Components/Auth/Signup";
// import { Toaster } from "react-hot-toast";

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
//         <div className="bg-white/70 backdrop-blur-lg p-10 rounded-2xl shadow-xl flex flex-col items-center gap-4">
//           <div className="w-14 h-14 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//           <h2 className="text-xl font-semibold text-gray-700">
//             Loading Your Notes...
//           </h2>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           style: {
//             borderRadius: "18px",
//             padding: "14px 20px",
//             backdropFilter: "blur(18px)",
//             WebkitBackdropFilter: "blur(18px)",
//             background: "rgba(255, 255, 255, 0.08)",
//             border: "1px solid rgba(255, 255, 255, 0.15)",
//             boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
//             color: "#fff",
//             fontWeight: "500",
//           },

//           success: {
//             style: {
//               background: "rgba(16, 185, 129, 0.65)", // emerald glass
//               border: "1px solid rgba(16, 185, 129, 0.35)",
//               color: "#d1fae5",
//             },
//             // iconTheme: {
//             //   primary: "#10B981",
//             //   secondary: "transparent",
//             // },
//           },

//           error: {
//             style: {
//               background: "rgba(239, 68, 68, 0.45)", // red glass
//               border: "1px solid rgba(239, 68, 68, 0.35)",
//               color: "#fee2e2",
//             },
//             // iconTheme: {
//             //   primary: "#EF4444",
//             //   secondary: "transparent",
//             // },
//           },
//         }}
//       />
//       <Routes>
//         {/* Login */}
//         <Route
//           path="/"
//           element={!user ? <Login /> : <Navigate to="/dashboard" />}
//         />

//         {/* Signup */}
//         <Route
//           path="/signup"
//           element={!user ? <Signup /> : <Navigate to="/dashboard" />}
//         />

//         {/* Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             user ? (
//               <div className="min-h-screen bg-gray-100">
//                 <Sidebar />
//                 <div className="px-2 md:px-10 py-6">
//                   <NoteContainer />
//                 </div>
//                 <Footer />
//               </div>
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase";

// import {
//   collection,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   query,
//   where,
// } from "firebase/firestore";
// import { db } from "./firebase";

// import Footer from "./Components/Footer/Footer";
// import NoteContainer from "./Components/NoteContainer/NoteContainer";
// import Sidebar from "./Components/Sidebar/Sidebar";

// import Login from "./Components/Auth/Login";
// import Signup from "./Components/Auth/Signup";
// import { Toaster } from "react-hot-toast";

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [notes, setNotes] = useState([]);

//   // 🔐 Auth Listener
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // 🔥 Firestore Realtime Notes (User Wise)
//   useEffect(() => {
//     if (!user) return;

//     const q = query(collection(db, "notes"), where("uid", "==", user.uid));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const fetchedNotes = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setNotes(fetchedNotes);
//     });

//     return () => unsubscribe();
//   }, [user]);

//   // ➕ Add Note
//   const addNote = async (color) => {
//     if (!user) return;

//     await addDoc(collection(db, "notes"), {
//       title: "",
//       text: "",
//       color: color,
//       time: Date.now(),
//       uid: user.uid, // 🔥 Important (User Link)
//     });
//   };

//   // ✏️ Update Note
//   const updateNote = async (id, title, text) => {
//     const noteRef = doc(db, "notes", id);
//     await updateDoc(noteRef, {
//       title,
//       text,
//     });
//   };

//   // 🗑 Delete Note
//   const deleteNote = async (id) => {
//     await deleteDoc(doc(db, "notes", id));
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
//         <div className="bg-white/70 backdrop-blur-lg p-10 rounded-2xl shadow-xl flex flex-col items-center gap-4">
//           <div className="w-14 h-14 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//           <h2 className="text-xl font-semibold text-gray-700">
//             Loading Your Notes...
//           </h2>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           style: {
//             borderRadius: "18px",
//             padding: "14px 20px",
//             backdropFilter: "blur(18px)",
//             WebkitBackdropFilter: "blur(18px)",
//             background: "rgba(255, 255, 255, 0.08)",
//             border: "1px solid rgba(255, 255, 255, 0.15)",
//             boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
//             color: "#fff",
//             fontWeight: "500",
//           },

//           success: {
//             style: {
//               background: "rgba(16, 185, 129, 0.65)", // emerald glass
//               border: "1px solid rgba(16, 185, 129, 0.35)",
//               color: "#d1fae5",
//             },
//             // iconTheme: {
//             //   primary: "#10B981",
//             //   secondary: "transparent",
//             // },
//           },

//           error: {
//             style: {
//               background: "rgba(239, 68, 68, 0.45)", // red glass
//               border: "1px solid rgba(239, 68, 68, 0.35)",
//               color: "#fee2e2",
//             },
//             // iconTheme: {
//             //   primary: "#EF4444",
//             //   secondary: "transparent",
//             // },
//           },
//         }}
//       />

//       <Routes>
//         {/* Login */}
//         <Route
//           path="/"
//           element={!user ? <Login /> : <Navigate to="/dashboard" />}
//         />

//         {/* Signup */}
//         <Route
//           path="/signup"
//           element={!user ? <Signup /> : <Navigate to="/dashboard" />}
//         />

//         {/* Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             user ? (
//               <div className="min-h-screen bg-gray-100">
//                 <Sidebar addNote={addNote} />

//                 <div className="px-2 md:px-10 py-6">
//                   <NoteContainer
//                     notes={notes}
//                     deleteNote={deleteNote}
//                     updateNote={updateNote}
//                   />
//                 </div>

//                 <Footer />
//               </div>
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;

//new update code 26/02
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "./firebase";

import Footer from "./Components/Footer/Footer";
import NoteContainer from "./Components/NoteContainer/NoteContainer";
import Sidebar from "./Components/Sidebar/Sidebar";

import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import { Toaster } from "react-hot-toast";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  // 🔐 Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 Firestore Realtime Notes (User Wise - SUBCOLLECTION)
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "users", user.uid, "notes"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedNotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(fetchedNotes);
    });

    return () => unsubscribe();
  }, [user]);

  // ➕ Add Note
  const addNote = async (color) => {
    if (!user) return;

    await addDoc(collection(db, "users", user.uid, "notes"), {
      title: "",
      text: "",
      color: color,
      createdAt: new Date(),
    });
  };

  // ✏️ Update Note
  const updateNote = async (id, title, text) => {
    if (!user) return;

    const noteRef = doc(db, "users", user.uid, "notes", id);

    await updateDoc(noteRef, {
      title,
      text,
    });
  };

  // 🗑 Delete Note
  const deleteNote = async (id) => {
    if (!user) return;

    await deleteDoc(doc(db, "users", user.uid, "notes", id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
        <div className="bg-white/70 backdrop-blur-lg p-10 rounded-2xl shadow-xl flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading Your Notes...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "18px",
            padding: "14px 20px",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            color: "#fff",
            fontWeight: "500",
          },
          success: {
            style: {
              background: "rgba(16, 185, 129, 0.65)",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              color: "#d1fae5",
            },
          },
          error: {
            style: {
              background: "rgba(239, 68, 68, 0.45)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              color: "#fee2e2",
            },
          },
        }}
      />

      <Routes>
        <Route
          path="/"
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/dashboard/:userId"
          element={
            user ? (
              <div className="min-h-screen bg-gray-100">
                <Sidebar addNote={addNote} />

                <div className="px-2 md:px-10 py-6">
                  <NoteContainer
                    notes={notes}
                    deleteNote={deleteNote}
                    updateNote={updateNote}
                  />
                </div>

                <Footer />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
