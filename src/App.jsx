import NoteContainer from "./Components/NoteContainer/NoteContainer";
import Sidebar from "./Components/Sidebar/Sidebar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Floating Sidebar Button */}
      <Sidebar />

      {/* Main Content */}
      <div className="px-2 md:px-10 py-6">
        <NoteContainer />
      </div>
    </div>
  );
}

export default App;
