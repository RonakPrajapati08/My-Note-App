import NoteCard from "../NoteCard/NoteCard";
import {SkeletonCard, EmptyState} from "../UI/AppLoader";

export default function NoteGrid({
  notes, loading, viewMode, dark,
  hasMore, remaining, onLoadMore,
  onEdit, onDelete, onFavorite, onArchive,
  onAdd,
}) {
  const gridClass = viewMode === "grid"
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    : "grid grid-cols-1 max-w-3xl gap-4";

  if (loading) {
    return (
      <div className={gridClass}>
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} dark={dark} />
        ))}
      </div>
    );
  }

  if (notes.length === 0) {
    return <EmptyState onAdd={onAdd} />;
  }

  return (
    <>
      <div className={gridClass}>
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            onEdit={onEdit}
            onFavorite={onFavorite}
            onArchive={onArchive}
            listView={viewMode === "list"}
            dark={dark}
          />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            className={`px-6 py-2.5 text-sm font-semibold rounded-xl border transition-all hover:scale-[1.02]
              ${dark
                ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                : "border-gray-200 text-gray-600 hover:bg-white hover:shadow-sm"}`}
          >
            Load more ({remaining} remaining)
          </button>
        </div>
      )}
    </>
  );
}