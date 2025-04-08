import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// 所有页面共享的组件
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer(),
  // footer: Component.Footer({
  //   links: {
  //     GitHub: "https://github.com/Alpraline1999",
  //     "Discord Community": "https://discord.gg/cRFFHYye7t",
  //   },
  // }),
}

// 显示单个页面的页面的组件（例如，单个注释）
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    // Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      folderClickBehavior: "link", // 单击文件夹时会发生什么（“link”在单击时导航到文件夹页面,或单击“collapse”折叠文件夹）
      folderDefaultState: "collapsed", // 文件夹的默认状态 ("collapsed" or "open")
      useSavedState: true, // 是否使用本地存储来保存资源管理器的“状态”（打开哪些文件夹）
    }),
    Component.DesktopOnly(Component.FloatingButtons({
        position: 'right',
    })),
  ],
  right: [
    Component.DesktopOnly(Component.Graph()),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks({
      hideWhenEmpty: false,
    }),
    Component.RecentNotes({
      limit: 5,
      showTags: false,
    }),
  ],
  afterBody: [
    Component.PageNavigation(),
  ],
}

// 显示页面列表的页面（例如标签或文件夹）
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    // Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      folderClickBehavior: "link", // 单击文件夹时会发生什么（“link”在单击时导航到文件夹页面,或单击“collapse”折叠文件夹）
      folderDefaultState: "collapsed", // 文件夹的默认状态 ("collapsed" or "open")
      useSavedState: true, // 是否使用本地存储来保存资源管理器的“状态”（打开哪些文件夹）
    }),
    Component.DesktopOnly(Component.FloatingButtons({
        position: 'right',
    })),
  ],
  right: [],
  afterBody: []
}
