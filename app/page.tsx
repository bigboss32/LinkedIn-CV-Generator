'use client';

import { useState } from 'react';
import { generateCV } from './actions/generateCV';
import CVPreview from './components/CVPreview';
import URLInput from './components/URLInput';
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { CVData } from './interface/cv';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const createCv = useMutation(api.cvs.createCv);

  const handleGenerate = async (url: string, content?: string) => {
    setIsLoading(true);
    try {
      const result = await generateCV(url, content);
      setCvData(result);
      await createCv({
        linkedinUrl: url,
        rawContent: result.rawContent,
        htmlContent: result.htmlContent,
        cssContent: result.cssContent,
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 transition-all hover:shadow-blue-500/20">
        
        <h1 className="text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
          LinkedIn CV Generator
        </h1>

        <p className="text-center text-gray-300 mb-10">
          Convierte tu perfil de LinkedIn en un CV elegante y profesional en segundos 🚀
        </p>

        <div className="space-y-8">
          <URLInput onGenerate={handleGenerate} isLoading={isLoading} />

          {isLoading && (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {cvData && (
            <div className="mt-10 animate-fadeIn">
              <CVPreview cvData={cvData} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
