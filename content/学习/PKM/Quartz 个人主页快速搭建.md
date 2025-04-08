---
created: 2025-04-06
modified: 2025-04-08
draft: false
tags:
  - PKM/个人主页
  - Quartz
---

>[!info]
>本文的大部分内容来自 [Quartz 主页](https://quartz.jzhao.xyz/) ，我对其进行了一些整理。

## 前言

Quartz 适合于习惯使用 Obsidian 的用户用于创建个人博客/主页，与 Obsidian 的许多功能完美适配。构建和部署也十分简单，很容易就可以构建出美观易用的个人主页，并且适配桌面端和移动端浏览。

- [我的主页 Alpraline](https://alpraline1999.github.io/Alpraline/)

## 安装 Installation

- **链接**：[Welcome to Quartz 4](https://quartz.jzhao.xyz/)
- **前置需求（最低版本）**：
    - [Node.js v20](https://nodejs.org/)
    - `npm v9.3.1`
- **安装过程**

```sh
> git clone https://github.com/jackyzha0/quartz.git
Cloning into 'quartz'...
remote: Enumerating objects: 11454, done.
remote: Counting objects: 100% (71/71), done.
remote: Compressing objects: 100% (35/35), done.
remote: Total 11454 (delta 49), reused 37 (delta 36), pack-reused 11383 (from 3)
Receiving objects: 100% (11454/11454), 10.82 MiB | 1.87 MiB/s, done.
Resolving deltas: 100% (7270/7270), done.

> cd quartz
> npm i
added 519 packages in 1m
176 packages are looking for funding
  run `npm fund` for details
  
> npx quartz create
┌   Quartz v4.5.0
│
◇  Choose how to initialize the content in `D:\02_Study\03_Notes\quartz\content`
│  Empty Quartz
│
◇  Choose how Quartz should resolve links in your content. This should match Obsidian's link format. You can change this later in
`quartz.config.ts`.
│  Treat links as shortest path
│
└  You're all set! Not sure what to do next? Try:
  • Customizing Quartz a bit more by editing `quartz.config.ts`
  • Running `npx quartz build --serve` to preview your Quartz locally
  • Hosting your Quartz online (see: https://quartz.jzhao.xyz/hosting)
```

### 更新 Upgrading

- **链接**：[Upgrading Quartz](https://quartz.jzhao.xyz/upgrading)

```sh
npx quartz update
```

## 结构 Structure

```sh
quartz
├─ content/         # 内容文件夹
│  └─ index.md      # 主页
├─ docs/            # 文档
├─ quartz/          # 核心、自定义scss样式
│  └─ cfg.ts        # 布局组件文件
├─ public/          # 构建后的输出文件夹
├─ quartz.config.ts # 设置文件
└─ quartz.layout.ts # 布局文件
```

## 构建 Building

- **链接**：[Building your Quartz](https://quartz.jzhao.xyz/build)
- **构建**：在命令行运行构建，然后通过浏览器打开`http://localhost:8080`可以查看网页

```sh
> npx quartz build --serve

 Quartz v4.5.0

Cleaned output directory `public` in 8ms
Found 1 input files from `content` in 41ms
Parsed 1 Markdown files in 251ms
Filtered out 0 files in 345μs
Emitted 14 files to `public` in 2s
Done processing 1 files in 2s
Started a Quartz server listening at http://localhost:8080
hint: exit with ctrl+c
[200] /
[200] /index.css
[200] /prescript.js
[200] /postscript.js
[200] /static/contentIndex.json
[200] /static/icon.png
```

## 同步 Sync

- **链接**：[Setting up your GitHub repository](https://quartz.jzhao.xyz/setting-up-your-GitHub-repository)

### 创建 GitHub 库

- **本地库与远程库关联**

```sh
> git remote -v
origin  https://github.com/jackyzha0/quartz.git (fetch)
origin  https://github.com/jackyzha0/quartz.git (push)
upstream        https://github.com/jackyzha0/quartz.git (fetch)
upstream        https://github.com/jackyzha0/quartz.git (push)

# 设置 GitHub 库为 origin
> git remote set-url origin git@github.com:Alpraline1999/Alpraline.git

# 检查是否设置成功
> git remote -v
origin  git@github.com:Alpraline1999/Alpraline.git (fetch)
origin  git@github.com:Alpraline1999/Alpraline.git (push)
upstream        https://github.com/jackyzha0/quartz.git (fetch)
upstream        https://github.com/jackyzha0/quartz.git (push)

# 如果 remote 中没有 upstream，需要手动添加
> git remote add upstream https://github.com/jackyzha0/quartz.git
```

### 同步到远程库

#### 初始同步

- 将仓库初始推送到远程库

```sh
> npx quartz sync --no-pull

 Quartz v4.5.0

Backing up your content
[v4 8201d88] Quartz sync: Apr 6, 2025, 9:44 PM
 2 files changed, 6 insertions(+)
 delete mode 100644 content/.gitkeep
 create mode 100644 content/index.md
Pushing your changes
Enumerating objects: 11141, done.
Counting objects: 100% (11141/11141), done.
Delta compression using up to 22 threads
Compressing objects: 100% (3982/3982), done.
Writing objects: 100% (11141/11141), 10.74 MiB | 884.00 KiB/s, done.
Total 11141 (delta 7063), reused 11120 (delta 7046), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (7063/7063), done.
To github.com:Alpraline1999/Alpraline.git
 * [new branch]      v4 -> v4
branch 'v4' set up to track 'origin/v4'.
Done!
```

#### 更新

```sh
> npx quartz sync
```

#### 手动同步/更新

- 可以手动通过 git 同步/更新

```sh
# 初始化
> git init
> git add .
> git commit -m "Initial commit"
> git remote add origin REMOTE-URL
> git branch -M main
> git push -u origin main
# 更新
> git add .
> git commit -m "更新内容：添加一篇随笔"
> git push
```

## 托管 Hosting

- 链接：[Hosting](https://quartz.jzhao.xyz/hosting)

### GitHub Pages

- **本地设置**：创建文件`quartz/.github/workflows/deploy.yml`

    ```yaml
    name: Deploy Quartz site to GitHub Pages
     
    on:
      push:
        branches:
          - v4
     
    permissions:
      contents: read
      pages: write
      id-token: write
     
    concurrency:
      group: "pages"
      cancel-in-progress: false
     
    jobs:
      build:
        runs-on: ubuntu-22.04
        steps:
          - uses: actions/checkout@v4
            with:
              fetch-depth: 0 # Fetch all history for git info
          - uses: actions/setup-node@v4
            with:
              node-version: 22
          - name: Install Dependencies
            run: npm ci
          - name: Build Quartz
            run: npx quartz build
          - name: Upload artifact
            uses: actions/upload-pages-artifact@v3
            with:
              path: public
     
      deploy:
        needs: build
        environment:
          name: github-pages
          url: ${{ steps.deployment.outputs.page_url }}
        runs-on: ubuntu-latest
        steps:
          - name: Deploy to GitHub Pages
            id: deployment
            uses: actions/deploy-pages@v4
    ```

- **GitHub设置**：GitHub 仓库 > Setting > Pages > Source > GitHub Action
- **同步**：通过`npx quartz sync`同步更新，主页就部署完毕了
- **主页地址**：`<github-username>.github.io/<repository-name>`
- **自定义域名**：GitHub Pages 上可以部署自定义域名，具体参考链接的`Custom Domain`部分

## 语法 Syntax

- **链接**：[Authoring Content](https://quartz.jzhao.xyz/authoring-content)

### Front Matter

- 常见字段
    - `title`：标题
    - `description`：链接预览描述
    - `permalink`：页面的自定义 URL，永久链接
    - `aliases`：别名，是一个字符串列表
    - `tags`：标签
    - `draft`：是否发布页面，**true**/**false** 表示**不发布**/**发布**
    - `date`：笔记发布日期，通常`YYYY-MM-DD`格式
- 完整列表：[Frontmatter](https://quartz.jzhao.xyz/plugins/Frontmatter)
    - title
        - `title`：字符串
    - description
        - `description`：字符串
    - permalink
        - `permalink`：字符串
    - comments
        - `comments`：字符串
    - lang
        - `lang`：字符串
    - publish
        - `publish`：布尔
    - draft
        - `draft`：布尔
    - enableToc
        - `enableToc`：字符串
    - tags
        - `tags`：字符串列表
        - `tag`
    - aliases
        - `aliases`：字符串列表
        - `alias`
    - cssclasses
        - `cssclasses`：字符串列表
        - `cssclass`
    - socialDescription
        - `socialDescription`：字符串
    - socialImage
        - `socialImage`：字符串
        - `image`
        - `cover`
    - created
        - `created`：字符串
        - `date`
    - modified
        - `modified`：字符串
        - `lastmod`
        - `updated`
        - `last-modified`
    - published
        - `published`：字符串
        - `publishDate`
        - `date`

## 配置 Configuration

- **链接**：[Configuration](https://quartz.jzhao.xyz/configuration)
- Quartz 的配置分为常规配置`configuration`和插件`plugins`两个部分

```ts
// quartz.config.ts
const config: QuartzConfig = {
  configuration: { ... },
  plugins: { ... },
}
```

### 常规配置 Configuration

- `pageTitle`：网站标题。在为网站生成 [RSS Feed](https://quartz.jzhao.xyz/features/RSS-Feed) 时也会用到
- `pageTitleSuffix`：添加到页面标题末尾的字符串。这仅适用于浏览器选项卡标题，而不适用于页面顶部显示的标题
- `enableSPA：` 是否在您的站点上启用 [SPA Routing](https://quartz.jzhao.xyz/features/SPA-Routing)
- `enablePopovers`：是否在站点上启用 [popover previews 弹窗预览](https://quartz.jzhao.xyz/features/popover-previews)
- `Analytics`：在您的网站上使用什么进行 Analytics；取值列表：
    - `null`：不使用 Analytics;
    - `{ provider: 'google', tagId: '<your-google-tag>' }` ：使用 Google Analytics;
    - `{ provider： 'plausible' }` （托管式） 或 `{ provider: 'plausible', host: '<your-plausible-host>' }` （自托管式）：使用 [Plausible](https://plausible.io/);
    - `{ provider: 'umami', host: '<your-umami-host>', websiteId: '<your-umami-website-id>' }` ：使用 [Umami](https://umami.is/) ;
    - `{ provider: 'goatcounter', websiteId: 'my-goatcounter-id' }` （托管）或 `{ provider: 'goatcounter', websiteId: 'my-goatcounter-id', host: 'my-goatcounter-domain.com', scriptSrc: 'https://my-url.to/counter.js' }` （自托管）：使用 [GoatCounter](https://goatcounter.com/);
    - `{ provider: 'posthog', apiKey: '<your-posthog-project-apiKey>', host: '<your-posthog-host>' }` ：使用 [Posthog](https://posthog.com/);
    - `{ provider: 'tinylytics', siteId: '<your-site-id>' }` ：使用 [Tinylytics](https://tinylytics.app/);
    - `{ provider： 'cabin' }` 或 `{ provider: 'cabin', host: 'https://cabin.example.com' }` （custom domain）：使用 [Cabin](https://withcabin.com/);
    - `{provider: 'clarity', projectId: '<your-clarity-id-code' }` ：使用 [Microsoft clarity](https://clarity.microsoft.com/)，项目 ID 可以在概述页面的顶部找到。
- `locale`：用于 [i18n](https://quartz.jzhao.xyz/features/i18n) 和日期格式
- `baseUrl`：这用于需要绝对 URL 来了解您网站的规范“主页”所在的位置的站点地图和 RSS 提要。这通常是您站点的已部署 URL（例如，此站点的 `quartz.jzhao.xyz`）。请勿包含协议（即 `https://`）或任何前导或尾部斜杠。
    - 如果在没有自定义域名的 GitHub 页面上[Hosting 托管](https://quartz.jzhao.xyz/hosting) ，应包括子路径。例如，如果存储库是 `jackyzha0/quartz`，则 GitHub 页面将部署到`https://jackyzha0.github.io/quartz`，并且`baseUrl`为`jackyzha0.github.io/quartz`
    - 请注意，Quartz 4 将尽可能避免使用它，并尽可能使用相对 URL，以确保**无论你最终将网站部署到何处**，它都能正常工作
- `ignorePatterns`：Quartz 在 `content` 文件夹中查找文件时应忽略且不搜索的 [glob](https://en.wikipedia.org/wiki/Glob_\(programming\)) 模式列表。有关更多详细信息，请参阅[private pages](https://quartz.jzhao.xyz/features/private-pages)
- `defaultDateType`：是否使用 `created`，`modified` 或 `published` 作为在页面和页面列表上显示的默认日期
- `theme `：配置网站的外观。
    - `cdnCaching`：如果为 `true`（默认），则使用 Google CDN 缓存字体，这通常会更快。如果您希望 Quartz 下载自包含字体，请禁用 （`false`） 此选项
    - `typography `：要使用的字体。[Google Fonts](https://fonts.google.com/) 上提供的任何字体都可以在这里使用
        - `title`：网站标题的字体（可选，默认与 `header` 相同）
        - `header`：用于标题的字体
        - `code`：内联引号和块引号的字体
        - `body`：所有内容的字体
    - `colors`：控制网站的主题
        - `light`：页面背景
        - `lightgray `：边框
        - `gray `：图形链接，较粗的边框
        - `darkgray`：正文文本
        - `dark`：标题文本和图标
        - `secondary`：链接颜色、Current [Graph](https://quartz.jzhao.xyz/features/graph-view) 节点
        - `tertiary `：悬停状态和访问[graph](https://quartz.jzhao.xyz/features/graph-view)节点
        - `highlight`：内部链接背景、高亮文本、[高亮代码行](https://quartz.jzhao.xyz/features/syntax-highlighting)
        - `textHighlight`：markdown 高亮文本背景

#### 字体 Font

- 字体可以自定义==设置==

    ```ts
    // string
    typography: {
      header: "Schibsted Grotesk",
      ...
    }
     
    // FontSpecification
    typography: {
      header: {
        name: "Schibsted Grotesk",
        weights: [400, 700],
        includeItalic: true,
      },
      ...
    }
    ```

### 插件配置 Plugins

```ts
plugins: {
  transformers: [...],
  filters: [...],
  emitters: [...],
}
```

- **transformers**：**映射**内容，如解析 frontmatter，生成 description
- **filter**：**过滤**内容，如过滤 draft
- **emitters**：**发出**内容，如创建 RSS feed，理出具有特定标签的页面

### 插件列表 Plugins List

- **链接**：[Plugins](https://quartz.jzhao.xyz/plugins/)

| 名称                                                                                    | 类别            | 功能                                                                                                                                                                                                                                                                                                                                                                                    |
| :------------------------------------------------------------------------------------ | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [ComponentResources](https://quartz.jzhao.xyz/plugins/ComponentResources)             | emitter       | **组件资源**：管理和发出 Quartz 框架所需的静态资源，包括 CSS 样式表和 JavaScript 脚本，用于增强所生成网站的功能和美观性                                                                                                                                                                                                                                                                                                            |
| [ContentIndex](https://quartz.jzhao.xyz/plugins/ContentIndex)                         | emitter       | **内容索引**：为网站发出 RSS 和 XML sitemap；[RSS Feed](https://quartz.jzhao.xyz/features/RSS-Feed) 允许用户订阅您网站上的内容，sitemap 允许搜索引擎更好地为网站编制索引。该插件还会发出一个 `contentIndex.json` 文件，该文件由动态前端组件（如 search 和 graph）使用                                                                                                                                                                                        |
| [ContentPage](https://quartz.jzhao.xyz/plugins/ContentPage)                           | emitter       | **内容页**：Quartz 框架的核心组件。为每条 Markdown 内容生成 HTML 页面；发出整页 [Layout](https://quartz.jzhao.xyz/layout) ，包括页眉、页脚和正文内容等                                                                                                                                                                                                                                                                        |
| [Custom OG Images](https://quartz.jzhao.xyz/plugins/CustomOgImages)                   | emitter       | **自定义OG图像**：为页面生成社交媒体预览图像，使用 [satori](https://github.com/vercel/satori) 将 HTML/CSS 转换为图像，为内容创建美观且一致的社交媒体预览卡                                                                                                                                                                                                                                                                           |
| [FolderPage](https://quartz.jzhao.xyz/plugins/FolderPage)                             | emitter       | **文件夹页**：为文件夹生成索引页面，为每个包含多个内容文件的文件夹创建一个列表页面；<br>**参阅** [Folder and Tag Listings](https://quartz.jzhao.xyz/features/folder-and-tag-listings)                                                                                                                                                                                                                                           |
| [NotFoundPage](https://quartz.jzhao.xyz/plugins/NotFoundPage)                         | emitter       | **Not Found**：为损坏或不存在的 URL 发出 404 （Not Found） 页面                                                                                                                                                                                                                                                                                                                                      |
| [Static](https://quartz.jzhao.xyz/plugins/Static)                                     | emitter       | **静态资源**：发出 Quartz 所需的所有静态资源；这用于需要稳定位置的字体和图像，例如横幅和图标；该插件遵循全局 [配置](https://quartz.jzhao.xyz/configuration) 中的 `ignorePatterns`<br><br>与 [Assets](https://quartz.jzhao.xyz/plugins/Assets) **不同**，[Static](https://quartz.jzhao.xyz/plugins/Static) 插件中的资源位于 `quartz/static` 下；而 [Assets](https://quartz.jzhao.xyz/plugins/Assets) 呈现在 `content` 下的所有静态资源，并用于 Markdown 内容直接引用的图像、视频、音频等 |
| [TagPage](https://quartz.jzhao.xyz/plugins/TagPage)                                   | emitter       | **标签页**：为内容中使用的每个标签发出专用页面<br>**参阅**： [folder and tag listings](https://quartz.jzhao.xyz/features/folder-and-tag-listings)                                                                                                                                                                                                                                                             |
| [AliasRedirects](https://quartz.jzhao.xyz/plugins/AliasRedirects)                     | emitter       | **别名重定向**：为内容文件 frontmatter 中定义的别名 aliased 和永久链接 permalinks 生成 HTML 重定向页面                                                                                                                                                                                                                                                                                                             |
| [Assets](https://quartz.jzhao.xyz/plugins/Assets)                                     | emitter       | **资源**：发出 content 文件夹中的所有非 Markdown 静态资源（如图像、视频、HTML 等），该插件遵循全局 [配置](https://quartz.jzhao.xyz/configuration) 中的 `ignorePatterns`                                                                                                                                                                                                                                                      |
| [CNAME](https://quartz.jzhao.xyz/plugins/CNAME)                                       | *emitter*     | **自定义域名**：发出一条 `CNAME` 记录，将子域名指向网站的默认域                                                                                                                                                                                                                                                                                                                                                |
| [ExplicitPublish](https://quartz.jzhao.xyz/plugins/ExplicitPublish)                   | *filter*      | **显式发布**：根据 frontmatter 中的显式 `publish` 标志过滤内容，仅允许显式标记为发布的内容通过；它是 [RemoveDrafts](https://quartz.jzhao.xyz/plugins/RemoveDrafts) 的可选版本；<br>**参阅**： [Private Pages](https://quartz.jzhao.xyz/features/private-pages)                                                                                                                                                                     |
| [RemoveDrafts](https://quartz.jzhao.xyz/plugins/RemoveDrafts)                         | filter        | **删除草稿**：会过滤掉 Vault 中的内容，仅提供最终内容；这可以防止发布 [Private Pages](https://quartz.jzhao.xyz/features/private-pages) ；默认情况下，它会过滤掉 frontmatter 中带有 `draft： true` 的所有页面，并保持所有其他页面不变                                                                                                                                                                                                                |
| [Citations](https://quartz.jzhao.xyz/plugins/Citations)                               | *transformer* | **引用**：为 Quartz 添加了 Citations 支持；<br>**参阅**： [Citations](https://quartz.jzhao.xyz/features/Citations)                                                                                                                                                                                                                                                                                 |
| [CrawlLinks](https://quartz.jzhao.xyz/plugins/CrawlLinks)                             | transformer   | **链接爬取**：解析链接并对其进行处理以指向正确的位置，嵌入链接（如图像）也需要它                                                                                                                                                                                                                                                                                                                                            |
| [CreatedModifiedDate](https://quartz.jzhao.xyz/plugins/CreatedModifiedDate)           | transformer   | **创建修改日期**：使用三个可能的数据源确定文档的创建、修改和发布日期：frontmatter 元数据、Git 历史记录和文件系统                                                                                                                                                                                                                                                                                                                    |
| [Description](https://quartz.jzhao.xyz/plugins/Description)                           | transformer   | **描述**：生成的描述用作 HTML `head` 、[RSS Feed](https://quartz.jzhao.xyz/features/RSS-Feed)的元数据；如果没有主体内容，则在 [Folder and Tag Listings](https://quartz.jzhao.xyz/features/folder-and-tag-listings) 中，描述将用作标题和列表之间的文本                                                                                                                                                                             |
| [Frontmatter](https://quartz.jzhao.xyz/plugins/Frontmatter)                           | transformer   | **前言**：使用 [gray-matter](https://github.com/jonschlinkert/gray-matter) 库解析页面的 frontmatter；<br>**参阅**： [Syntax](https://quartz.jzhao.xyz/authoring-content#syntax)、 [Obsidian 兼容性](https://quartz.jzhao.xyz/features/Obsidian-compatibility) 和 [OxHugo 兼容性](https://quartz.jzhao.xyz/features/OxHugo-compatibility)                                                                     |
| [GitHubFlavoredMarkdown](https://quartz.jzhao.xyz/plugins/GitHubFlavoredMarkdown)     | transformer   | **GFM支持**：增强了 Markdown 处理以支持 GitHub Flavored Markdown （GFM），添加了自动链接文字、脚注、删除线、表格和任务列表等功能                                                                                                                                                                                                                                                                                               |
| [HardLineBreaks](https://quartz.jzhao.xyz/plugins/HardLineBreaks)                     | *transformer* | **硬换行**：自动将 Markdown 文本中的单换行符转换为 HTML 输出中的硬换行符。默认情况下，此插件未启用，因为它不遵循实际 Markdown 的语义，但如果希望与 [Obsidian](https://quartz.jzhao.xyz/features/Obsidian-compatibility) 相同，则可以启用它                                                                                                                                                                                                               |
| [Latex](https://quartz.jzhao.xyz/plugins/Latex)                                       | transformer   | **Latex**：为 Quartz 添加了 LaTeX 支持；<br>**参阅**： [Latex](https://quartz.jzhao.xyz/features/Latex)                                                                                                                                                                                                                                                                                          |
| [ObsidianFlavoredMarkdown](https://quartz.jzhao.xyz/plugins/ObsidianFlavoredMarkdown) | transformer   | **OFM支持**：提供对 [Obsidian 兼容性](https://quartz.jzhao.xyz/features/Obsidian-compatibility)的支持                                                                                                                                                                                                                                                                                             |
| [OxHugoFlavoredMarkdown](https://quartz.jzhao.xyz/plugins/OxHugoFlavoredMarkdown)     | *transformer* | **OHFM支持**：提供对 [ox-hugo](https://github.com/kaushalmodi/ox-hugo) 兼容性的支持；<br>**参阅** [OxHugo 兼容性](https://quartz.jzhao.xyz/features/OxHugo-compatibility)                                                                                                                                                                                                                               |
| [SyntaxHighlighting](https://quartz.jzhao.xyz/plugins/SyntaxHighlighting)             | transformer   | **语法高亮**：用于向 Quartz 中的代码块添加语法高亮显示；<br>**参阅** [syntax highlighting](https://quartz.jzhao.xyz/features/syntax-highlighting)                                                                                                                                                                                                                                                             |
| [TableOfContents](https://quartz.jzhao.xyz/plugins/TableOfContents)                   | transformer   | **目录**：为 Markdown 文档生成目录（TOC）；<br>**参阅**： [table of content](https://quartz.jzhao.xyz/features/table-of-contents)                                                                                                                                                                                                                                                                     |

## 布局 Layout

- **链接**：[Layout](https://quartz.jzhao.xyz/layout)
- **默认布局**：`quartz.layout.ts`
- **页面组件文件**：
    - `head`：不会直观显示在界面上，而是负责有关文档的 metadata，如 tab title，scripts，styles
    - `header`：一组水平布局的组件，显示在`beforeBody`之前，Quartz 4 默认不会在其中放置组件

    ```ts
    // quartz/cfg.ts
    export interface FullPageLayout {
      head: QuartzComponent // single component
      header: QuartzComponent[] // laid out horizontally
      beforeBody: QuartzComponent[] // laid out vertically
      pageBody: QuartzComponent // single component
      afterBody: QuartzComponent[] // laid out vertically
      left: QuartzComponent[] // vertical on desktop and tablet, horizontal on mobile
      right: QuartzComponent[] // vertical on desktop, horizontal on tablet and mobile
      footer: QuartzComponent // single component
    }
    ```

![image](/static/images/Quartz_PersonalPage_8d0044.png)

### 组件列表 Components List

- **自定义**：所有组件都支持自定义，包括组件、样式、脚本

| 名称                                                                                   | 功能                                                                                                                                  |
| :----------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| [Backlinks](https://quartz.jzhao.xyz/features/backlinks)                             | **反链**：开启后支持悬浮预览                                                                                                                    |
| [Breadcrumbs](https://quartz.jzhao.xyz/features/breadcrumbs)                         | **痕迹导航**：按其父文件夹列表在站点内的页面层次结构中导航；默认情况下，页面最顶部的元素是痕迹导航栏                                                                                |
| [Comments](https://quartz.jzhao.xyz/features/comments)                               | **评论**：挂接各种提供方，使读者能够在网站上发表评论；目前仅支持 [Giscus](https://giscus.app/) 开箱即用，但欢迎支持其他提供商的 PR                                                |
| [Darkmode](https://quartz.jzhao.xyz/features/darkmode)                               | **暗色主题**：开箱即用的暗色主题切换                                                                                                                |
| [Explorer](https://quartz.jzhao.xyz/features/explorer)                               | **资源管理器**：可浏览网站上的所有文件和文件夹，支持嵌套文件夹，高度可定制                                                                                             |
| [Folder and Tag Listings](https://quartz.jzhao.xyz/features/folder-and-tag-listings) | **文件夹/标签列表**：为文件夹和标签生成列表页面                                                                                                          |
| [Full-text Search](https://quartz.jzhao.xyz/features/full-text-search)               | **全文搜索**：由 [Flexsearch](https://github.com/nextapps-de/flexsearch) 提供支持，速度很快，可以在 10 毫秒内为 Quartz 返回多达五十万个单词的搜索结果                     |
| [Graph View](https://quartz.jzhao.xyz/features/graph-view)                           | **关系图谱**：可以显示局部关系图谱和全局关系图谱                                                                                                          |
| [Recent Notes](https://quartz.jzhao.xyz/features/recent-notes)                       | **近期笔记**：可根据一些过滤和排序标准生成最近的笔记列表；默认不包含在任何 [布局](https://quartz.jzhao.xyz/layout) 中，可以使用`quartz.layout.ts`中的`Component.RecentNotes`添加它。 |
| [Table of Contents](https://quartz.jzhao.xyz/features/table-of-contents)             | **目录**：从每个页面上的标题列表自动生成目录（TOC），通过不同的颜色突出显示滚动浏览的标题来显示当前位置；默认情况下，目录显示从 H1 到 H3 的所有标题，并且仅当页面上有多个标题时才显示。                                 |

### 布局断点 Layout Breakpoints

- **布局断点**：不同屏幕宽度会被识别为不同设备，主页的布局也会有所不同，具体可参考链接
- **默认值**：默认的布局断点为`800px, 1200px`
- **修改**：可以在`quartz/styles/variables.scss`中修改布局断点

    ```scss
    // variables.scss
    $breakpoints: (
      mobile: 800px,
      desktop: 1200px,
    );
    ```

### 样式 Style

- **常规修改**：大多数样式的修改（如配色、字体）都可以在[[#常规配置 Configuration]]中修改
- **基本样式**：基本样式表在`quartz/styles/base.scss`中
- **自定义样式**：更多样式的修改可以在`quartz/styles/custom.scss`中编写

>[!note] 组件样式
>一些组件可能有自定义样式，如`quartz/components/Darkmode.tsx`从`quartz/components/styles/darkmode.scss`引入样式，自定义样式时需注意

### 高阶布局组件 High-Order Layout Components

- **链接**：[Higher-Order Layout Components](https://quartz.jzhao.xyz/layout-components)

#### 弹性组件 Flex Component

- **Flex**：灵活的 box 布局，可以以各种方式排列**子组件**，有助于创建响应式布局和按行或列组织组件
- **参考**：[flex - CSS：层叠样式表 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)

    ```ts
    type FlexConfig = {
      components: {
        Component: QuartzComponent
        grow?: boolean // whether component should grow to fill space
        shrink?: boolean // whether component should shrink if needed
        basis?: string // initial main size of the component
        order?: number // order in flex container
        align?: "start" | "end" | "center" | "stretch" // cross-axis alignment
        justify?: "start" | "end" | "center" | "between" | "around" // main-axis alignment
      }[]
      direction?: "row" | "row-reverse" | "column" | "column-reverse"
      wrap?: "nowrap" | "wrap" | "wrap-reverse"
      gap?: string
    }
    ```

- **示例**：

    ```ts
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true, // Search will grow to fill available space
        },
        { Component: Component.Darkmode() }, // Darkmode keeps its natural size
      ],
      direction: "row",
      gap: "1rem",
    })
    ```

#### 移动设备组件 MobileOnly Component

- **MobileOnly**：仅在移动设备上可见，有助于创建响应式布局，某些组件应仅显示在较小的屏幕上
- **示例**

    ```ts
    Component.MobileOnly(Component.Spacer())
    ```

#### 桌面组件 DesktopOnly Component

- **DesktopOnly**：仅在桌面设备可见，有助于创建响应式布局，某些组件应仅显示在较大的屏幕上
- **示例**：

    ```ts
    Component.DesktopOnly(Component.TableOfContents())
    ```

#### 条件渲染组件 ConditionalRender Component

- **ConditionalRender**：包装器（wrapper），据提供的条件函数有条件地呈现其子组件。这对于创建动态布局非常有用，其中组件仅在特定条件下显示

    ```ts
    type ConditionalRenderConfig = {
      component: QuartzComponent
      condition: (props: QuartzComponentProps) => boolean
    }
    ```

- **示例1**：仅在页面未处于整页模式时呈现搜索组件

    ```ts
    Component.ConditionalRender({
      component: Component.Search(),
      condition: (props) => props.displayClass !== "fullpage",
    })
    ```

- **示例2**：隐藏根 `index.md` 页上的痕迹导航

    ```ts
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    })
    ```
