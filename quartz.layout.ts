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
    Component.ConditionalRender({ // 如果页面不是主页，则显示面包屑
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(), // 显示文章标题
    Component.ContentMeta(), // 显示文章元数据（例如发布日期）
    Component.TagList(), // 显示文章的标签列表
  ],
  left: [
    Component.PageTitle(), // 显示页面标题
    Component.Flex({ 
      components: [
        {
          Component: Component.Search(), // 搜索框
          grow: true,
        },
        { Component: Component.Darkmode() }, // 深色模式切换按钮
      ],
    }),
    Component.MobileOnly(Component.Spacer()),
    Component.Explorer({ // 资源管理器组件，用于显示文件夹和文件的树形结构
      folderClickBehavior: "link", // 单击文件夹时会发生什么（“link”在单击时导航到文件夹页面,或单击“collapse”折叠文件夹）
      folderDefaultState: "collapsed", // 文件夹的默认状态 ("collapsed" or "open")
      useSavedState: true, // 是否使用本地存储来保存资源管理器的“状态”（打开哪些文件夹）
    }),
    Component.FloatingButtons({ // 桌面端显示的浮动按钮组件
        position: 'right',
    }),
  ],
  right: [
    Component.DesktopOnly(Component.Graph()), // 桌面端显示的图谱组件
    Component.DesktopOnly(Component.TableOfContents()), // 桌面端显示的目录组件
    Component.ConditionalRender({ // 如果页面不是主页
      component: Component.Backlinks({ // 显示文章的反向链接
        hideWhenEmpty: false,
      }),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({ // 如果页面是主页
      component: Component.RecentNotes({ // 显示最近的笔记
        limit: 7,
        showTags: false,
      }),
      condition: (page) => page.fileData.slug == "index",
    }),
  ],
  afterBody: [
    Component.PageNavigation(), // 显示页面导航组件（通常是上一篇和下一篇文章的链接）
    Component.ConditionalRender({ // 如果页面不是主页
      component: Component.RecentNotes({ // 显示最近的笔记
        limit: 5,
        showTags: false,
      }),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
}

// 显示页面列表的页面（例如标签或文件夹）
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),  // 显示面包屑导航
    Component.ArticleTitle(), // 显示文章标题
    Component.ContentMeta()], // 显示文章元数据（例如发布日期）
  left: [
    Component.PageTitle(), // 显示页面标题
    Component.Flex({
      components: [
        {
          Component: Component.Search(), // 搜索框
          grow: true,
        },
        { Component: Component.Darkmode() }, // 深色模式切换按钮
      ],
    }),
    Component.MobileOnly(Component.Spacer()),
    Component.Explorer({ // 资源管理器组件，用于显示文件夹和文件的树形结构
      folderClickBehavior: "link", // 单击文件夹时会发生什么（“link”在单击时导航到文件夹页面,或单击“collapse”折叠文件夹）
      folderDefaultState: "collapsed", // 文件夹的默认状态 ("collapsed" or "open")
      useSavedState: true, // 是否使用本地存储来保存资源管理器的“状态”（打开哪些文件夹）
    }),
    Component.DesktopOnly(Component.FloatingButtons({ // 桌面端显示的目录组件
        position: 'right',
    })),
  ],
  right: [],
  afterBody: [
    Component.RecentNotes({ // 显示最近的笔记
      limit: 5,
      showTags: false,
    }),
  ]
}
