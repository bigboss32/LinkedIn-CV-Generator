'use server';

import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { fetchLinkedinProfile } from '../services/linkedinService';

export async function generateCV(linkedinUrl: string, content?: string) {
  try {
    let profileContent = content;

    if (linkedinUrl && !content) {
      const match = linkedinUrl.match(/linkedin\.com\/in\/([^/]+)/);
      const profileName = match ? match[1] : linkedinUrl;
      const data = await fetchLinkedinProfile(profileName);
      profileContent = JSON.stringify(data, null, 2);
    }

    const prompt = `
    Analiza el siguiente perfil de LinkedIn y genera un CV profesional:

    ${profileContent}

    Genera dos outputs separados:
    1. HTML: Estructura completa del CV con clases CSS
    2. CSS: Estilos responsive y profesionales

    El CV debe incluir:
    - Información personal
    - Resumen profesional
    - Experiencia laboral
    - Educación
    - Habilidades
    - Diseño responsive y moderno
    `;

    const { text } = await generateText({
      model: google('gemini-2.0-flash'),
      prompt,
    });

    const htmlMatch = text.match(/```html([\s\S]*?)```/);
    const cssMatch = text.match(/```css([\s\S]*?)```/);

    const htmlContent = htmlMatch ? htmlMatch[1].trim() : '';
    const cssContent = cssMatch ? cssMatch[1].trim() : '';

    return {
      htmlContent,
      cssContent,
      rawContent: profileContent || '',
    };
  } catch (error) {
    console.error('Error generating CV:', error);
    throw new Error('Failed to generate CV');
  }
}
