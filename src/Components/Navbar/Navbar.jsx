export default function Navbar({
  search, onSearch,
  viewMode, onViewMode,
  sortBy, onSort,
  onAdd, dark, onDark,
  sidebarCollapsed,
  onMobileMenu,
  user,
    onOpenTagForm,
}) {
  const base = dark
    ? "bg-gray-900/95 border-gray-800"
    : "bg-white/95 border-gray-100";

  const inputBase = dark
    ? "bg-gray-800 border-gray-700 text-gray-300"
    : "bg-gray-50 border-gray-200 text-gray-700";

  const btnBase = dark
    ? "bg-gray-800 border-gray-700 text-gray-300"
    : "bg-gray-50 border-gray-200 text-gray-600";

  const iconBtn = dark
    ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
    : "bg-gray-100 text-gray-600 hover:bg-gray-200";

  return (
    <>
      <header
        className={`fixed top-0 right-0 h-16 z-30 flex items-center gap-2 px-3 md:px-4 border-b backdrop-blur-md transition-all duration-300 ${base}`}
        style={{ left: sidebarCollapsed ? "68px" : "240px" }}
      >
        {/* Mobile menu */}
        {/* <button
          className={`md:hidden p-2 rounded-lg ${iconBtn}`}
          onClick={onMobileMenu}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button> */}

        {/* Search */}
        <div className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-xl border text-sm ${inputBase}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 shrink-0">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
          </svg>

          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1 bg-transparent outline-none text-sm min-w-0"
          />

          {search && (
            <button onClick={() => onSearch("")} className="text-gray-400 hover:text-gray-600">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => onSort(e.target.value)}
            className={`text-xs font-semibold px-3 py-2 rounded-xl border outline-none cursor-pointer ${btnBase}`}
          >
            <option value="date-desc">Newest</option>
            <option value="date-asc">Oldest</option>
            <option value="title">Title A–Z</option>
          </select>

          {/* View toggle */}
          <div className={`flex rounded-xl border p-1 ${dark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"}`}>
            {["grid", "list"].map((v) => (
              <button
                key={v}
                onClick={() => onViewMode(v)}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === v
                    ? `shadow-sm text-indigo-600 ${dark ? "bg-gray-700" : "bg-white"}`
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {v === "grid" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-1 md:gap-2">
           {/* Dark Mode Toggle */}
      <button
        onClick={onDark}
        className={`p-2 rounded-xl transition-all ${iconBtn} ${dark ? "text-amber-400" : ""}`}
        title={dark ? "Light mode" : "Dark mode"}
      >
        {dark ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {/* Notification Bell */}
      <button
        className={`p-2 rounded-xl transition-all relative ${iconBtn}`}
        title="Notifications"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
      </button>

          {/* Avatar */}
          {/* <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white text-xs font-black">
            {user?.email?.[0]?.toUpperCase() || "U"}
          </div> */}
        </div>

        {/* ✅ New Note Button */}
        <div className="hidden lg:flex items-center gap-2">
        <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4v16m8-8H4" />
        </svg>
        <span className="hidden sm:inline">New Note</span>
      </button>
      {/* 🔥 Manage Tags Button */}
<button
  onClick={onOpenTagForm}
  className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold rounded-xl transition-all"
>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <path d="M20 12V6a2 2 0 00-2-2h-6M4 12v6a2 2 0 002 2h6M4 4l16 16" />
  </svg>
  <span className="hidden sm:inline">Manage Tags</span>
</button>

</div>
      
      </header>

      {/* ✅ Floating Button Mobile */}
      <button
        onClick={onAdd}
        className="fixed bottom-6 right-6 md:hidden z-10
        w-14 h-14 rounded-full bg-indigo-600 text-white 
        shadow-xl flex items-center justify-center"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </>
  );
}