interface FaviconProps {
  href: string
}

const Favicon = ({ href }: FaviconProps) => {
  try {
    const domain = new URL(href).hostname
    var iconLink = `https://icons.duckduckgo.com/ip3/${domain}.ico`
    if (!iconLink) {
      iconLink = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
    }
    return (
      <img
        // src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`}
        src={iconLink}
        width="16"
        height="16"
        style={{
          width: "16px",
          height: "16px",
          marginLeft: "1px",
          marginRight: "5px",
          marginTop: "0px",
          marginBottom: "-3px",
        }}
        alt={`${domain} favicon`}
      />
    )
  } catch (error) {
    console.error("Invalid URL passed to Favicon:", href)
    return null
  }
}

export default Favicon