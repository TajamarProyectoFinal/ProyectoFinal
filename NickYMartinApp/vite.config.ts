import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl' // <-- Importa el plugin

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        basicSsl() // <-- Añade el plugin aquí
    ],
    server: {
        https: true // <-- Habilita HTTPS para el servidor de desarrollo
    }
})