import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
import EnvironmentPlugin from "vite-plugin-environment"

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),EnvironmentPlugin("all")],
})
