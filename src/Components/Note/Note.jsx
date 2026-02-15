import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TrashIcon } from '@heroicons/react/24/solid';
import {
  faTrash, // delete
  faEdit, // edit
  faThumbtack, // pin
  faPlus,
  faFloppyDisk, // add note
} from "@fortawesome/free-solid-svg-icons";

function Note({
  note,
  deleteNote,
  updateNote,
  setSelectedNote,
  isFullScreen,
  deletingAll,
}) {
  const [title, setTitle] = useState(note.title || "");
  const [text, setText] = useState(note.text || "");
  const [isEditing, setIsEditing] = useState(isFullScreen);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setTitle(note.title || "");
    setText(note.text || "");
  }, [note]);

  useEffect(() => {
    if (deletingAll) setDeleting(true);
  }, [deletingAll]);

  const handleSave = () => {
    updateNote(note.id, title, text);
    setIsEditing(false);
    setSelectedNote(null);
  };

  return (
    <div
      className={`
  relative flex flex-col rounded-2xl 
  transition-all duration-300
  ${deleting ? "scale-0 opacity-0" : ""}
  ${
    isFullScreen
      ? "w-full h-full p-6 overflow-hidden"
      : "aspect-[2/3] p-3 sm:aspect-auto sm:h-[300px] md:h-[320px] lg:h-[340px] sm:p-4"
  }
`}
      style={{ backgroundColor: note.color }}
    >
      {/* TITLE + TEXT */}
      <div className="flex flex-col gap-3 flex-1">
        {!isEditing ? (
          <div
            className="font-bold
  text-sm sm:text-base md:text-lg lg:text-xl
  text-gray-700 truncate cursor-pointer"
            onClick={() => setSelectedNote(note)}
          >
            {title}
          </div>
        ) : (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title..."
            className="bg-transparent outline-none
  font-bold
  text-sm sm:text-base md:text-lg lg:text-xl
  text-gray-700"
          />
        )}

        {!isEditing ? (
          <div
            className="text-[10px] leading-[1.1rem] sm:text-xs md:text-sm lg:text-[0.8rem] lg:leading-[1.7rem]
           text-gray-700 line-clamp-5 sm:line-clamp-[8] md:line-clamp-[10] lg:line-clamp-[8] 
           whitespace-pre-wrap cursor-pointer"
            onClick={() => setSelectedNote(note)}
          >
            {text}
          </div>
        ) : (
          <textarea
            rows="8"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your note here..."
            className="resize-none bg-transparent outline-none 
             text-gray-700 text-sm 
             flex-1 overflow-y-auto"
          />
        )}
      </div>

      {/* FOOTER */}
      <div className="mt-auto flex items-center justify-between pt-3">
        <p className="text-[9px] sm:text-xs font-semibold text-gray-700">
          {new Date(note.time).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>

        {/* Delete Note */}
        {!isFullScreen && (
  <TrashIcon
    className="
      text-red-500 
      bg-white 
      rounded-full 
      p-1
      shadow 
      cursor-pointer 
      hover:scale-110 
      transition-transform 
      duration-200
      w-5 h-5       /* mobile size */
      sm:w-6 sm:h-6 /* tablet */
      md:w-7 md:h-7 /* laptop */
      lg:w-7 lg:h-7 /* desktop */
    "
    onClick={() => {
      setDeleting(true);
      setTimeout(() => deleteNote(note.id), 300);
    }}
  />
)}
      </div>

      {/* SAVE BUTTON (Fullscreen Only) */}
      {isFullScreen && isEditing && (
        <button
          onClick={handleSave}
          className="absolute bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg shadow-lg transition-transform transform hover:scale-110"
        >
          <FontAwesomeIcon icon={faFloppyDisk} className="text-white w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export default Note;
