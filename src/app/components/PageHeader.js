"use client";

export default function PageHeader({ title, subtitle }) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
      {subtitle && <p className="mt-2 text-neutral-400">{subtitle}</p>}
    </div>
  );
}