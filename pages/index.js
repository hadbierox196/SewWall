import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Header from '../components/Header';
import CreatePostModal from '../components/CreatePostModal';
import TextPost from '../components/TextPost';
import PollPost from '../components/PollPost';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header setShowModal={setShowModal} />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="grid gap-6">
          {posts.map(post => post.type === 'text' ? (
            <TextPost key={post.id} post={post} />
          ) : (
            <PollPost key={post.id} post={post} />
          ))}
        </div>
      </main>

      {showModal && <CreatePostModal setShowModal={setShowModal} />}
    </div>
  );
      }
