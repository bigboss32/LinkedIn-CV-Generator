'use client';

import CVPreview from "./components/CVPreview";
import URLInput from "./components/URLInput";
import LoadingSpinner from "./components/LoadingSpinner";
import { useGenerateCV } from "./hooks/useGenerateCV";

export default function Home() {
  const { isLoading, cvData, handleGenerate } = useGenerateCV();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 transition-all hover:shadow-blue-500/20">
        
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
            LinkedIn CV Generator
          </h1>
          <p className="text-gray-300">
            Convierte tu perfil de LinkedIn en un CV elegante y profesional en segundos 🚀
          </p>
        </header>

        {/* Input & Loading */}
        <section className="space-y-8">
          <URLInput onGenerate={handleGenerate} isLoading={isLoading} />
          {isLoading && <LoadingSpinner />}
        </section>

        {/* Preview */}
        {cvData && (
          <section className="mt-10 animate-fadeIn">
            <CVPreview cvData={cvData} />
          </section>
        )}
      </div>
    </main>
  );
}
