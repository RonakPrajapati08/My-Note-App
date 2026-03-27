import { useState, useRef, useEffect } from "react";

const ALL_TAGS = ["work", "design", "personal", "dev"];

const TAG_COLORS = {
  work:     { bg: "#EEF2FF", text: "#4F46E5", border: "#C7D2FE" },
  design:   { bg: "#FDF4FF", text: "#9333EA", border: "#E9D5FF" },
  personal: { bg: "#F0FDF4", text: "#16A34A", border: "#BBF7D0" },
  dev:      { bg: "#FFF7ED", text: "#EA580C", border: "#FED7AA" },
};

export default function NoteModal({ note, noteColors, onSave, onClose, dark }) {
  const [title, setTitle] = useState(note?.title || "");
  const [text, setText] = useState(note?.text || "");
  const [color, setColor] = useState(note?.color || noteColors[0]);
  const [tags, setTags] = useState(note?.tags || []);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const titleRef = useRef(null);

  useEffect(() => {
    // Animate in
    setTimeout(() => setVisible(true), 10);
    setTimeout(() => titleRef.current?.focus(), 120);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  const toggleTag = (t) =>
    setTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const handleSave = () => {
    if (!title.trim() && !text.trim()) {
      setError("Please add a title or some content.");
      return;
    }
    onSave({ title: title.trim(), text: text.trim(), color, tags });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") handleClose();
    if (e.key === "Enter" && e.ctrlKey) handleSave();
  };

  const overlayBg = dark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)";
  const modalBg = dark ? "#111827" : "#ffffff";
  const borderColor = dark ? "#1F2937" : "#F3F4F6";
  const inputBg = dark ? "transparent" : "transparent";
  const textColor = dark ? "#F9FAFB" : "#111827";
  const placeholderClass = "placeholder-gray-400";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: overlayBg,
        backdropFilter: "blur(6px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      onKeyDown={handleKeyDown}
    >
      <div
        style={{
          background: modalBg,
          border: `1px solid ${borderColor}`,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.94) translateY(12px)",
          transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease",
          opacity: visible ? 1 : 0,
        }}
        className="w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Color Header Strip */}
        <div
          style={{
            backgroundColor: dark ? "#1F2937" : color,
            transition: "background-color 0.3s ease",
          }}
          className="px-6 pt-6 pb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-[10px] font-black uppercase tracking-widest"
              style={{ color: dark ? "#6B7280" : "#9CA3AF" }}
            >
              {note?.id ? "Edit Note" : "New Note"}
            </span>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 transition-colors hover:bg-black/10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <input
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            style={{
              background: inputBg,
              color: textColor,
              fontFamily: "'Sora', sans-serif",
            }}
            className={`w-full text-xl font-bold outline-none ${placeholderClass}`}
          />
        </div>

        {/* Body */}
        <div className="px-6 pb-6" style={{ background: modalBg }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing your note..."
            rows={5}
            style={{
              background: inputBg,
              color: dark ? "#D1D5DB" : "#374151",
              fontFamily: "'Sora', sans-serif",
              resize: "none",
            }}
            className={`w-full text-sm leading-relaxed outline-none pt-3 ${placeholderClass}`}
          />

          {/* Error */}
          {error && (
            <div className="mb-4 flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-xl text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* Tags */}
          <div className="mb-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
              Tags
            </p>
            <div className="flex gap-2 flex-wrap">
              {ALL_TAGS.map((t) => {
                const c = TAG_COLORS[t];
                const isActive = tags.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => toggleTag(t)}
                    style={isActive
                      ? { backgroundColor: c.bg, color: c.text, borderColor: c.border }
                      : {}}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all
                      ${isActive
                        ? "border-opacity-100"
                        : dark
                          ? "border-gray-600 text-gray-500 hover:border-gray-500"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Picker */}
          <div className="mb-5">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
              Card Color
            </p>
            <div className="flex gap-2 flex-wrap">
              {noteColors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110
                    ${color === c
                      ? "border-indigo-500 scale-110"
                      : "border-transparent"}`}
                  title={c}
                />
              ))}
            </div>
          </div>

          {/* Hint */}
          <p className="text-[10px] text-gray-400 mb-4">
            Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 text-[10px] font-mono">Ctrl+Enter</kbd> to save quickly
          </p>

          {/* Action Buttons */}
          <div className={`flex justify-end gap-3 pt-3 border-t ${dark ? "border-gray-700" : "border-gray-100"}`}>
            <button
              onClick={handleClose}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all
                ${dark
                  ? "text-gray-400 bg-gray-700 hover:bg-gray-600"
                  : "text-gray-600 bg-gray-100 hover:bg-gray-200"}`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
              {note?.id ? "Save Changes" : "Create Note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}