'use client';

import { useState } from 'react';

interface URLInputProps {
  onGenerate: (url: string, content?: string) => void;
  isLoading: boolean;
}

export default function URLInput({ onGenerate, isLoading }: URLInputProps) {
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [mode, setMode] = useState<'url' | 'content'>('url');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'url' && url) {
      onGenerate(url);
    } else if (mode === 'content' && content) {
      onGenerate('', content);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="mb-4">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setMode('url')}
            className={`px-4 py-2 rounded ${mode === 'url' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            URL de LinkedIn
          </button>
          <button
            onClick={() => setMode('content')}
            className={`px-4 py-2 rounded ${mode === 'content' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Copiar Contenido
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {mode === 'url' ? (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              URL del perfil de LinkedIn
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.linkedin.com/in/usuario"
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Contenido del perfil de LinkedIn
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Pega aquí el contenido de tu perfil de LinkedIn..."
              className="w-full p-3 border rounded-lg h-32"
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Generando CV...' : 'Generar CV'}
        </button>
      </form>
    </div>
  );
}