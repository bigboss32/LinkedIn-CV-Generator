'use client';

import { useState } from 'react';
import { generateCV } from './actions/generateCV';
import CVPreview from './components/CVPreview';
import URLInput from './components/URLInput';

// 👇 importar convex
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [cvData, setCvData] = useState<any>(null);

  // 👇 hook para guardar en Convex
  const createCv = useMutation(api.cvs.createCv);

  const handleGenerate = async (url: string, content?: string) => {
    setIsLoading(true);
    try {
      const result = await generateCV(url, content);
      setCvData(result);

      // 👇 guardar en convex
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
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">LinkedIn CV Generator</h1>
      <URLInput onGenerate={handleGenerate} isLoading={isLoading} />
      {cvData && <CVPreview cvData={cvData} />}
    </main>
  );
}
