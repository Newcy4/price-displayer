# Price Displayer

酒店价格展示大屏，基于 **Vue 3** 和 **Element Plus** 实现，支持通过 **nw.js** 打包为桌面应用，适用于 Windows 和 macOS。

---

## ✨ 功能特性

- **价格展示表格**：使用动态分割算法，自动将数据列表自适应分布到多个表格中。
- **轮播展示**：支持图片轮播，支持视频播放。
- **数据管理后台**：提供菜品数据的增删改查功能，支持本地存储。
- **桌面应用支持**：通过 **nw.js** 打包为桌面应用，适配 Windows 和 macOS。
- **响应式布局**：适配不同分辨率屏幕，支持大屏展示。

---

## 🛠 技术栈

- **前端框架**：Vue 3
- **UI 框架**：Element Plus
- **轮播组件**：Swiper
- **桌面应用**：nw.js
- **构建工具**：Vite
- **样式预处理**：Sass

---

## 📂 项目结构

```plaintext
price-displayer/
├── public/
├── src/                    # 源代码
│   ├── assets/             # 静态资源
│   ├── components/         # 公共组件
│   ├── views/              # 页面组件
│   │   ├── Price.vue       # 价格展示页面
│   │   ├── Dashboard.vue   # 数据管理后台
│   ├── testdata.js         # 测试数据
│   └── main.js             # 项目入口文件
├── dist/                   # 打包输出目录
├── build/                  # 桌面应用构建输出目录
├── package.json            # 项目配置文件
└── README.md               # 项目说明文档
```
--- 

## 🚀 快速开始
0. 分辨率调整
根据目标显示器，在 `/src/components/ScreenAdapter.vue` 组件中设置对应分辨率,可以获得更好的体验

1. 安装依赖
使用 pnpm 安装依赖：
运行以下命令启动开发服务器：
```sh
pnpm install
```

1. 启动开发服务器
运行以下命令启动开发服务器：
```sh
pnpm dev
```
开发服务器启动后，访问 http://localhost:5173 查看效果。

1. 构建生产环境
运行以下命令构建生产环境代码：
```sh
pnpm build
```

构建完成后，生成的文件位于 `dist/` 目录。


## 🖥 桌面应用构建
🪟 Windows 桌面应用

运行以下命令构建 Windows 桌面应用：
```sh
pnpm build:nw
```

🍎 macOS 桌面应用

运行以下命令构建 macOS 桌面应用：
```sh
pnpm build:nw-mac
```


## 📄 License
本项目遵循 MIT License 开源协议。
