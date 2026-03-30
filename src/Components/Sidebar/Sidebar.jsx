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

// import React from "react";
// import { PlusIcon } from "@heroicons/react/24/outline"; // Using outline for a more modern, lightweight look

// function Sidebar({ addNote }) {
//   const generateSoftColor = () => {
//     const hue = Math.floor(Math.random() * 360);
//     return `hsl(${hue}, 70%, 90%)`;
//   };

//   const handleCreateNote = () => {
//     const randomColor = generateSoftColor();
//     addNote(randomColor);
//   };

//   // Shared button styles to keep code DRY and maintainable
//   const buttonStyles = `
//     group relative flex h-14 w-14 items-center justify-center rounded-full
//     bg-gradient-to-tr from-indigo-600 to-violet-500
//     text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]
//     transition-all duration-300 ease-out
//     hover:-translate-y-0.5 hover:scale-105
//     hover:shadow-[0_20px_40px_rgba(79,70,229,0.3)]
//     active:scale-90 active:duration-75
//     focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
//   `;

//   // Shared Tooltip component style
//   const Tooltip = ({ position }) => (
//     <span
//       className={`
//       pointer-events-none absolute ${position} flex items-center
//       opacity-0 transition-all duration-200 group-hover:opacity-100
//     `}
//     >
//       <span className="whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-xl">
//         Create Note
//       </span>
//     </span>
//   );

//   return (
//     <>
//       {/* Desktop View: Top-Left Positioning */}
//       <div className="fixed left-8 top-8 z-50 hidden md:block">
//         <button
//           onClick={handleCreateNote}
//           className={buttonStyles}
//           aria-label="Create new note"
//         >
//           <PlusIcon className="h-7 w-7 transition-transform duration-300 group-hover:rotate-90" />

//           {/* Tooltip - positioned to the right on desktop */}
//           <Tooltip position="left-full ml-3" />
//         </button>
//       </div>

//       {/* Mobile View: Bottom-Right Positioning */}
//       <div className="fixed bottom-8 right-8 z-50 md:hidden">
//         <button
//           onClick={handleCreateNote}
//           className={buttonStyles}
//           aria-label="Create new note"
//         >
//           <PlusIcon className="h-7 w-7 transition-transform duration-300 group-hover:rotate-90" />

//           {/* Tooltip - positioned to the left on mobile */}
//           <Tooltip position="right-full mr-3" />
//         </button>
//       </div>
//     </>
//   );
// }

// export default Sidebar;

// import { useState } from "react";

// const ALL_TAGS = ["work", "design", "personal", "dev"];

// const TAG_COLORS = {
//   work:     { dot: "#6366F1" },
//   design:   { dot: "#9333EA" },
//   personal: { dot: "#16A34A" },
//   dev:      { dot: "#EA580C" },
// };

// const NAV = [
//   {
//     id: "all",
//     label: "All Notes",
//     icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
//   },
//   {
//     id: "favorites",
//     label: "Favorites",
//     icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
//     filled: true,
//   },
//   {
//     id: "archived",
//     label: "Archived",
//     icon: "M5 4a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 20V4z",
//   },
// ];

// function SvgIcon({ d, size = 18, filled = false, className = "" }) {
//   return (
//     <svg
//       width={size} height={size} viewBox="0 0 24 24"
//       fill={filled ? "currentColor" : "none"}
//       stroke="currentColor" strokeWidth="1.8"
//       strokeLinecap="round" strokeLinejoin="round"
//       className={className}
//     >
//       <path d={d} />
//     </svg>
//   );
// }

// export default function Sidebar({
//   section, onSection,
//   collapsed, onToggle,
//   activeTag, onTag,
//   dark, user, onLogout,
// }) {
//   const [loggingOut, setLoggingOut] = useState(false);

//   const handleLogout = async () => {
//     setLoggingOut(true);
//     await onLogout();
//   };

//   const base = dark
//     ? "bg-gray-900 border-gray-800 text-white"
//     : "bg-white border-gray-100 text-gray-900";

