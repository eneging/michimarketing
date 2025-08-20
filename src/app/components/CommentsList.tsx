// components/CommentsList.tsx
interface Comment {
  user: string;
  rating: number;
  comment: string;
  date: string; // Ahora date es requerido
}

interface CommentsListProps {
  comments: Comment[];
}

export default function CommentsList({ comments }: CommentsListProps) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-3 text-neutral-200">Reviews</h2>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-neutral-200">{comment.user}</h4>
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="text-neutral-400">{comment.rating}</span>
              </div>
            </div>
            <p className="text-neutral-400 mb-2">{comment.comment}</p>
            <small className="text-neutral-500 text-sm">{comment.date}</small>
          </div>
        ))}
      </div>
    </section>
  );
}