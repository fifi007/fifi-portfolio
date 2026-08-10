# FIFI Portfolio

郑小菲 FIFI — Product Designer Portfolio

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

## 部署

推送到 `main` 后，GitHub Actions 会自动构建并发布到 [`fifi007.github.io`](https://fifi007.github.io/)。

### 绑定 fiiifi.com

域名解析在华为云 DNS。添加以下记录并等待生效：

| 类型 | 主机记录 | 值 |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `fifi007.github.io` |

GitHub Pages 自定义域名为 `fiiifi.com`（部署产物含 `CNAME`）。DNS 生效后可开启 Enforce HTTPS。

## 技术栈

- React 18 + TypeScript
- Vite
- Framer Motion

## 素材

本地素材来自 `/Users/xiaofeizheng/Downloads/非商业作品/个人主页/切图`，已复制至 `public/assets/`。