//   const activeClass = dark
//     ? "bg-indigo-900/40 text-indigo-400"
//     : "bg-indigo-50 text-indigo-600";

//   const inactiveClass = dark
//     ? "text-gray-400 hover:bg-gray-800"
//     : "text-gray-600 hover:bg-gray-100";

//   return (
//     <aside
//       className={`fixed left-0 top-0 h-full z-40 flex flex-col border-r transition-all duration-300 ease-in-out ${base} ${collapsed ? "w-[68px]" : "w-60"}`}
//     >
//       {/* Logo */}
//       <div className={`flex items-center h-16 px-4 border-b shrink-0 ${dark ? "border-gray-800" : "border-gray-100"}`}>
//         <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shrink-0">
//           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//           </svg>
//         </div>
//         {!collapsed && (
//           <span className="ml-3 font-black text-lg tracking-tight">
//             Noteflow
//           </span>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-2 py-4 overflow-y-auto">
//         {NAV.map((item) => {
//           const isActive = section === item.id;
//           return (
//             <button
//               key={item.id}
//               onClick={() => onSection(item.id)}
//               title={collapsed ? item.label : undefined}
//               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-semibold transition-all
//                 ${isActive ? activeClass : inactiveClass}`}
//             >
//               <SvgIcon
//                 d={item.icon}
//                 filled={item.filled && isActive}
//                 className="shrink-0"
//               />
//               {!collapsed && <span className="truncate">{item.label}</span>}
//             </button>
//           );
//         })}

//         {/* Tags Section */}
//         {!collapsed && (
//           <>
//             <div className="mt-6 mb-2 px-3">
//               <p className={`text-[10px] font-black uppercase tracking-widest ${dark ? "text-gray-600" : "text-gray-400"}`}>
//                 Tags
//               </p>
//             </div>
//             {ALL_TAGS.map((tag) => (
//               <button
//                 key={tag}
//                 onClick={() => onTag(activeTag === tag ? null : tag)}
//                 className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl mb-1 text-sm font-semibold transition-all
//                   ${activeTag === tag
//                     ? dark ? "bg-gray-800" : "bg-gray-100"
//                     : dark ? "hover:bg-gray-800/50" : "hover:bg-gray-50"}`}
//               >
//                 <span
//                   className="w-2.5 h-2.5 rounded-full shrink-0"
//                   style={{ backgroundColor: TAG_COLORS[tag]?.dot }}
//                 />
//                 <span className={`truncate ${dark ? "text-gray-300" : "text-gray-700"}`}>
//                   {tag}
//                 </span>
//               </button>
//             ))}
//           </>
//         )}
//       </nav>

//       {/* User + Logout */}
//       {!collapsed && (
//         <div className={`px-3 py-4 border-t ${dark ? "border-gray-800" : "border-gray-100"}`}>
//           <div className="flex items-center gap-3 mb-3 px-1">
//             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-black shrink-0">
//               {user?.email?.[0]?.toUpperCase() || "U"}
//             </div>
//             <div className="min-w-0">
//               <p className={`text-xs font-bold truncate ${dark ? "text-white" : "text-gray-800"}`}>
//                 {user?.displayName || "My Account"}
//               </p>
//               <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
//             </div>
//           </div>
//           <button
//             onClick={handleLogout}
//             disabled={loggingOut}
//             className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
//           >
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//             {loggingOut ? "Signing out..." : "Sign out"}
//           </button>
//         </div>
//       )}

//       {/* Collapse Toggle */}
//       <button
//         onClick={onToggle}
//         title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//         className={`mx-3 mb-3 flex items-center justify-center h-9 rounded-xl transition-all
//           ${dark ? "text-gray-500 hover:bg-gray-800 hover:text-gray-300" : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"}`}
//       >
//         <svg
//           width="18" height="18" viewBox="0 0 24 24" fill="none"
//           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
//           className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
//         >
//           <path d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>
//     </aside>
//   );
// }

import { useState } from "react";

// ❌ REMOVE STATIC
// const ALL_TAGS = [...]
// const TAG_COLORS = {...}

