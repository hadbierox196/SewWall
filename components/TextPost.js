import { useState } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function TextPost({ post }) {
  const [expanded, setExpanded] = useState(false);
  const [reply, setReply] = useState('');

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    
    await updateDoc(doc(db, "posts", post.id), {
      replies: arrayUnion({
        content: reply,
        createdAt: new Date().toISOString()
      })
    });
    setReply('');
  };

  return (
    <div className="bg-gray-900 border border-red-600 rounded-lg overflow-hidden">
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-xl font-semibold text-red-500">{post.title}</h3>
        <p className="mt-2 text-gray-300">{post.content}</p>
      </div>

      {expanded && (
        <div className="border-t border-gray-800 p-4">
          <h4 className="font-semibold mb-2">Replies:</h4>
          <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-3 pr-2">
            {post.replies?.map((reply, index) => (
              <div key={index} className="bg-gray-800 p-3 rounded-lg">
                <p className="text-gray-300">{reply.content}</p>
              </div>
            ))}

            {(!post.replies || post.replies.length === 0) && (
              <p className="text-gray-500 text-center py-4">No replies yet</p>
            )}
          </div>

          <form onSubmit={handleReplySubmit} className="mt-4 flex gap-2">
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded p-2 focus:border-red-600 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
            >
              Reply
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
