import { useState, useEffect } from "react";
import {
  doc,
  onSnapshot,
  setDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function TagForm({ user, onClose }) {
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Load existing tags
  useEffect(() => {
    if (!user) return;

    const ref = doc(db, "users", user.uid, "settings", "main");

    const unsub = onSnapshot(ref, (snap) => {
      const data = snap.data();
      if (data) {
        setTags(data.tags || []);
      }
    });

    return () => unsub();
  }, [user]);

  //radom color generator
  const generateTagColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return {
      bg: `hsl(${hue}, 70%, 92%)`,
      text: `hsl(${hue}, 60%, 35%)`,
      dot: `hsl(${hue}, 70%, 50%)`,
    };
  };

  // ✅ ADD TAG
  const handleAddTag = () => {
    const tag = inputTag.trim();
    if (!tag || tags.includes(tag)) return;

    // setTags([...tags, { tag, color: generateTagColor() }]);
    setTags([
      ...tags,
      {
        name: tag, // ✅ FIX
        color: generateTagColor(),
      },
    ]);
    setInputTag("");
  };

  // ✅ REMOVE TAG
  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t.name !== tag));
  };

  // 🔥 SAVE TAGS TO FIRESTORE
  const handleSave = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const ref = doc(db, "users", user.uid, "settings", "main");

      // ✅ save tags
      await setDoc(
        ref,
        {
          tags,
          updatedAt: new Date(),
        },
        { merge: true },
      );

      // 🔥 SYNC NOTES (MAIN LOGIC)
      const notesRef = collection(db, "users", user.uid, "notes");
      const snap = await getDocs(notesRef);

      const updates = snap.docs.map(async (docSnap) => {
        const note = docSnap.data();

        if (!note.tags || note.tags.length === 0) return;

        // 👉 keep only valid tags
        // const cleanedTags = note.tags.filter((t) => tags.includes(t));
        const tagNames = tags.map((t) => t.name);

        const cleanedTags = note.tags.filter((t) => tagNames.includes(t));

        if (cleanedTags.length !== note.tags.length) {
          return updateDoc(docSnap.ref, {
            tags: cleanedTags,
          });
        }
      });

      await Promise.all(updates);

      onClose();
    } catch (err) {
      console.error("Save Error:", err);
      alert("Error saving tags!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold text-gray-800">Manage Tags</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* TAG LIST */}
        <div className="mb-5">
          <label className="text-sm font-semibold text-gray-600 mb-2 block">
            Tags
          </label>

          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tagObj, i) => {
              const color = tagObj?.color || {
                bg: "#f3f4f6",
                text: "#374151",
                dot: "#9ca3af",
              };

              return (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  style={{
                    backgroundColor: color.bg,
                    color: color.text,
                  }}
                >
                  {/* Dot */}
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color.dot }}
                  />
                  {tagObj.name || tagObj} {/* ✅ fallback for old data */}
                  <button
                    onClick={() => handleRemoveTag(tagObj.name || tagObj)}
                  >
                    ✕
                  </button>
                </span>
              );
            })}
          </div>

          {/* INPUT */}
          <div className="flex gap-2">
            <input
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
              placeholder="Enter tag..."
              className="flex-1 border px-3 py-2 rounded-lg focus:outline-indigo-500"
            />
            <button
              onClick={handleAddTag}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 rounded-lg"
            >
              Add
            </button>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
          >
            {loading ? "Saving..." : "Save Tags"}
          </button>
        </div>
      </div>
    </div>
  );
}