const NAV = [
  {
    id: "all",
    label: "All Notes",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    id: "favorites",
    label: "Favorites",
    icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
    filled: true,
  },
  {
    id: "archived",
    label: "Archived",
    icon: "M5 4a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 20V4z",
  },
];

function SvgIcon({ d, size = 18, filled = false, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={d} />
    </svg>
  );
}

export default function Sidebar({
  section,
  onSection,
  collapsed,
  onToggle,
  activeTag,
  onTag,
  dark,
  user,
  onLogout,

  // 🔥 NEW dynamic props
  ALL_TAGS = [],
  TAG_COLORS = {},
}) {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await onLogout();
  };

  const base = dark
    ? "bg-gray-900 border-gray-800 text-white"
    : "bg-white border-gray-100 text-gray-900";

  const activeClass = dark
    ? "bg-indigo-900/40 text-indigo-400"
    : "bg-indigo-50 text-indigo-600";

  const inactiveClass = dark
    ? "text-gray-400 hover:bg-gray-800"
    : "text-gray-600 hover:bg-gray-100";

  return (
    <aside
      className={`fixed left-0 top-0 h-full z-40 flex flex-col border-r transition-all duration-300 ${base} ${collapsed ? "w-[68px]" : "w-60"}`}
    >
      {/* Logo */}
      <div
        className={`flex items-center h-16 px-4 border-b ${dark ? "border-gray-800" : "border-gray-100"}`}
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          >
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586l6 6V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        {!collapsed && (
          <span className="ml-3 font-black text-lg">Noteflow</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        {NAV.map((item) => {
          const isActive = section === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-semibold
                ${isActive ? activeClass : inactiveClass}`}
            >
              <SvgIcon d={item.icon} filled={item.filled && isActive} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}

        {/* 🔥 TAGS (Dynamic) */}
        {!collapsed && ALL_TAGS.length > 0 && (
          <>
            <div className="mt-6 mb-2 px-3">
              <p
                className={`text-[10px] font-semibold tracking-wide uppercase ${dark ? "text-gray-500" : "text-gray-400"}`}
              >
                Tags
              </p>
            </div>

            {ALL_TAGS.map((tag) => {
              const isActive = activeTag === tag;

              return (
                <button
                  key={tag}
                  onClick={() => onTag(isActive ? null : tag)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg mb-1 transition-all duration-200 group
        ${
          isActive
            ? dark
              ? "bg-indigo-500/10 text-indigo-400"
              : "bg-indigo-50 text-indigo-600"
            : dark
              ? "hover:bg-gray-800/60 text-gray-400"
              : "hover:bg-gray-50 text-gray-600"
        }`}
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-2">
                    {/* Dot */}
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive
                          ? "bg-indigo-500"
                          : dark
                            ? "bg-gray-600 group-hover:bg-indigo-400"
                            : "bg-gray-400 group-hover:bg-indigo-500"
                      }`}
                    />

                    {/* Tag Name */}
                    <span className="text-sm font-medium">
                      {tag}
                    </span>
                  </div>

                  {/* RIGHT HOVER ICON */}
                  <span
                    className={`text-[10px] opacity-0 group-hover:opacity-100 transition ${
                      isActive ? "text-indigo-500" : "text-gray-400"
                    }`}
                  >
                    #
                  </span>
                </button>
              );
            })}
          </>
        )}
      </nav>

      {/* User + Logout */}
      {!collapsed && (
        <div
          className={`px-3 py-4 border-t ${dark ? "border-gray-800" : "border-gray-100"}`}
        >
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-black shrink-0">
              {user?.email?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p
                className={`text-xs font-bold truncate ${dark ? "text-white" : "text-gray-800"}`}
              >
                {user?.displayName || "My Account"}
              </p>
              <p className="text-[10px] text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {loggingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      )}

      {/* Toggle */}
      <button onClick={onToggle} className="mx-3 mb-3 h-9">
        Toggle
      </button>
    </aside>
  );
}
