// ─── AppLoader (default export) ───────────────────────────────────────────────
// Used in App.jsx while auth state is being determined
export function AppLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-100">
      <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl flex flex-col items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
          <svg
            width="22" height="22" viewBox="0 0 24 24"
            fill="none" stroke="white" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div
          className="w-10 h-10 border-t-transparent rounded-full animate-spin"
          style={{ border: "3px solid #6366F1", borderTopColor: "transparent" }}
        />
        <div className="text-center">
          <h2 className="text-lg font-black text-gray-800 tracking-tight">Noteflow</h2>
          <p className="text-sm text-gray-500 mt-1">Loading your notes...</p>
        </div>
      </div>
    </div>
  );
}

// ─── SkeletonCard (named export) ──────────────────────────────────────────────
// Shows animated placeholder cards while Firestore data loads
export function SkeletonCard({ dark }) {
  const bg = dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100";
  const line = dark ? "bg-gray-700" : "bg-gray-200";

  return (
    <div className={`${bg} border rounded-2xl p-5 animate-pulse`}>
      <div className={`h-4 ${line} rounded-full w-3/4 mb-3`} />
      <div className={`h-3 ${line} rounded-full w-full mb-2`} />
      <div className={`h-3 ${line} rounded-full w-5/6 mb-5`} />
      <div className="flex gap-2">
        <div className={`h-5 w-14 ${line} rounded-full`} />
        <div className={`h-5 w-14 ${line} rounded-full`} />
      </div>
    </div>
  );
}

// ─── EmptyState (named export) ────────────────────────────────────────────────
// Shows when notes array is empty after loading completes
export function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center mb-6 shadow-inner">
        <svg
          width="36" height="36" viewBox="0 0 24 24"
          fill="none" stroke="#6366F1" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">No notes here yet</h3>
      <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-8">
        Capture ideas, tasks, and everything in between. Your notes live here.
      </p>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        <svg
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M12 4v16m8-8H4" />
        </svg>
        Create your first note
      </button>
    </div>
  );
}

// Default export for convenience (App.jsx uses this)
export default AppLoader;