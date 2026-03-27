import { useState } from "react";

const TAG_COLORS = {
  work:     { bg: "#EEF2FF", text: "#4F46E5", border: "#C7D2FE" },
  design:   { bg: "#FDF4FF", text: "#9333EA", border: "#E9D5FF" },
  personal: { bg: "#F0FDF4", text: "#16A34A", border: "#BBF7D0" },
  dev:      { bg: "#FFF7ED", text: "#EA580C", border: "#FED7AA" },
};

function TagPill({ tag }) {
  const c = TAG_COLORS[tag] || { bg: "#F3F4F6", text: "#374151", border: "#E5E7EB" };
  return (
    <span
      style={{ backgroundColor: c.bg, color: c.text, borderColor: c.border }}
      className="inline-flex items-center border rounded-full text-[10px] px-2 py-0.5 font-semibold tracking-wide"
    >
      {tag}
    </span>
  );
}

export default function NoteCard({ note, onDelete, onEdit, onFavorite, onArchive, listView, dark }) {
  const [hovered, setHovered] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    setDeleting(true);
    setTimeout(() => onDelete(note.id), 350);
  };

  const cardStyle = dark
    ? { backgroundColor: "#1F2937" }
    : { backgroundColor: note.color || "#FFFFFF" };

  const borderClass = dark ? "border-gray-700" : "border-black/5";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...cardStyle,
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
        transform: deleting ? "scale(0.85)" : hovered ? "translateY(-2px)" : "translateY(0)",
        opacity: deleting ? 0 : 1,
        boxShadow: hovered
          ? "0 12px 40px rgba(0,0,0,0.12)"
          : "0 2px 8px rgba(0,0,0,0.06)",
      }}
      className={`relative rounded-2xl border ${borderClass} cursor-pointer select-none
        ${listView ? "flex items-start gap-4 p-4" : "flex flex-col p-5"}`}
      onClick={() => onEdit(note)}
    >
      {/* Favorite Star */}
      <button
        onClick={(e) => { e.stopPropagation(); onFavorite(note.id, note.favorite); }}
        style={{
          opacity: hovered || note.favorite ? 1 : 0,
          transition: "opacity 0.2s",
        }}
        className={`absolute top-3 right-3 p-1.5 rounded-lg transition-colors
          ${note.favorite
            ? "text-amber-400"
            : "text-gray-300 hover:text-amber-400"}`}
        title={note.favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <svg width="16" height="16" viewBox="0 0 24 24"
          fill={note.favorite ? "currentColor" : "none"}
          stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </button>

      {/* Content */}
      <div className={listView ? "flex-1 min-w-0" : "flex-1"}>
        <h3 className={`font-bold truncate pr-7 ${dark ? "text-white" : "text-gray-900"} ${listView ? "text-base" : "text-base mb-2"}`}>
          {note.title || (
            <span className={`font-normal italic ${dark ? "text-gray-500" : "text-gray-400"}`}>
              Untitled
            </span>
          )}
        </h3>
        <p className={`text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"} ${listView ? "line-clamp-1" : "line-clamp-2 mb-4"}`}>
          {note.text || "No content yet..."}
        </p>
      </div>

      {/* Footer */}
      <div className={`flex items-center justify-between
        ${listView
          ? "mt-0 ml-4 shrink-0 flex-col items-end gap-2"
          : `mt-auto pt-3 border-t ${dark ? "border-white/5" : "border-black/5"}`}`}
      >
        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap">
          {note.tags?.map((t) => <TagPill key={t} tag={t} />)}
        </div>

        <div className="flex items-center gap-3">
          {/* Date */}
          <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">
            {note.createdAt instanceof Date
              ? note.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              : ""}
          </span>

          {/* Action Icons - appear on hover */}
          <div
            className="flex gap-1 transition-opacity"
            style={{ opacity: hovered ? 1 : 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Archive */}
            <button
              onClick={() => onArchive(note.id, note.archived)}
              className={`p-1.5 rounded-lg transition-all text-gray-400
                ${dark ? "hover:text-purple-400 hover:bg-purple-900/30" : "hover:text-purple-500 hover:bg-purple-50"}`}
              title={note.archived ? "Unarchive" : "Archive"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 4a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 20V4z" />
              </svg>
            </button>

            {/* Edit */}
            <button
              onClick={() => onEdit(note)}
              className={`p-1.5 rounded-lg transition-all text-gray-400
                ${dark ? "hover:text-indigo-400 hover:bg-indigo-900/30" : "hover:text-indigo-500 hover:bg-indigo-50"}`}
              title="Edit note"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>

            {/* Delete */}
            <button
              onClick={handleDelete}
              className={`p-1.5 rounded-lg transition-all text-gray-400
                ${dark ? "hover:text-red-400 hover:bg-red-900/30" : "hover:text-red-500 hover:bg-red-50"}`}
              title="Delete note"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}