---
created: 2025-04-09
modified: 2025-04-09
draft: false
tags: [Cloudflare, PKM/个人主页, Quartz]
---

## 前言

直接通过 GitHub Pages 托管的个人主页网站需要 VPN 才能正常访问，可以通过自定义域名 + Cloudflare 解除限制。

## Cloudflare

[Cloudflare](https://dash.cloudflare.com) 作为全球 CDN 网络，提供网站加速和保护服务。通过使用 Cloudflare CDN 服务提供的全球节点，一方面可以**提高网站响应速度和性能，节省源站资源**；另一方面也可以**保护站点抵御攻击，保证网站长期稳定在线**。

Cloudflare 提供免费服务，对于个人用户使用基本足够。

- **网站缓存**：将网站缓存在国内较近的节点（如香港、日本、东南亚），用户访问时优先从最近的 Cloudflare 节点加载，而不是直接访问 GitHub
- **SSL证书**：Cloudflare 会自动签发 HTTPS 证书，让网站变成`https://`
- **网站防护**：设置防自动程序、防 DDoS 攻击等

## 自定义域名配置

### 1. 购买域名

挑选合适的服务商购买域名，如`yourdomain.com`

### 2. GitHub Pages 设置

打开自己主页的 GitHub 仓库，进入

- Settings -> Pages -> Custom Domain -> 输入域名`yourdomain.com` -> Save
- 建议开启 **Enforce HTTPS**

### 3. Cloudflare 解析域名

- 注册 [Cloudflare](https://dash.cloudflare.com) 账号
- 点击 **添加域（Add a domain）**
- 进入域名，进入 DNS 选项卡进行解析
- 根据提示，进入**服务商的域名控制台**，**修改 DNS** 为 Cloudflare 提供的两个域名地址
- **添加解析记录**如下，如果希望 `www.yourdomain.com` 和 `yourdomain.com` 都能访问，就必须设置 `www` 和 `@`，并且建议 `@` 添加四个 IP 地址的解析记录，能够提高速度和稳定性

| 类型    | 主机记录  | 记录值                                    |
| ----- | ----- | -------------------------------------- |
| CNAME | `www` | `yourusername.github.io.` （注意后面有个 `.`） |
| A（可选） | `@`   | `185.199.108.153` （GitHub Pages 的 IP）  |
| A（可选） | `@`   | `185.199.109.153`                      |
| A（可选） | `@`   | `185.199.110.153`                      |
| A（可选） | `@`   | `185.199.111.153`                      |

### 4. SSL 证书

- Cloudflare：进入 **SSL/TLS** 选项卡，一般会自动发布证书，如果没有可以手动设置一下

>[!warning]
>如果 GitHub Pages 开启了 **Enforce HTTPS**，Cloudflare 的 SSL/TLS 加密模式需要手动设置为 **完全（Full）**，否则 灵活（Flex）模式下 Cloudflare 会使用 HTTP 和 GitHub Pages 通信，然后被打回

### 5. 其他设置

1. **URL 重定向**：可以在 Cloudflare **规则（Rules）** 中创建一些规则。重定向规则可以将 `www.yourdomain.com` 重定向至 `yourdomain.com`，或者反过来，或者重定向到其他域名
2. **网站防护**：可以在 Cloudflare **安全性（Security）** 中设置自动程序、防 DDoS 攻击等
