import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  title: string;
  content: string;
}

const BlogCard = ({ id, title, content }: BlogCardProps) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition-all bg-white">
      <h2 className="text-xl font-semibold mb-2 break-words">{title}</h2>

      <Link to={`/posts/${id}`} className="block text-gray-700 hover:underline">
        {content.length > 150 ? content.substring(0, 150) + "..." : content}
      </Link>
    </div>
  );
};

export default BlogCard;
