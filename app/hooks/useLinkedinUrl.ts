import { useState } from "react";
import { validateLinkedinUrl } from "../utils/validateUrl";

export function useLinkedinUrl() {
  const [error, setError] = useState<string | null>(null);

  const validate = (url: string): boolean => {
    if (!url.trim()) {
      setError("Por favor ingresa un enlace de LinkedIn.");
      return false;
    }
    if (!validateLinkedinUrl(url)) {
      setError("Debe ser una URL válida de LinkedIn.");
      return false;
    }
    setError(null);
    return true;
  };

  return { error, validate, setError };
}
