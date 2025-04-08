import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"
import Favicon from "./Favicon"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    const mygit = "https://github.com/Alpraline1999"
    const gmail = "https://mail.google.com"
    const quartz = "https://quartz.jzhao.xyz/"
    const ob = "https://obsidian.md"
    const ghp = "https://github.com/Alpraline1999/Alpraline"

    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          {"Contact me "}
          <a href={mygit} class="external"><Favicon href={mygit} />GitHub</a>
          {" / "}
          <a href={gmail} class="external"><Favicon href={gmail} />alpraline1999@gmail.com</a>
        </p>
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href={quartz} class="external"><Favicon href={quartz} />Quartz v{version}</a>
          {" © "}{year}{" / "}
          <a href={ob} class="external"><Favicon href={ob} />Obsidian</a>
          {" / "}
          <a href={ghp} class="external"><Favicon href={ghp} />GitHub Pages</a>
        </p>
      </footer >
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
