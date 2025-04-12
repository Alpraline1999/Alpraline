import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// 所有页面共享的组件
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(), // 页面的头部组件
  header: [],
  afterBody: [],
  footer: Component.Footer(), // 页脚组件
}

// 显示单个页面的页面的组件（例如，单个注释）
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    // 非主页时，面包屑
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    // 文章标题
    Component.ArticleTitle(),
    // 文章元数据（例如发布日期）
    Component.ContentMeta(),
    // 文章的标签列表
    Component.TagList(),
  ],
  left: [
    // 页面标题
    Component.PageTitle(), 
    // 搜索框 + 深色模式切换按钮
    Component.Flex({ 
      components: [
        {
          Component: Component.Search(), 
          grow: true,
        },
        { Component: Component.Darkmode() }, 
      ],
    }),
    // 资源管理器，用于显示文件夹和文件的树形结构
    Component.Explorer({ 
      folderClickBehavior: "collapse", // 单击文件夹时会发生什么（“link”在单击时导航到文件夹页面,或单击“collapse”折叠文件夹）
      folderDefaultState: "collapsed", // 文件夹的默认状态 ("collapsed" or "open")
      useSavedState: true, // 是否使用本地存储来保存资源管理器的“状态”（打开哪些文件夹）
    }),
    // 浮动导航按钮
    Component.FloatingButtons({ 
        position: 'right',
    }),
  ],
  right: [
    // 桌面端，目录
    Component.DesktopOnly(Component.TableOfContents()), 
    // 非主页，桌面端，反向链接
    Component.ConditionalRender({
      condition: (page) => page.fileData.slug !== "index",
      component: Component.DesktopOnly(Component.Backlinks({
        hideWhenEmpty: false,
      })),
    }),
    // 非主页，桌面端，关系图谱
    Component.ConditionalRender({
      condition: (page) => page.fileData.slug !== "index",
      component: Component.DesktopOnly(Component.Graph()),
    }),
    // 主页，桌面端，最近笔记
    Component.ConditionalRender({ 
      condition: (page) => page.fileData.slug == "index",
      component: Component.DesktopOnly(Component.RecentNotes({ 
        limit: 10,
        showTags: true,
      })),
    }),
  ],
  afterBody: [
    // 页面导航
    Component.PageNavigation(), 
    // 非主页，移动设备，关系图谱
    Component.ConditionalRender({
      condition: (page) => page.fileData.slug !== "index",
      component: Component.MobileOnly(Component.Graph()),
    }),
    // 非主页，评论
    Component.ConditionalRender({
      component: Component.Comments({
        provider: 'giscus',
        options: {
          // from data-repo
          repo: 'alpraline1999/Alpraline',
          // from data-repo-id
          repoId: 'R_kgDOOU4Jhw',
          // from data-category
          category: 'Announcements',
          // from data-category-id
          categoryId: 'DIC_kwDOOU4Jh84CpAZl',
          inputPosition: 'top',
          mapping: 'title',
          strict: false,
          reactionsEnabled: true,
        }
      }), 
      condition: (page) => page.fileData.slug !== "index",
    }),
    // 非主页，最近笔记
    Component.ConditionalRender({
      condition: (page) => page.fileData.slug !== "index",
      component: Component.RecentNotes({
        limit: 5,
        showTags: true,
      }),
    }),
    // 主页，移动设备，最近笔记
    Component.ConditionalRender({
      condition: (page) => page.fileData.slug == "index",
      component: Component.MobileOnly(Component.RecentNotes({
        limit: 10,
        showTags: true,
      })),
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
    Component.Explorer({ // 资源管理器组件，用于显示文件夹和文件的树形结构
      folderClickBehavior: "collapse", // 单击文件夹时会发生什么（“link”在单击时导航到文件夹页面,或单击“collapse”折叠文件夹）
      folderDefaultState: "collapsed", // 文件夹的默认状态 ("collapsed" or "open")
      useSavedState: true, // 是否使用本地存储来保存资源管理器的“状态”（打开哪些文件夹）
    }),
    Component.FloatingButtons({ // 浮动导航按钮
        position: 'right',
    }),
  ],
  right: [
    // 桌面端，最近笔记
    Component.DesktopOnly(Component.RecentNotes({
      limit: 10,
      showTags: true,
    })),],
  afterBody: [
    // 移动设备，最近笔记
    Component.MobileOnly(Component.RecentNotes({
      limit: 10,
      showTags: true,
    })),]
}
