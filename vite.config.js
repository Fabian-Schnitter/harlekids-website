import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const adminIndexRedirect = () => ({
  name: 'admin-index-redirect',
  configureServer(server) {
    server.middlewares.use((request, response, next) => {
      const pathname = request.url?.split('?')[0]

      if (pathname === '/admin' || pathname === '/admin/') {
        response.statusCode = 302
        response.setHeader('Location', '/admin/index.html')
        response.end()
        return
      }

      next()
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [adminIndexRedirect(), react()],
})
