import { useEffect, useState } from "react";
import api from "../services/api";
import BlogCard from "../components/BlogCard";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    username: string;
  };
}

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error loading posts");
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📰 Latest Posts</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <BlogCard
            key={post._id}
            id={post._id}
            title={post.title}
            content={post.content}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
