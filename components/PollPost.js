import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function PollPost({ post }) {
  const [voted, setVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleVote = async () => {
    if (selectedOption === null || voted) return;
    
    const newOptions = [...post.options];
    newOptions[selectedOption].votes += 1;
    
    await updateDoc(doc(db, "posts", post.id), {
      options: newOptions
    });
    
    setVoted(true);
  };

  const totalVotes = post.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="bg-gray-900 border border-red-600 rounded-lg p-4">
      <h3 className="text-xl font-semibold text-red-500 mb-4">{post.question}</h3>
      
      <div className="space-y-2">
        {post.options.map((option, index) => (
          <div key={index} className="relative">
            <button
              className={`w-full text-left p-3 rounded-lg border ${
                selectedOption === index
                  ? 'border-red-600 bg-red-900 bg-opacity-20'
                  : 'border-gray-700 hover:border-red-500'
              } transition-all`}
              onClick={() => !voted && setSelectedOption(index)}
              disabled={voted}
            >
              {option.text}
            </button>
            
            {voted && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-sm text-gray-400">
                  {totalVotes > 0
                    ? `${Math.round((option.votes / totalVotes) * 100)}%`
                    : '0%'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {!voted ? (
        <button
          onClick={handleVote}
          disabled={selectedOption === null}
          className={`mt-4 w-full py-2 rounded-lg font-semibold transition ${
            selectedOption !== null
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-gray-800 cursor-not-allowed'
          }`}
        >
          Vote
        </button>
      ) : (
        <div className="mt-4 text-center text-green-500">
          Thanks for voting!
        </div>
      )}
    </div>
  );
}
