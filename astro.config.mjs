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
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/admin/"),
    }),
  ],
});
