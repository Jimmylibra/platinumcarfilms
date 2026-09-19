import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Allows the site to be reached through tunneled hostnames (Cloudflare
    // quick tunnel, Tailscale, etc.) instead of just localhost -- this is a
    // dev-only preview server, not a production host.
    allowedHosts: true,
  },
})
