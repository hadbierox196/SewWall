import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, serverTimestamp } from '../lib/firebase';

export default function TextForm({ setShowModal }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "posts"), {
      type: 'text',
      title,
      content,
      createdAt: serverTimestamp(),
      replies: []
    });
    setShowModal(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold text-red-600">Create Text Post</h3>
      <div>
        <label className="block mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:border-red-600 focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-32 bg-gray-900 border border-gray-700 rounded p-2 focus:border-red-600 focus:outline-none"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition"
      >
        Post
      </button>
    </form>
  );
}
