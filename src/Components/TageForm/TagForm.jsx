import { useState } from "react";

const DEFAULT_COLORS = [
  { name: "Lavender", value: "#E6E6FA" },
  { name: "Mint", value: "#98FF98" },
  { name: "Peach", value: "#FFDAB9" },
  { name: "Lilac", value: "#C8A2C8" },
  { name: "Butter", value: "#FFF1A8" },
  { name: "Sky", value: "#87CEEB" },
  { name: "Rose", value: "#FFC0CB" },
  { name: "Teal", value: "#008080" },
];

export default function NoteForm() {
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [colors] = useState(DEFAULT_COLORS);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showColorDropdown, setShowColorDropdown] = useState(false);

  // Add Tag
  const handleAddTag = () => {
    if (inputTag.trim() && !tags.includes(inputTag.trim())) {
      setTags([...tags, inputTag.trim()]);
      setInputTag("");
    }
  };

  // Remove Tag
  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded-xl shadow">
      {/* TAGS */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Tags</label>

        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm flex items-center gap-2"
            >
              {tag}
              <button onClick={() => handleRemoveTag(tag)}>✕</button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            placeholder="Add tag..."
            className="border px-3 py-2 rounded w-full"
          />
          <button
            onClick={handleAddTag}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* CARD COLOR */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Card Color</label>

        <div
          onClick={() => setShowColorDropdown(!showColorDropdown)}
          className="border px-3 py-2 rounded flex justify-between items-center cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded"
              style={{
                background: selectedColor?.value || "#eee",
              }}
            />
            <span>{selectedColor?.name || "Select Color"}</span>
          </div>
          <span>▼</span>
        </div>

        {showColorDropdown && (
          <div className="mt-2 grid grid-cols-2 gap-3 border p-3 rounded bg-white shadow">
            {colors.map((color, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedColor(color);
                  setShowColorDropdown(false);
                }}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                  selectedColor?.name === color.name ? "bg-gray-100" : ""
                }`}
              >
                <div
                  className="w-6 h-6 rounded"
                  style={{ background: color.value }}
                />
                <span>{color.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 mt-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Save
        </button>
        <button className="border px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
}
