//Old code drop colors and choose one

// import React, { useState, useEffect, useRef } from "react";
// import "./Sidebar.css";

// function Sidebar(props) {
//   const colors = [
//     "#D8E1E8",
//     "#a9ffe4d9",
//     "#f5f2ffcc",
//     "#fde8e8e6",
//     "#cfffd5cc",
//   ];

//   const [listOpen, setListOpen] = useState(false);

//   const dropdownRef = useRef(null);

//   // Close the dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setListOpen(false); // Close dropdown if click is outside
//       }
//     };

//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="sidebar" ref={dropdownRef}>
//       <div
//         className="text-center bg-black text-white rounded-circle"
//         style={{
//           width: "40px",
//           height: "40px",
//           lineHeight: "40px",
//           cursor: "pointer",
//         }}
//         onClick={() => setListOpen(!listOpen)}
//       >
//         <i
//           className={`fa-solid fa-plus plus-icon   ${
//             listOpen ? "rotated" : ""
//           }`}
//         ></i>
//       </div>
//       <ul
//         className={`sidebar-list d-flex flex-column gap-2 align-items-center bg-dark rounded-4 justify-content-evenly ps-0 mt-2 ${
//           listOpen ? "side-list-active" : ""
//         }`}
//       >
//         {colors.map((item, index) => {
//           return (
//             <li
//               key={index}
//               className="sidebar-list-item  rounded-circle list-unstyled"
//               onClick={() => props.addNote(item)}
//               style={{ backgroundColor: item }}
//             ></li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;

//New code create note and render colors take one

import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

function Sidebar({ addNote }) {
  const generateSoftColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 90%)`;
  };

  const handleCreateNote = () => {
    const randomColor = generateSoftColor();
    addNote(randomColor);
  };

  return (
    <>
      {/* Desktop Left Side Floating */}
      <div className="hidden md:flex fixed top-6 left-6 z-50">
        <button
          onClick={handleCreateNote}
          className="
            w-14 h-14
            rounded-full
            bg-gradient-to-br from-indigo-500 to-purple-600
            text-white
            shadow-xl
            flex items-center justify-center
            transition-all duration-300
            hover:scale-110 hover:shadow-2xl
            active:scale-95
          "
        >
          <PlusIcon className="w-6 h-6 md:w-7 md:h-7" />
        </button>
      </div>

      {/* Mobile Bottom Right Floating */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={handleCreateNote}
          className="
            w-14 h-14
            rounded-full
            bg-gradient-to-br from-indigo-500 to-purple-600
            text-white
            shadow-xl
            flex items-center justify-center
            transition-all duration-300
            hover:scale-110 hover:shadow-2xl
            active:scale-95
          "
        >
          <PlusIcon className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      </div>
    </>
  );
}

export default Sidebar;
