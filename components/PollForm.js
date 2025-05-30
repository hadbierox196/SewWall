import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, serverTimestamp } from '../lib/firebase';

export default function PollForm({ setShowModal }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [votes, setVotes] = useState({});

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "posts"), {
      type: 'poll',
      question,
      options: options.map(opt => ({ text: opt, votes: 0 })),
      createdAt: serverTimestamp()
    });
    setShowModal(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold text-red-600">Create Poll</h3>
      <div>
        <label className="block mb-1">Question</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:border-red-600 focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Options</label>
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="w-full mb-2 bg-gray-900 border border-gray-700 rounded p-2 focus:border-red-600 focus:outline-none"
            required
            placeholder={`Option ${index + 1}`}
          />
        ))}
        <button
          type="button"
          onClick={addOption}
          className="text-sm text-red-600 hover:text-red-500 flex items-center"
        >
          + Add Option
        </button>
      </div>
      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition"
      >
        Create Poll
      </button>
    </form>
  );
}
