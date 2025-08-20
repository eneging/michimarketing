interface Comment {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export default function CommentsList({ comments }: { comments: Comment[] }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-3 text-neutral-200">Reviews</h2>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="p-4 bg-neutral-900 rounded-xl border border-neutral-800"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-neutral-200">{comment.user}</h3>
              <span className="text-sm text-neutral-500">{comment.date}</span>
            </div>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < comment.rating ? 'text-yellow-400' : 'text-neutral-600'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-neutral-400">{comment.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}