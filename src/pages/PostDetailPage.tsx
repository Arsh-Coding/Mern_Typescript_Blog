import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string | { _id: string; username: string }; // depending on population
}

function PostDetailPage() {
  const { user } = useAuth();

  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const token = localStorage.getItem("token");
  //   console.log(token);

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch {
      alert("Failed to delete");
    }
  };
  useEffect(() => {
    const fetchPost = async () => {
      const res = await api.get(`/posts/${id}`);
      console.log("Fetched post:", res.data);
      setPost(res.data);
    };
    fetchPost();
  }, [id]);
  //   console.log("new type", typeof post.author._id);

  if (!post) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg text-gray-700 whitespace-pre-line">
        {post.content}
      </p>
      {user?._id === post.author._id && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => navigate(`/posts/edit/${id}`)}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            🗑 Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default PostDetailPage;
