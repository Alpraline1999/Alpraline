import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Alpraline",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: false,
    analytics: {
      provider: "plausible",
    },
    locale: "zh-CN",
    baseUrl: "alpraline1999.github.io/Alpraline",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          // 页面背景     faf8f8
          light: "#fffcf0",
          // 边框        e5e5e5
          lightgray: "#e0e0e0",
          // 图形链接，粗边框        b8b8b8            
          gray: "#b2b2b2", 
          // 正文文本     4e4e4e
          darkgray: "#1b2222",
          // 标题文本，图标
          dark: "#2b2b2b",
          // 链接，关系图谱当前节点   284b63
          secondary: "#1a77a9",
          // 悬停，访问关系图谱节点   84a59d
          tertiary: "#1a77a988",
          // 内部链接背景，高亮文本，高亮代码行  143, 159, 169
          highlight: "rgba(240,240,240, 0.15)",
          // markdown 高亮文本背景  fff23688
          textHighlight: "#fff07f88",
        },
        darkMode: {
          // 页面背景        161618
          light: "#2e3440",
          // 边框           393639
          lightgray: "#474d57",
          // 图形链接, 粗边框 646464
          gray: "#6d717a",
          // 正文文本        d4d4d4
          darkgray: "#cbd1dd",
          // 标题文本，图标   
          dark: "#ebebec",
          // 链接，关系图谱当前节点  7b97aa
          secondary: "#42bed6",
          // 悬停，访问关系图谱节点  84a59d
          tertiary: "#76ecea",
          // 内部链接背景，高亮文本，高亮代码行  143, 159, 169
          highlight: "rgba(59, 66,82 , 0.15)",
          // markdown 高亮文本背景 b3aa0288
          textHighlight: "#ebcb8b88",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents({ 
        maxDepth: 4 ,
        collapseByDefault: true,
      }),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
