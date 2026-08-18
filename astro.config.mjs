import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.thebhavyapatel.com",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  devToolbar: {
    enabled: false,
  },
  vite: {
    build: {
      rolldownOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("/node_modules/codemirror/")) return "admin-codemirror";
            if (
              id.includes("/node_modules/react/") ||
              id.includes("/node_modules/react-dom/") ||
              id.includes("/node_modules/scheduler/")
            ) {
              return "admin-react";
            }
            if (id.includes("/node_modules/@emotion/")) return "admin-emotion";
            if (id.includes("/node_modules/lodash/")) return "admin-lodash";
            return undefined;
          },
        },
      },
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/admin/"),
    }),
  ],
});
