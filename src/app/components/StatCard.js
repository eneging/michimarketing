"use client";

export default function StatCard({ title, value, icon, description }) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 transition-colors hover:bg-neutral-800/50">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-neutral-400">{title}</h3>
        {icon}
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-white">{value}</p>
        {description && <p className="mt-1 text-sm text-neutral-500">{description}</p>}
      </div>
    </div>
  );
}