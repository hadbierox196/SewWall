import { useState } from 'react';
import TextForm from './TextForm';
import PollForm from './PollForm';

export default function CreatePostModal({ setShowModal }) {
  const [postType, setPostType] = useState(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-black border-2 border-red-600 rounded-lg w-full max-w-md p-6">
        {postType ? (
          <>
            {postType === 'text' ? (
              <TextForm setShowModal={setShowModal} />
            ) : (
              <PollForm setShowModal={setShowModal} />
            )}
            <button 
              onClick={() => setPostType(null)}
              className="mt-4 text-red-600 hover:text-red-500"
            >
              ← Back
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-orbitron mb-6 text-red-600">CREATE POST</h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setPostType('text')}
                className="bg-red-600 hover:bg-red-700 py-3 px-6 rounded-lg text-lg font-semibold transition"
              >
                Text Post
              </button>
              <button
                onClick={() => setPostType('poll')}
                className="bg-red-600 hover:bg-red-700 py-3 px-6 rounded-lg text-lg font-semibold transition"
              >
                Poll
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
