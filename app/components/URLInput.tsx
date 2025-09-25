import { useState } from "react";

interface URLInputProps {
  onGenerate: (url: string, content?: string) => void;
  isLoading: boolean;
}

export default function URLInput({ onGenerate, isLoading }: URLInputProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    onGenerate(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="url"
        placeholder="https://www.linkedin.com/in/usuario"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg hover:shadow-blue-500/30"
      >
        {isLoading ? "Generando..." : "✨ Generar CV"}
      </button>
    </form>
  );
}
