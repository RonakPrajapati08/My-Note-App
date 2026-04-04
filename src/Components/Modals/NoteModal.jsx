// import { useState, useRef, useEffect } from "react";

// const ALL_TAGS = ["work", "design", "personal", "dev"];

// const TAG_COLORS = {
//   work:     { bg: "#EEF2FF", text: "#4F46E5", border: "#C7D2FE" },
//   design:   { bg: "#FDF4FF", text: "#9333EA", border: "#E9D5FF" },
//   personal: { bg: "#F0FDF4", text: "#16A34A", border: "#BBF7D0" },
//   dev:      { bg: "#FFF7ED", text: "#EA580C", border: "#FED7AA" },
// };

// export default function NoteModal({ note, noteColors, onSave, onClose, dark }) {
//   const [title, setTitle] = useState(note?.title || "");
//   const [text, setText] = useState(note?.text || "");
//   const [color, setColor] = useState(note?.color || noteColors[0]);
//   const [tags, setTags] = useState(note?.tags || []);
//   const [error, setError] = useState("");
//   const [visible, setVisible] = useState(false);

//   const titleRef = useRef(null);

//   useEffect(() => {
//     // Animate in
//     setTimeout(() => setVisible(true), 10);
//     setTimeout(() => titleRef.current?.focus(), 120);
//   }, []);

//   const handleClose = () => {
//     setVisible(false);
//     setTimeout(onClose, 200);
//   };

//   const toggleTag = (t) =>
//     setTags((prev) =>
//       prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
//     );

//   const handleSave = () => {
//     if (!title.trim() && !text.trim()) {
//       setError("Please add a title or some content.");
//       return;
//     }
//     onSave({ title: title.trim(), text: text.trim(), color, tags });
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Escape") handleClose();
//     if (e.key === "Enter" && e.ctrlKey) handleSave();
//   };

//   const overlayBg = dark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)";
//   const modalBg = dark ? "#111827" : "#ffffff";
//   const borderColor = dark ? "#1F2937" : "#F3F4F6";
//   const inputBg = dark ? "transparent" : "transparent";
//   const textColor = dark ? "#F9FAFB" : "#111827";
//   const placeholderClass = "placeholder-gray-400";

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4"
//       style={{
//         background: overlayBg,
//         backdropFilter: "blur(6px)",
//         opacity: visible ? 1 : 0,
//         transition: "opacity 0.2s ease",
//       }}
//       onClick={(e) => e.target === e.currentTarget && handleClose()}
//       onKeyDown={handleKeyDown}
//     >
//       <div
//         style={{
//           background: modalBg,
//           border: `1px solid ${borderColor}`,
//           transform: visible ? "scale(1) translateY(0)" : "scale(0.94) translateY(12px)",
//           transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease",
//           opacity: visible ? 1 : 0,
//         }}
//         className="w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
//       >
//         {/* Color Header Strip */}
//         <div
//           style={{
//             backgroundColor: dark ? "#1F2937" : color,
//             transition: "background-color 0.3s ease",
//           }}
//           className="px-6 pt-6 pb-4"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <span
//               className="text-[10px] font-black uppercase tracking-widest"
//               style={{ color: dark ? "#6B7280" : "#9CA3AF" }}
//             >
//               {note?.id ? "Edit Note" : "New Note"}
//             </span>
//             <button
//               onClick={handleClose}
//               className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 transition-colors hover:bg-black/10"
//             >
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//           <input
//             ref={titleRef}
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Note title..."
//             style={{
//               background: inputBg,
//               color: textColor,
//               fontFamily: "'Sora', sans-serif",
//             }}
//             className={`w-full text-xl font-bold outline-none ${placeholderClass}`}
//           />
//         </div>

//         {/* Body */}
//         <div className="px-6 pb-6" style={{ background: modalBg }}>
//           <textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Start writing your note..."
//             rows={5}
//             style={{
//               background: inputBg,
//               color: dark ? "#D1D5DB" : "#374151",
//               fontFamily: "'Sora', sans-serif",
//               resize: "none",
//             }}
//             className={`w-full text-sm leading-relaxed outline-none pt-3 ${placeholderClass}`}
//           />

