"use client";

export const ScrollToTop = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button onClick={handleClick} className="text-gray-400 hover:text-emerald-400 transition-colors">
      Volver arriba ↑
    </button>
  );
};