import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const postSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});
type PostForm = z.infer<typeof postSchema>;

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostForm>({ resolver: zodResolver(postSchema) });

  useEffect(() => {
    const fetchPost = async () => {
      const res = await api.get(`/posts/${id}`);
      reset(res.data);
      setLoading(false);
    };
    fetchPost();
  }, [id, reset]);

  const onSubmit = async (data: PostForm) => {
    try {
      await api.put(`/posts/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/posts/${id}`);
    } catch {
      alert("Update failed");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto mt-12 p-6 border rounded"
    >
      <h2 className="text-2xl font-bold mb-4">✏️ Edit Post</h2>

      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Title"
        {...register("title")}
      />
      {errors.title && (
        <p className="text-red-600 text-sm">{errors.title.message}</p>
      )}

      <textarea
        className="w-full p-2 border rounded h-40 resize-none"
        placeholder="Content"
        {...register("content")}
      />
      {errors.content && (
        <p className="text-red-600 text-sm">{errors.content.message}</p>
      )}

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Update
      </button>
    </form>
  );
}
