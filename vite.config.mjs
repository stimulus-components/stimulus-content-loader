import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig(({ mode }) => {
  if (mode === 'netlify') {
    return {
      build: {
        rollupOptions: {
          input: {
            index: resolve(__dirname, 'index.html'),
            message: resolve(__dirname, 'message.html'),
            with_javascript: resolve(__dirname, 'with_javascript.html'),
          }
        }
      }
    }
  }

  return {
    esbuild: {
      minifyIdentifiers: false,
    },
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "StimulusContentLoader",
        fileName: "stimulus-content-loader",
      },
      rollupOptions: {
        external: ["@hotwired/stimulus"],
        output: {
          globals: {
            "@hotwired/stimulus": "Stimulus",
          },
        },
      },
    },
  }
})
