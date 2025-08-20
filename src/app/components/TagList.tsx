export default function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-neutral-800 text-neutral-300 text-sm rounded-full border border-neutral-700"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}