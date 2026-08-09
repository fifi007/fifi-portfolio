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

### 绑定 fifiii.com

1. 先确认域名已完成注册（可在注册商后台查看）
2. 在域名 DNS 中添加：

| 类型 | 主机记录 | 值 |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `fifi007.github.io` |

3. 在仓库 `fifi007.github.io` 的 GitHub Pages 设置里填入 Custom domain：`fifiii.com`，并勾选 Enforce HTTPS（DNS 生效后可用）

也可在发布目录放入 `CNAME` 文件（内容为 `fifiii.com`）后重新部署。

## 技术栈

- React 18 + TypeScript
- Vite
- Framer Motion

## 素材

本地素材来自 `/Users/xiaofeizheng/Downloads/非商业作品/个人主页/切图`，已复制至 `public/assets/`。
