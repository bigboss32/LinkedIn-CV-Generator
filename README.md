# 📄 LinkedIn CV Generator

Generador de CVs a partir de un perfil de LinkedIn utilizando **Next.js**, **Convex** como base de datos en tiempo real, e integración con **IA** para procesar la información y exportar un PDF.

## ✨ Características

- 🌐 **Next.js 15** con renderizado rápido y soporte para Turbopack.  
- ☁️ **Convex** como backend serverless y base de datos reactiva.  
- 🤖 Integración con **Google Generative AI** para procesar y limpiar la información.  
- 🔑 Integración con **Magical API** para obtener datos estructurados de perfiles.  
- 📄 Exportación del CV a **PDF** con `@react-pdf/renderer`.  

El flujo principal es:  
1. Ingresar la **URL de un perfil de LinkedIn**.  
2. Extraer y procesar los datos con la API de Magical y Google Generative AI.  
3. Guardar y manejar la información con **Convex**.  
4. Generar un **CV en PDF** descargable.  

---

## ⚙️ Requisitos previos

- **Node.js** v18 o superior  
- **npm** o **yarn**  
- Cuenta en [Convex](https://www.convex.dev/)  
- Claves de API de:
  - [Google Generative AI](https://ai.google.dev/)  
  - [Magical API](https://www.magicalapi.com/)  

---

## 🚀 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/mig-garzon/linkedin-cv-generator.git
cd linkedin-cv-generator

Instalar dependencias:

npm install
# o
yarn install

Configurar variables de entorno en .env.local:

CONVEX_DEPLOYMENT=""
NEXT_PUBLIC_CONVEX_URL= ""
GOOGLE_GENERATIVE_AI_API_KEY=""
MAGICAL_API_KEY= ""


app/                # Páginas y componentes de Next.js
 ├─ actions/        # Lógica de generación de CV
 ├─ components/     # UI components
 ├─ services/       # Integración con APIs externas (LinkedIn, Magical, Google AI)
 ├─ convex/         # Esquemas y funciones de Convex
public/             # Archivos estáticos
