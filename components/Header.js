import { FaPlus } from 'react-icons/fa';

export default function Header({ setShowModal }) {
  return (
    <header className="sticky top-0 z-10 bg-black border-b border-red-600 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-bold font-orbitron text-red-600">SEW WALL</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition"
          aria-label="Create post"
        >
          <FaPlus className="text-white text-xl" />
        </button>
      </div>
    </header>
  );
}
