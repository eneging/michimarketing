"use client";

import { Twitter, Facebook, Linkedin, Link } from 'lucide-react'; // Instala lucide-react

export const ShareButtons = ({ url, title }: { url: string; title: string }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("¡Enlace copiado!"); // O usa un toast más elegante
  };

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold text-white mb-3">¡Comparte este artículo!</h3>
      <div className="flex items-center gap-4">
        <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <Twitter size={24} />
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
          <Facebook size={24} />
        </a>
        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
          <Linkedin size={24} />
        </a>
        <button onClick={copyToClipboard} className="text-gray-400 hover:text-emerald-400 transition-colors">
          <Link size={24} />
        </button>
      </div>
    </div>
  );
};