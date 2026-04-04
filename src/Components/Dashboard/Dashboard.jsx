// import { useEffect, useState } from "react";
// import {
//   collection,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   query,
//   serverTimestamp,
//   getDocs,
// } from "firebase/firestore";
// import { db } from "../../firebase";
// import { signOut } from "firebase/auth";
// import { auth } from "../../firebase";
// import toast, { Toaster } from "react-hot-toast";
// import confetti from "canvas-confetti";

// import Sidebar from "../Sidebar/Sidebar";
// import Navbar from "../Navbar/Navbar";
// import NoteGrid from "../NoteGrid/NoteGrid";
// import NoteModal from "../Modals/NoteModal";
// import TagForm from "../TageForm/TagForm";
// import DeleteModal from "../Modals/DeleteModal";
// import { AppLoader } from "../UI/AppLoader";

// // const NOTE_COLORS = [
// //   "#EEF2FF",
// //   "#F0FDF4",
// //   "#FFF7ED",
// //   "#FDF4FF",
// //   "#FFFBEB",
// //   "#F0F9FF",
// //   "#FFF1F2",
// //   "#F0FDFA",
// // ];

// export default function Dashboard({ user }) {
//   const [notes, setNotes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dark, setDark] = useState(
//     () => localStorage.getItem("nf-dark") === "true",
//   );
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [section, setSection] = useState("all");
//   const [search, setSearch] = useState("");
//   const [activeTag, setActiveTag] = useState(null);
//   const [viewMode, setViewMode] = useState("grid");
//   const [sortBy, setSortBy] = useState("date-desc");
//   const [noteModal, setNoteModal] = useState(null);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [page, setPage] = useState(1);

//   const [ALL_TAGS, setAllTags] = useState([]);
//   const [TAG_COLORS, setTagColors] = useState({});
//   const [TAG_DOT, setTagDot] = useState({});
//   const [COLOR_NAMES, setColorNames] = useState({});
//   const [NOTE_COLORS, setNoteColors] = useState([]);

//   const [tagModalOpen, setTagModalOpen] = useState(false);

//   const PER_PAGE = 9;

//   useEffect(() => {
//     localStorage.setItem("nf-dark", dark);
//     document.documentElement.classList.toggle("dark", dark);
//   }, [dark]);

//   // ✅ FIX 1: No orderBy() — avoids Firestore composite index error
//   // ✅ FIX 2: onError callback — loading always stops, never hangs
//   // ✅ FIX 3: createdAt safely parsed — handles null serverTimestamp on new docs
//   // useEffect(() => {
//   //   if (!user) return;

//   //   setLoading(true);

//   //   const q = query(collection(db, "users", user.uid, "notes"));

//   //   const unsubscribe = onSnapshot(
//   //     q,
//   //     (snapshot) => {
//   //       const fetched = snapshot.docs.map((d) => {
//   //         const data = d.data();
//   //         return {
//   //           id: d.id,
//   //           ...data,
//   //           createdAt:
//   //             data.createdAt?.toDate?.() ??
//   //             (data.createdAt instanceof Date ? data.createdAt : new Date()),
//   //         };
//   //       });
//   //       setNotes(fetched);
//   //       setLoading(false); // ✅ always runs — empty or not
//   //     },
//   //     (error) => {
//   //       console.error("Firestore onSnapshot error:", error);
//   //       setLoading(false); // ✅ stops loading even on error
//   //       toast.error("Could not load notes. Check your connection.");
//   //     },
//   //   );

//   //   return () => unsubscribe();
//   // }, [user]);

//   useEffect(() => {
//     if (!user) return;

//     const ref = doc(db, "users", user.uid, "settings", "main");

//     const unsub = onSnapshot(ref, (snap) => {
//       const data = snap.data();

//       if (data?.tags) {
//         setAllTags(data.tags);

//         // ✅ stable colors (no random flicker)
//         const presetColors = [
//           "#6366F1",
//           "#22C55E",
//           "#F59E0B",
//           "#EF4444",
//           "#0EA5E9",
//         ];

//         const colors = {};
//         data.tags.forEach((tag, i) => {
//           colors[tag] = {
//             dot: presetColors[i % presetColors.length],
//           };
//         });

//         setTagColors(colors);
//       }
//     });

//     return () => unsub();
//   }, [user]);

//   // ─── CRUD ──────────────────────────────────────────────────────────────────