//           {/* Error */}
//           {error && (
//             <div className="mb-4 flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-xl text-sm">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               {error}
//             </div>
//           )}

//           {/* Tags */}
//           <div className="mb-4">
//             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
//               Tags
//             </p>
//             <div className="flex gap-2 flex-wrap">
//               {ALL_TAGS.map((t) => {
//                 const c = TAG_COLORS[t];
//                 const isActive = tags.includes(t);
//                 return (
//                   <button
//                     key={t}
//                     onClick={() => toggleTag(t)}
//                     style={isActive
//                       ? { backgroundColor: c.bg, color: c.text, borderColor: c.border }
//                       : {}}
//                     className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all
//                       ${isActive
//                         ? "border-opacity-100"
//                         : dark
//                           ? "border-gray-600 text-gray-500 hover:border-gray-500"
//                           : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
//                   >
//                     {t}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Color Picker */}
//           <div className="mb-5">
//             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
//               Card Color
//             </p>
//             <div className="flex gap-2 flex-wrap">
//               {noteColors.map((c) => (
//                 <button
//                   key={c}
//                   onClick={() => setColor(c)}
//                   style={{ backgroundColor: c }}
//                   className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110
//                     ${color === c
//                       ? "border-indigo-500 scale-110"
//                       : "border-transparent"}`}
//                   title={c}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Hint */}
//           <p className="text-[10px] text-gray-400 mb-4">
//             Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 text-[10px] font-mono">Ctrl+Enter</kbd> to save quickly
//           </p>

//           {/* Action Buttons */}
//           <div className={`flex justify-end gap-3 pt-3 border-t ${dark ? "border-gray-700" : "border-gray-100"}`}>
//             <button
//               onClick={handleClose}
//               className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all
//                 ${dark
//                   ? "text-gray-400 bg-gray-700 hover:bg-gray-600"
//                   : "text-gray-600 bg-gray-100 hover:bg-gray-200"}`}
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSave}
//               className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
//             >
//               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M5 13l4 4L19 7" />
//               </svg>
//               {note?.id ? "Save Changes" : "Create Note"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { collection, getDocs, updateDoc } from "firebase/firestore";

// const ALL_TAGS = ["work", "design", "personal", "dev"];

const getTagColor = (tag) => {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;

  return {
    bg: `hsla(${hue}, 70%, 90%, 0.6)`, // 👈 soft glass bg
    border: `hsla(${hue}, 60%, 70%, 0.4)`,
    text: `hsl(${hue}, 40%, 30%)`,
    dot: `hsl(${hue}, 60%, 40%)`,
  };
};

const COLOR_NAMES = {
  "#EEF2FF": "Lavender",
  "#F0FDF4": "Mint",
  "#FFF7ED": "Peach",
  "#FDF4FF": "Lilac",
  "#FFFBEB": "Butter",
  "#F0F9FF": "Sky",
  "#FFF1F2": "Rose",
  "#F0FDFA": "Teal",
};

