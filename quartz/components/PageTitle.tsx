import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { joinSegments } from "../util/path"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const iconPath = joinSegments(baseDir, "static/Logo.png")
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        <img class="Logo" src={iconPath} alt={title} />
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  align-self: center;
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
.Logo {
  align-self: center;
  max-height: 212px;
  min-height: 50px;
  max-width: 212px;
  min-width: 50px;
  margin: 0;
}
  
/* 针对移动端的样式 */
@media (max-width: 800px) {
  .Logo {
    max-height: 110px;
    min-height: 30px;
    max-width: 110px;
    min-width: 30px;
  }
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
