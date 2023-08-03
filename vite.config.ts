
import ssr from 'vite-plugin-ssr/plugin'
import react from '@vitejs/plugin-react'
import { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [react(), ssr()]
}

export default config