export default function NoteModal({
  note,
  noteColors,
  onSave,
  onClose,
  dark,
  ALL_TAGS = [],
}) {
  const [title, setTitle] = useState(note?.title || "");
  const [text, setText] = useState(note?.text || "");
  const [color, setColor] = useState(note?.color || noteColors[0]);
  const [tags, setTags] = useState(note?.tags || []);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  const [oldTags, setOldTags] = useState([]);

  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const colorRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
    setTimeout(() => titleRef.current?.focus(), 120);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (tagRef.current && !tagRef.current.contains(e.target))
        setTagOpen(false);
      if (colorRef.current && !colorRef.current.contains(e.target))
        setColorOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  const toggleTag = (tagName) =>
    setTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((x) => x !== tagName)
        : [...prev, tagName],
    );

  const handleSave = () => {
    if (!title.trim() && !text.trim()) {
      setError("Please add a title or some content.");
      return;
    }

    onSave({
      title: title.trim(),
      text: text.trim(),
      color,
      tags,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      if (tagOpen) {
        setTagOpen(false);
        return;
      }
      if (colorOpen) {
        setColorOpen(false);
        return;
      }
      handleClose();
    }
    if (e.key === "Enter" && e.ctrlKey) handleSave();
  };

  // ── theme tokens ────────────────────────────────────────────────────────────
  const overlayBg = dark ? "rgba(0,0,0,0.75)" : "rgba(15,23,42,0.6)";
  const modalBg = dark ? "#111827" : "#ffffff";
  const borderColor = dark ? "#1F2937" : "#F1F5F9";
  const textColor = dark ? "#F9FAFB" : "#0F172A";
  const subText = dark ? "#9CA3AF" : "#6B7280";
  const dropBg = dark ? "#1E293B" : "#ffffff";
  const dropBorder = dark ? "#334155" : "#E5E7EB";
  const rowHover = dark ? "#0F172A" : "#F8FAFF";
  const inputBorder = dark ? "#374151" : "#E5E7EB";
  const inputBg = dark ? "#1E293B" : "#F8FAFF";

  // ── shared dropdown trigger style ───────────────────────────────────────────
  const triggerCls = `w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium cursor-pointer transition-all duration-200 hover:border-indigo-400 focus:outline-none`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      style={{
        background: overlayBg,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      onKeyDown={handleKeyDown}
    >
      <div
        style={{
          background: modalBg,
          border: `1px solid ${borderColor}`,
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(0.96) translateY(20px)",
          transition:
            "transform 0.3s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.25s ease",
          opacity: visible ? 1 : 0,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Inter', 'Sora', system-ui, sans-serif",
        }}
        className="w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* ══ HEADER with Color Accent ═══════════════════════════════════════ */}
        <div
          style={{
            backgroundColor: dark ? "#1E293B" : color,
            transition: "background-color 0.3s ease",
            flexShrink: 0,
            borderBottom: `1px solid ${dark ? "#334155" : "rgba(0,0,0,0.05)"}`,
          }}
          className="px-8 pt-6 pb-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12h14" stroke="white" />
                </svg>
              </div>
              <span
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: dark ? "#94A3B8" : "rgba(0,0,0,0.5)" }}
              >
                {note?.id ? "EDIT NOTE" : "CREATE NEW NOTE"}
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 transition-all hover:bg-black/10 backdrop-blur-sm"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <input
            ref={titleRef}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            placeholder="Untitled Note"
            style={{
              background: "transparent",
              color: dark ? "#F9FAFB" : "#0F172A",
              fontFamily: "'Inter', 'Sora', sans-serif",
              fontSize: "26px",
              fontWeight: "700",
              letterSpacing: "-0.4px",
              lineHeight: "1.3",
            }}
            className="w-full outline-none placeholder-gray-400/60"
          />
        </div>

        {/* ══ SCROLLABLE BODY ══════════════════════════════════════════════ */}
        <div
          style={{ background: modalBg, overflowY: "auto", flex: 1 }}
          className="px-8 py-6 flex flex-col gap-5"
        >
          {/* Enhanced Textarea Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: subText }}
              >
                Content
              </label>
              <span
                className="text-[10px] font-mono"
                style={{ color: subText }}
              >
                {text.length} chars · {text.split(/\s+/).filter(Boolean).length}{" "}
                words
              </span>
            </div>
            <div
              style={{
                background: inputBg,
                border: `1.5px solid ${inputBorder}`,
                borderRadius: "16px",
                overflow: "hidden",
                transition: "border-color 0.2s ease",
              }}
              className="focus-within:border-indigo-400"
            >
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setError("");
                }}
                placeholder="Write your thoughts here..."
                rows={13}
                style={{
                  background: "transparent",
                  color: dark ? "#D1D5DB" : "#1F2937",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "14px",
                  lineHeight: "1.7",
                  resize: "vertical",
                  width: "100%",
                  padding: "18px 20px",
                  outline: "none",
                }}
                className="placeholder-gray-400"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium animate-shake"
              style={{
                background: dark ? "rgba(239,68,68,0.12)" : "#FEF2F2",
                border: `1px solid ${dark ? "#7F1A1A" : "#FECACA"}`,
                color: dark ? "#FCA5A5" : "#DC2626",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* ── Two dropdowns side by side ──────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {/* ── TAG DROPDOWN with Better UI ─────────────────────────────────── */}
            <div ref={tagRef} className="relative">
              <label
                className="text-[11px] font-bold uppercase tracking-wider mb-2 block"
                style={{ color: subText }}
              >
                Tags
              </label>

              {/* Trigger */}
              <button
                onClick={() => {
                  setTagOpen((o) => !o);
                  setColorOpen(false);
                }}
                className={triggerCls}
                style={{
                  background: inputBg,
                  border: `1.5px solid ${tagOpen ? "#6366F1" : inputBorder}`,
                  color: textColor,
                  boxShadow: tagOpen
                    ? "0 0 0 3px rgba(99,102,241,0.1)"
                    : "none",
                }}
              >
                <span className="flex items-center gap-2 flex-wrap min-w-0">
                  {tags.length === 0 ? (
                    <span style={{ color: subText }}>No tags selected</span>
                  ) : (
                    tags.map((t) => {
                      const tagName = typeof t === "object" ? t.name : t;

                      const c = getTagColor(tagName);

                      return (
                        <span
                          key={tagName} // ✅ FIXED
                          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-md"
                          style={{
                            background: c.bg,
                            border: `1px solid ${c.border}`,
                            color: c.text,
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: c.dot }}
                          />
                          {tagName} {/* ✅ FIXED */}
                        </span>
                      );
                    })
                  )}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: tagOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown panel with better tag buttons */}
              {tagOpen && (
                <div
                  style={{
                    background: dropBg,
                    border: `1px solid ${dropBorder}`,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    borderRadius: "12px",
                    marginTop: "8px",
                    zIndex: 100,
                    overflow: "hidden",
                  }}
                  className="absolute left-0 right-0"
                >
                  {ALL_TAGS.map((t, i) => {
                    const tagName = typeof t === "object" ? t.name : t;

                    const c = getTagColor(tagName);
                    const isOn = tags.some(
                      (tag) =>
                        (typeof tag === "object" ? tag.name : tag) === tagName,
                    );

                    return (
                      <button
                        key={tagName} // ✅ FIXED
                        onClick={() => toggleTag(tagName)}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 16px",
                          background: isOn
                            ? dark
                              ? "#1E293B"
                              : "#F5F7FF"
                            : "transparent",
                          borderTop: i > 0 ? `1px solid ${dropBorder}` : "none",
                          cursor: "pointer",
                          transition: "all 0.15s",
                          fontFamily: "'Inter', sans-serif",
                        }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center backdrop-blur-md"
                            style={{
                              background: c.bg,
                              border: `1px solid ${c.border}`,
                            }}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: c.dot,
                              }}
                            />
                          </div>
                          <span
                            className="text-sm font-semibold capitalize"
                            style={{ color: textColor }}
                          >
                            {tagName}
                          </span>
                        </div>
                        {isOn && (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#6366F1"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── COLOR DROPDOWN with Better UI ───────────────────────────────── */}
            <div ref={colorRef} className="relative">
              <label
                className="text-[11px] font-bold uppercase tracking-wider mb-2 block"
                style={{ color: subText }}
              >
                Card Color
              </label>

              {/* Trigger */}
              <button
                onClick={() => {
                  setColorOpen((o) => !o);
                  setTagOpen(false);
                }}
                className={triggerCls}
                style={{
                  background: inputBg,
                  border: `1.5px solid ${colorOpen ? "#6366F1" : inputBorder}`,
                  color: textColor,
                  boxShadow: colorOpen
                    ? "0 0 0 3px rgba(99,102,241,0.1)"
                    : "none",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-lg shadow-sm"
                    style={{
                      backgroundColor: color,
                      border: `1px solid ${dark ? "#334155" : "#E2E8F0"}`,
                    }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: textColor }}
                  >
                    {COLOR_NAMES[color] || "Custom"}
                  </span>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: colorOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown panel with color grid */}
              {/* Dropdown panel with color grid */}
              {colorOpen && (
                <div
                  style={{
                    background: dropBg,
                    border: `1px solid ${dropBorder}`,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    borderRadius: "12px",
                    marginTop: "8px",
                    zIndex: 100,
                    overflow: "hidden",
                  }}
                  className="absolute left-0 right-0"
                >
                  <div className="p-3 grid grid-cols-2 gap-2">
                    {noteColors.map((clr) => {
                      // 🔥 renamed from c → clr
                      const isOn = color === clr;

                      return (
                        <button
                          key={clr}
                          onClick={() => {
                            setColor(clr);
                            setColorOpen(false);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 12px",
                            background: isOn
                              ? dark
                                ? "#1E293B"
                                : "#F5F7FF"
                              : "transparent",
                            borderRadius: "10px",
                            cursor: "pointer",
                            transition: "all 0.15s",
                          }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <div
                            className="w-8 h-8 rounded-lg shadow-sm"
                            style={{
                              backgroundColor: clr, // ✅ FIX
                              border: `1px solid ${dark ? "#334155" : "#E2E8F0"}`,
                            }}
                          />
                          <span
                            className="text-sm font-medium flex-1 text-left"
                            style={{ color: textColor }}
                          >
                            {COLOR_NAMES[clr] || clr}
                          </span>

                          {isOn && (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#6366F1"
                              strokeWidth="2.5"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tag preview section */}
          {/* {tags.length > 0 && (
            <div className="pt-2">
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => {
                  const colors = TAG_COLORS[tag];
                  return (
                    <span
                      key={tag}
                      style={{
                        backgroundColor: colors.bg,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                      }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: TAG_DOT[tag] }} />
                      {tag}
                      <button
                        onClick={() => toggleTag(tag)}
                        className="ml-1 hover:opacity-70"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )} */}

          {/* Keyboard hints */}
          <div className="flex items-center gap-4 pt-3 pb-1">
            <p
              className="text-[11px] flex items-center gap-2"
              style={{ color: subText }}
            >
              <kbd
                className="px-2 py-0.5 rounded-md text-[10px] font-mono"
                style={{
                  background: dark ? "#1E293B" : "#F1F5F9",
                  color: subText,
                  border: `1px solid ${inputBorder}`,
                }}
              >
                ⌘
              </kbd>
              <span>+</span>
              <kbd
                className="px-2 py-0.5 rounded-md text-[10px] font-mono"
                style={{
                  background: dark ? "#1E293B" : "#F1F5F9",
                  color: subText,
                  border: `1px solid ${inputBorder}`,
                }}
              >
                ↵
              </kbd>
              <span>Save</span>
            </p>
            <p
              className="text-[11px] flex items-center gap-2"
              style={{ color: subText }}
            >
              <kbd
                className="px-2 py-0.5 rounded-md text-[10px] font-mono"
                style={{
                  background: dark ? "#1E293B" : "#F1F5F9",
                  color: subText,
                  border: `1px solid ${inputBorder}`,
                }}
              >
                ⎋
              </kbd>
              <span>Close</span>
            </p>
          </div>
        </div>

        {/* ══ STICKY FOOTER with Better Buttons ═══════════════════════════════ */}
        <div
          style={{
            borderTop: `1px solid ${dark ? "#1F2937" : "#F1F5F9"}`,
            background: dark ? "#0F172A" : "#FAFBFF",
            flexShrink: 0,
          }}
          className="px-8 py-5 flex justify-end gap-3"
        >
          <button
            onClick={handleClose}
            className="px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              color: dark ? "#9CA3AF" : "#6B7280",
              background: dark ? "#1F2937" : "#F3F4F6",
              border: `1px solid ${dark ? "#374151" : "#E5E7EB"}`,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-7 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 shadow-lg shadow-indigo-500/25"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            {note?.id ? "Save Changes" : "Create Note"}
          </button>
        </div>
      </div>
    </div>
  );
}
