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
  isMobile,
  mobileOpen,
  onAddNote,
  onOpenTagForm,

  // 🔥 NEW dynamic props
  ALL_TAGS = [],
  TAG_COLORS = {},
}) {
  const [loggingOut, setLoggingOut] = useState(false);

  const isExpanded = isMobile ? mobileOpen : !collapsed;

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
    <>
      <aside
        className={`
    fixed top-0 left-0 h-full z-40 flex flex-col border-r
    transition-all duration-300 ${base}

    ${
      isMobile
        ? mobileOpen
          ? "w-60 translate-x-0 shadow-2xl"
          : "w-[68px] translate-x-0"
        : collapsed
          ? "w-[68px]"
          : "w-60"
    }
  `}
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
          {isExpanded && (
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
                {/* {!collapsed && <span>{item.label}</span>} */}
                {isExpanded && <span>{item.label}</span>}
              </button>
            );
          })}

          {/* 🔥 TAGS (Dynamic) */}
          {isExpanded && ALL_TAGS.length > 0 && (
            <>
              <div className="mt-6 mb-2 px-3">
                <p
                  className={`text-[12px] font-semibold tracking-wider uppercase ${
                    dark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Tags
                </p>
              </div>

              {ALL_TAGS.map((tagObj) => {
                // 🔥 HANDLE BOTH OLD + NEW FORMAT
                const isString = typeof tagObj === "string";

                const name = isString ? tagObj : tagObj.name;

                const color = isString
                  ? {
                      bg: "#f3f4f6",
                      text: "#374151",
                      dot: "#9ca3af",
                    }
                  : tagObj.color;

                const isActive = activeTag === name;

                return (
                  <button
                    key={name} // ✅ FIXED (no duplicate key)
                    onClick={() => onTag(isActive ? null : name)}
                    className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1
        transition-all duration-200
        ${isActive ? "shadow-sm" : "hover:translate-x-[2px]"}
      `}
                    style={{
                      backgroundColor: isActive ? color.bg : "transparent",
                    }}
                  >
                    {/* 🔵 Dot */}
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: color?.dot }}
                    />

                    {/* 🏷 Name */}
                    <span
                      className="text-sm font-medium truncate"
                      style={{
                        color: isActive
                          ? color?.text
                          : dark
                            ? "#9CA3AF"
                            : "#4B5563",
                      }}
                    >
                      {name} {/* ✅ FIXED (no object render) */}
                    </span>
                  </button>
                );
              })}
            </>
          )}
        </nav>
        {/* 🔥 ACTION ICONS (Mini Sidebar) */}
        {!isExpanded && isMobile && (
          <div className="my-4 flex flex-col items-center gap-3">
            {/* ➕ Add Note */}
            <button
              onClick={onAddNote}
              className="w-10 h-10 flex items-center justify-center rounded-xl
      bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-all"
            >
              +
            </button>

            {/* 🏷 Manage Tags */}
            <button
              onClick={onOpenTagForm}
              className="w-10 h-10 flex items-center justify-center rounded-xl
      bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
            >
              #
            </button>
          </div>
        )}

        {/* //when i click on toggle show full button */}
        {isExpanded && isMobile && (
          <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/50 space-y-2.5">
            {/* ➕ New Note Button */}
            <button
              onClick={onAddNote}
              className="group w-full flex items-center justify-center gap-2 px-3 py-2.5 
                 bg-indigo-600 hover:bg-indigo-500 
                 text-white text-sm font-medium rounded-xl
                 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_12px_rgba(79,70,229,0.3)]
                 transition-all duration-300 ease-out
                 active:scale-[0.98]"
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
                className="group-hover:rotate-90 transition-transform duration-300"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              New Note
            </button>

            {/* 🏷 Manage Tags Button */}
            <button
              onClick={onOpenTagForm}
              className="group w-full flex items-center justify-center gap-2 px-3 py-2 
                 bg-transparent text-slate-600 dark:text-slate-400
                 hover:bg-slate-200/50 dark:hover:bg-slate-800/60 
                 hover:text-slate-900 dark:hover:text-slate-200
                 text-sm font-medium rounded-lg
                 transition-all duration-300 ease-in-out"
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
                className="opacity-70 group-hover:opacity-100 transition-opacity"
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
              Manage Tags
            </button>
          </div>
        )}

        {/* User + Logout */}
        {isExpanded && (
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
        <button
          onClick={() => {
            onToggle();
          }}
          className="
    group relative w-full flex items-center justify-center py-3
    /* Base Glass State */
    bg-slate-400/5 dark:bg-white/5
    backdrop-blur-sm
    text-slate-500 dark:text-slate-400
    rounded-xl border border-slate-200/50 dark:border-white/10
    
    /* Smooth Transition Config */
    transition-all duration-500 ease-out
    
    /* Hover - Soft Color Infill */
    hover:bg-indigo-50 dark:hover:bg-indigo-500/10
    hover:border-indigo-200 dark:hover:border-indigo-500/30
    hover:text-indigo-600 dark:hover:text-indigo-300
    
    /* Subtle Glow Effect */
    hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]
    
    /* Interaction */
    active:scale-95
  "
        >
          {/* The Icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-500 group-hover:-translate-x-0.5"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>

          {/* Optional: A tiny dot that appears on hover for extra "Smoothness" */}
          <span className="absolute right-2 w-1 h-1 rounded-full bg-indigo-500 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
        </button>
      </aside>
    </>
  );
}
