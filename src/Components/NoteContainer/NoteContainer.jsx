// when user add new note as popup way after save with note updated

import React, { useState, useEffect } from "react";
import Note from "../Note/Note";
import Sidebar from "../Sidebar/Sidebar";
import confetti from "canvas-confetti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function NoteContainer() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [searchTerm, setSearchTerm] = useState(""); // ✅ New state
  const [recentlyEditedId, setRecentlyEditedId] = useState(null);
  const [filterDate, setFilterDate] = useState("");
  const [deletingAll, setDeletingAll] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [validationMsg, setValidationMsg] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    text: "",
    color: "#fff",
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // ✅ Filtered notes (search + date)
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.text.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = filterDate
      ? new Date(note.time).toLocaleDateString("en-CA") === filterDate
      : true;

    return matchesSearch && matchesDate;
  });

  // Open modal for adding a new note
  const handleAddNoteClick = (color) => {
    setNewNote({ title: "", text: "", color: color || "#fff" });
    setShowModal(true);
  };

  // Save new note
  const saveNewNote = () => {
    // if (newNote.title.trim() === "" && newNote.text.trim() === "") {
    //   setShowModal(false);
    //   return;
    // }
    const title = newNote.title.trim();
    const text = newNote.text.trim();

    if (!title && !text) {
      setValidationMsg("Please add a title or some text before submitting.");
      return; // keep modal open
    }

    const noteToSave = {
      ...newNote,
      id: Date.now() + "" + Math.floor(Math.random() * 78),
      time: Date.now(),
    };

    setNotes((prevNotes) => [noteToSave, ...prevNotes]);
    setShowModal(false);
    setValidationMsg(""); // reset message
  };

  const updateNote = (id, newTitle, newText) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              title: newTitle,
              text: newText,
              time: new Date().toISOString(),
            }
          : note,
      );

      updatedNotes.sort((a, b) => new Date(b.time) - new Date(a.time));
      return updatedNotes;
    });

    // Confetti 🎉
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#4caf50", "#ff9800", "#2196f3", "#e91e63"],
    });

    // Show toast ✅
    setToastMsg("Update successful — your note is now on top ✨");
    setShowToast(true);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const deleteAllNotes = () => {
    setDeletingAll(true);
    setTimeout(() => {
      setNotes([]);
      localStorage.removeItem("notes");
      setDeletingAll(false);
    }, 300);
  };

  return (
    <div className="w-full min-h-screen px-1 md:px-8 py-6 flex gap-2">
      {/* Sidebar */}
      {!selectedNote && (
        <div className="flex flex-col md:w-10 w-0 h-screen">
          <Sidebar addNote={handleAddNoteClick} />
        </div>
      )}

      {/* Notes List */}
      <div className="flex-1">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">All Notes</h2>

            {!selectedNote && (
              <button
                onClick={deleteAllNotes}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition transform hover:scale-105 duration-200"
              >
                <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                Delete All
              </button>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full md:w-2/3 lg:w-1/2">
              {/* Search Icon */}
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Toast */}
          {showToast && (
            <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl z-50 animate-bounce">
              {toastMsg}
            </div>
          )}

          {/* Notes Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {filteredNotes.length === 0 ? (
              <p className="text-gray-400">No notes added yet</p>
            ) : (
              filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className={` p-1 ${
                    recentlyEditedId === note.id ? "animate-pulse" : ""
                  }`}
                >
                  <Note
                    note={note}
                    deleteNote={deleteNote}
                    updateNote={updateNote}
                    setSelectedNote={setSelectedNote}
                    isFullScreen={false}
                    deletingAll={deletingAll}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Fullscreen Mode */}
        {selectedNote && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="relative w-[95%] md:w-[70%] lg:w-[50%] h-[80%]">
              <Note
                note={selectedNote}
                updateNote={updateNote}
                deleteNote={deleteNote}
                setSelectedNote={setSelectedNote}
                isFullScreen={true}
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute top-4 right-4 bg-white text-red-500 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:scale-110 transition z-50"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Note Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-7 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight">
              Add Note
            </h3>

            <input
              type="text"
              placeholder="Title"
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
              required
              className="w-full mb-4 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200 outline-none shadow-sm"
            />

            <textarea
              rows={3}
              placeholder="Text"
              value={newNote.text}
              onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
              required
              className="w-full mb-4 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-200 outline-none shadow-sm resize-none"
            />

            {validationMsg && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-5">
                <svg
                  className="w-5 h-5 flex-shrink-0 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-sm font-medium">{validationMsg}</span>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={saveNewNote}
                className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-sm shadow-indigo-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all duration-200"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoteContainer;
