import { defineConfig } from "vitepress";

export default defineConfig({
  title: "patchgen",
  description:
    "A guided CLI to generate Git patch files from staged changes, branch diffs, and tag diffs.",
  base: "/patchgen/",

  head: [
    [
      "link",
      { rel: "icon", type: "image/svg+xml", href: "/patchgen/logo.svg" },
    ],
  ],

  themeConfig: {
    logo: "/logo.svg",

    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Use Cases", link: "/use-cases/staged-changes" },
      { text: "Reference", link: "/reference/cli-flow" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          items: [
            { text: "Getting Started", link: "/guide/getting-started" },
            { text: "Why patchgen?", link: "/guide/why" },
          ],
        },
      ],
      "/use-cases/": [
        {
          text: "Use Cases",
          items: [
            { text: "Staged Changes", link: "/use-cases/staged-changes" },
            { text: "Compare Branches", link: "/use-cases/compare-branches" },
            { text: "Compare Tags", link: "/use-cases/compare-tags" },
            { text: "File Selection", link: "/use-cases/file-selection" },
            {
              text: "Sharing with AI / LLMs",
              link: "/use-cases/sharing-with-ai",
            },
          ],
        },
      ],
      "/reference/": [
        {
          text: "Reference",
          items: [
            { text: "CLI Flow", link: "/reference/cli-flow" },
            { text: "Git Commands", link: "/reference/git-commands" },
            { text: "Limitations & Roadmap", link: "/reference/limitations" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/teles/patchgen" },
    ],

    search: {
      provider: "local",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present Teles",
    },

    editLink: {
      pattern: "https://github.com/teles/patchgen/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
  },
});
