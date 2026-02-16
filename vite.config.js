import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: "/My-Note-App/",
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Notes App',
        short_name: 'Notes',
        description: 'My Notes PWA App',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/My-Note-App/',   // ✅ VERY IMPORTANT
        scope: '/My-Note-App/',       // ✅ VERY IMPORTANT
        icons: [
          {
            src: '/My-Note-App/NOTE-APP-1.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/My-Note-App/NOTE-APP-1.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
