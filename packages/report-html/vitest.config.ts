import { defineConfig } from 'vitest/config'
import * as path from "node:path";

const CanyonReportHtml = path.resolve(__dirname, 'index.js');

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: [
        'json',
        CanyonReportHtml,
      ],
    },
  },
})