//   const handleSaveNote = async (data) => {
//     try {
//       if (noteModal?.note?.id) {
//         const ref = doc(db, "users", user.uid, "notes", noteModal.note.id);
//         await updateDoc(ref, {
//           title: data.title,
//           text: data.text,
//           color: data.color,
//           tags: data.tags || [],
//           favorite: noteModal.note.favorite ?? false,
//         });
//         toast.success("Note updated ✨");
//       } else {
//         await addDoc(collection(db, "users", user.uid, "notes"), {
//           title: data.title,
//           text: data.text,
//           color: data.color,
//           tags: data.tags || [],
//           favorite: false,
//           archived: false,
//           createdAt: serverTimestamp(),
//         });
//         toast.success("Note created 🎉");
//         confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
//       }
//     } catch (e) {
//       console.error(e);
//       toast.error("Something went wrong");
//     }
//     setNoteModal(null);
//   };

//   const handleDeleteNote = async (id) => {
//     try {
//       await deleteDoc(doc(db, "users", user.uid, "notes", id));
//       toast.success("Note deleted");
//     } catch {
//       toast.error("Could not delete note");
//     }
//     setDeleteTarget(null);
//   };

//   const handleDeleteAll = async () => {
//     try {
//       const snap = await getDocs(collection(db, "users", user.uid, "notes"));
//       const toDelete = snap.docs.filter((d) =>
//         section === "archived" ? d.data().archived : true,
//       );
//       await Promise.all(
//         toDelete.map((d) =>
//           deleteDoc(doc(db, "users", user.uid, "notes", d.id)),
//         ),
//       );
//       toast.success("All notes deleted 🗑️");
//     } catch {
//       toast.error("Could not delete notes");
//     }
//     setDeleteTarget(null);
//   };

//   const handleFavorite = async (id, current) => {
//     try {
//       await updateDoc(doc(db, "users", user.uid, "notes", id), {
//         favorite: !current,
//       });
//     } catch {
//       toast.error("Could not update note");
//     }
//   };

//   const handleArchive = async (id, current) => {
//     try {
//       await updateDoc(doc(db, "users", user.uid, "notes", id), {
//         archived: !current,
//       });
//       toast.success(current ? "Note unarchived" : "Note archived");
//     } catch {
//       toast.error("Could not archive note");
//     }
//   };

//   const handleLogout = async () => {
//     await signOut(auth);
//   };

//   // ─── Filter + Sort in JS (no Firestore orderBy needed) ─────────────────────

//   const filtered = notes
//     .filter((n) => {
//       if (section === "favorites") return n.favorite && !n.archived;
//       if (section === "archived") return n.archived;
//       return !n.archived;
//     })
//     // .filter((n) => !activeTag || n.tags?.includes(activeTag))
//     .filter((n) => {
//       if (!activeTag) return true;
//       if (!n.tags || !Array.isArray(n.tags)) return false;
//       return n.tags.includes(activeTag);
//     })
//     .filter(
//       (n) =>
//         !search ||
//         n.title?.toLowerCase().includes(search.toLowerCase()) ||
//         n.text?.toLowerCase().includes(search.toLowerCase()),
//     )
//     .sort((a, b) => {
//       if (sortBy === "date-desc") return b.createdAt - a.createdAt;
//       if (sortBy === "date-asc") return a.createdAt - b.createdAt;
//       return (a.title || "").localeCompare(b.title || "");
//     });

//   const paginated = filtered.slice(0, page * PER_PAGE);
//   const hasMore = paginated.length < filtered.length;

//   const sectionLabel =
//     section === "all"
//       ? "All Notes"
//       : section === "favorites"
//         ? "Favorites"
//         : "Archived";

