import { useState } from "react";
import { generateCV } from "@/app/actions/generateCV";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CVData } from "@/app/interface/cv";

export function useGenerateCV() {
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
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, cvData, handleGenerate };
}