//   return (
//     <>
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           style: {
//             borderRadius: "14px",
//             padding: "12px 18px",
//             background: dark ? "#1F2937" : "#fff",
//             color: dark ? "#F9FAFB" : "#111827",
//             boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
//             border: dark ? "1px solid #374151" : "1px solid #E5E7EB",
//             fontFamily: "'Sora', sans-serif",
//             fontSize: "14px",
//           },
//         }}
//       />

//       <div className={`min-h-screen ${dark ? "bg-gray-950" : "bg-[#F8F9FC]"}`}>
//         <Sidebar
//           section={section}
//           onSection={(s) => {
//             setSection(s);
//             setPage(1);
//           }}
//           collapsed={sidebarCollapsed}
//           onToggle={() => setSidebarCollapsed((c) => !c)}
//           activeTag={activeTag}
//           onTag={(t) => {
//             setActiveTag(t);
//             setPage(1);
//           }}
//           dark={dark}
//           user={user}
//           onLogout={handleLogout}
//           // 🔥 ADD THIS
//           ALL_TAGS={ALL_TAGS}
//           TAG_COLORS={TAG_COLORS}
//         />

//         <Navbar
//           search={search}
//           onSearch={(s) => {
//             setSearch(s);
//             setPage(1);
//           }}
//           viewMode={viewMode}
//           onViewMode={setViewMode}
//           sortBy={sortBy}
//           onSort={setSortBy}
//           onAdd={() => setNoteModal({ note: null })}
//           dark={dark}
//           onDark={() => setDark((d) => !d)}
//           sidebarCollapsed={sidebarCollapsed}
//           onMobileMenu={() => setSidebarCollapsed((c) => !c)}
//           onOpenTagForm={() => setTagModalOpen(true)}
//           user={user}
//         />

//         <main
//           className="transition-all duration-300 pt-16"
//           style={{ marginLeft: sidebarCollapsed ? "68px" : "240px" }}
//         >
//           <div className="p-6 md:p-8">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h1
//                   className={`text-2xl font-black ${dark ? "text-white" : "text-gray-900"}`}
//                 >
//                   {sectionLabel}
//                 </h1>
//                 <p className="text-sm text-gray-500 mt-0.5">
//                   {loading
//                     ? "Loading..."
//                     : `${filtered.length} note${filtered.length !== 1 ? "s" : ""}${activeTag ? ` · #${activeTag}` : ""}`}
//                 </p>
//               </div>

//               {!loading && filtered.length > 0 && (
//                 <button
//                   onClick={() => setDeleteTarget("all")}
//                   className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all"
//                 >
//                   <svg
//                     width="15"
//                     height="15"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                   </svg>
//                   <span className="hidden sm:inline">Delete All</span>
//                 </button>
//               )}
//             </div>

//             <NoteGrid
//               notes={paginated}
//               loading={loading}
//               viewMode={viewMode}
//               dark={dark}
//               hasMore={hasMore}
//               remaining={filtered.length - paginated.length}
//               onLoadMore={() => setPage((p) => p + 1)}
//               onEdit={(note) => setNoteModal({ note })}
//               onDelete={(id) => setDeleteTarget(id)}
//               onFavorite={handleFavorite}
//               onArchive={handleArchive}
//               onAdd={() => setNoteModal({ note: null })}
//             />
//           </div>
//         </main>

//         {/* {noteModal && (
//           <NoteModal
//             note={noteModal.note}
//             noteColors={NOTE_COLORS}
//             onSave={handleSaveNote}
//             onClose={() => setNoteModal(null)}
//             dark={dark}
//           />
//         )} */}
//         {noteModal && (
//           <NoteModal
//             note={noteModal.note}
//             noteColors={NOTE_COLORS} // ✅ dynamic now
//             ALL_TAGS={ALL_TAGS}
//             TAG_COLORS={TAG_COLORS}
//             TAG_DOT={TAG_DOT}
//             COLOR_NAMES={COLOR_NAMES}
//             onSave={handleSaveNote}
//             onClose={() => setNoteModal(null)}
//             dark={dark}
//           />
//         )}

//         {tagModalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//             <TagForm user={user} onClose={() => setTagModalOpen(false)} />
//           </div>
//         )}

//         {deleteTarget && (
//           <DeleteModal
//             bulk={deleteTarget === "all"}
//             onConfirm={() =>
//               deleteTarget === "all"
//                 ? handleDeleteAll()
//                 : handleDeleteNote(deleteTarget)
//             }
//             onCancel={() => setDeleteTarget(null)}
//             dark={dark}
//           />
//         )}
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast, { Toaster } from "react-hot-toast";
import confetti from "canvas-confetti";

import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import NoteGrid from "../NoteGrid/NoteGrid";
import NoteModal from "../Modals/NoteModal";
import DeleteModal from "../Modals/DeleteModal";
import { AppLoader } from "../UI/AppLoader";
import TagForm from "../TageForm/TagForm";

const NOTE_COLORS = [
  "#EEF2FF",
  "#F0FDF4",
  "#FFF7ED",
  "#FDF4FF",
  "#FFFBEB",
  "#F0F9FF",
  "#FFF1F2",
  "#F0FDFA",
];

export default function Dashboard({ user }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(
    () => localStorage.getItem("nf-dark") === "true",
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [section, setSection] = useState("all");
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("date-desc");
  const [noteModal, setNoteModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [page, setPage] = useState(1);

  const [tagModalOpen, setTagModalOpen] = useState(false);

  const [ALL_TAGS, setAllTags] = useState([]);
  const [tagColors, setTagColors] = useState({});

  const PER_PAGE = 9;

  useEffect(() => {
    localStorage.setItem("nf-dark", dark);
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const generateTagColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return {
    bg: `hsl(${hue}, 70%, 92%)`,
    text: `hsl(${hue}, 60%, 35%)`,
    dot: `hsl(${hue}, 70%, 50%)`,
  };
};

useEffect(() => {
  if (!ALL_TAGS || ALL_TAGS.length === 0) return;

  setTagColors((prev) => {
    const updated = { ...prev };

    ALL_TAGS.forEach((tag) => {
      if (!updated[tag]) {
        updated[tag] = generateTagColor();
      }
    });

    return updated;
  });
}, [ALL_TAGS]);

  const syncNotesWithTags = async (updatedTags) => {
  if (!user) return;

  try {
    const ref = collection(db, "users", user.uid, "notes");
    const snap = await getDocs(ref);

    const updates = snap.docs.map(async (docSnap) => {
      const note = docSnap.data();

      if (!note.tags || note.tags.length === 0) return;

      // 🔥 keep only valid tags
      const cleanedTags = note.tags.filter((t) =>
        updatedTags.includes(t)
      );

      // update only if changed
      if (cleanedTags.length !== note.tags.length) {
        return updateDoc(docSnap.ref, {
          tags: cleanedTags,
        });
      }
    });

    await Promise.all(updates);
  } catch (err) {
    console.error("Sync error:", err);
  }
};

  // ✅ FIX 1: No orderBy() — avoids Firestore composite index error
  // ✅ FIX 2: onError callback — loading always stops, never hangs
  // ✅ FIX 3: createdAt safely parsed — handles null serverTimestamp on new docs
  useEffect(() => {
    if (!user) return;

    setLoading(true);

    const q = query(collection(db, "users", user.uid, "notes"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            ...data,
            createdAt:
              data.createdAt?.toDate?.() ??
              (data.createdAt instanceof Date ? data.createdAt : new Date()),
          };
        });
        setNotes(fetched);
        setLoading(false); // ✅ always runs — empty or not
      },
      (error) => {
        console.error("Firestore onSnapshot error:", error);
        setLoading(false); // ✅ stops loading even on error
        toast.error("Could not load notes. Check your connection.");
      },
    );

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const ref = doc(db, "users", user.uid, "settings", "main");

    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.data();

      if (data?.tags) {
        setAllTags(data.tags);
      }
    });

    return () => unsub();
  }, [user]);

  // ─── CRUD ──────────────────────────────────────────────────────────────────

  const handleSaveNote = async (data) => {
    try {
      if (noteModal?.note?.id) {
        const ref = doc(db, "users", user.uid, "notes", noteModal.note.id);
        await updateDoc(ref, {
          title: data.title,
          text: data.text,
          color: data.color,
          tags: data.tags,
          favorite: noteModal.note.favorite ?? false,
        });
        toast.success("Note updated ✨");
      } else {
        await addDoc(collection(db, "users", user.uid, "notes"), {
          title: data.title,
          text: data.text,
          color: data.color,
          tags: data.tags,
          favorite: false,
          archived: false,
          createdAt: serverTimestamp(),
        });
        toast.success("Note created 🎉");
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    }
    setNoteModal(null);
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteDoc(doc(db, "users", user.uid, "notes", id));
      toast.success("Note deleted");
    } catch {
      toast.error("Could not delete note");
    }
    setDeleteTarget(null);
  };

  const handleDeleteAll = async () => {
    try {
      const snap = await getDocs(collection(db, "users", user.uid, "notes"));
      const toDelete = snap.docs.filter((d) =>
        section === "archived" ? d.data().archived : true,
      );
      await Promise.all(
        toDelete.map((d) =>
          deleteDoc(doc(db, "users", user.uid, "notes", d.id)),
        ),
      );
      toast.success("All notes deleted 🗑️");
    } catch {
      toast.error("Could not delete notes");
    }
    setDeleteTarget(null);
  };

  const handleFavorite = async (id, current) => {
    try {
      await updateDoc(doc(db, "users", user.uid, "notes", id), {
        favorite: !current,
      });
    } catch {
      toast.error("Could not update note");
    }
  };

  const handleArchive = async (id, current) => {
    try {
      await updateDoc(doc(db, "users", user.uid, "notes", id), {
        archived: !current,
      });
      toast.success(current ? "Note unarchived" : "Note archived");
    } catch {
      toast.error("Could not archive note");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // ─── Filter + Sort in JS (no Firestore orderBy needed) ─────────────────────

  const filtered = notes
    .filter((n) => {
      if (section === "favorites") return n.favorite && !n.archived;
      if (section === "archived") return n.archived;
      return !n.archived;
    })
    .filter((n) => !activeTag || n.tags?.includes(activeTag))
    .filter(
      (n) =>
        !search ||
        n.title?.toLowerCase().includes(search.toLowerCase()) ||
        n.text?.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "date-desc") return b.createdAt - a.createdAt;
      if (sortBy === "date-asc") return a.createdAt - b.createdAt;
      return (a.title || "").localeCompare(b.title || "");
    });

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  const sectionLabel =
    section === "all"
      ? "All Notes"
      : section === "favorites"
        ? "Favorites"
        : "Archived";

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "14px",
            padding: "12px 18px",
            background: dark ? "#1F2937" : "#fff",
            color: dark ? "#F9FAFB" : "#111827",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            border: dark ? "1px solid #374151" : "1px solid #E5E7EB",
            fontFamily: "'Sora', sans-serif",
            fontSize: "14px",
          },
        }}
      />

      <div className={`min-h-screen ${dark ? "bg-gray-950" : "bg-[#F8F9FC]"}`}>
        <Sidebar
          section={section}
          onSection={(s) => {
            setSection(s);
            setPage(1);
          }}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((c) => !c)}
          activeTag={activeTag}
          onTag={(t) => {
            setActiveTag(t);
            setPage(1);
          }}
          dark={dark}
          user={user}
          onLogout={handleLogout}
          ALL_TAGS={ALL_TAGS}
          TAG_COLORS={tagColors}
        />

        <Navbar
          search={search}
          onSearch={(s) => {
            setSearch(s);
            setPage(1);
          }}
          viewMode={viewMode}
          onViewMode={setViewMode}
          sortBy={sortBy}
          onSort={setSortBy}
          onAdd={() => setNoteModal({ note: null })}
          dark={dark}
          onDark={() => setDark((d) => !d)}
          sidebarCollapsed={sidebarCollapsed}
          onMobileMenu={() => setSidebarCollapsed((c) => !c)}
          onOpenTagForm={() => setTagModalOpen(true)}
          user={user}
        />

        <main
          className="transition-all duration-300 pt-16"
          style={{ marginLeft: sidebarCollapsed ? "68px" : "240px" }}
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1
                  className={`text-2xl font-black ${dark ? "text-white" : "text-gray-900"}`}
                >
                  {sectionLabel}
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  {loading
                    ? "Loading..."
                    : `${filtered.length} note${filtered.length !== 1 ? "s" : ""}${activeTag ? ` · #${activeTag}` : ""}`}
                </p>
              </div>

              {!loading && filtered.length > 0 && (
                <button
                  onClick={() => setDeleteTarget("all")}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="hidden sm:inline">Delete All</span>
                </button>
              )}
            </div>

            <NoteGrid
              notes={paginated}
              loading={loading}
              viewMode={viewMode}
              dark={dark}
              hasMore={hasMore}
              remaining={filtered.length - paginated.length}
              onLoadMore={() => setPage((p) => p + 1)}
              onEdit={(note) => setNoteModal({ note })}
              onDelete={(id) => setDeleteTarget(id)}
              onFavorite={handleFavorite}
              onArchive={handleArchive}
              onAdd={() => setNoteModal({ note: null })}
            />
          </div>
        </main>

        {noteModal && (
          <NoteModal
            note={noteModal.note}
            noteColors={NOTE_COLORS}
            ALL_TAGS={ALL_TAGS}
            onSave={handleSaveNote}
            onClose={() => setNoteModal(null)}
            dark={dark}
          />
        )}

        {tagModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <TagForm user={user} onClose={() => setTagModalOpen(false)} onSyncNotes={syncNotesWithTags} />
          </div>
        )}

        {deleteTarget && (
          <DeleteModal
            bulk={deleteTarget === "all"}
            onConfirm={() =>
              deleteTarget === "all"
                ? handleDeleteAll()
                : handleDeleteNote(deleteTarget)
            }
            onCancel={() => setDeleteTarget(null)}
            dark={dark}
          />
        )}
      </div>
    </>
  );
}
