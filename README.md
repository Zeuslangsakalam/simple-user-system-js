# Simple User System (JavaScript Enhanced)

这是一个简单的前端 Web 应用练习项目，旨在展示基础的用户注册、登录和信息展示功能。整个系统纯前端实现，利用浏览器自带的 LocalStorage 进行用户数据的持久化存储，并通过 SessionStorage 管理当前登录状态。此项目非常适合作为 Web 入门者学习 HTML, CSS, 和 Vanilla JavaScript 交互以及浏览器存储使用的Demo。

## 项目特性 (Features)

- **用户注册:** 用户可以通过表单填写信息（姓名、身份组、头像选择、相关ID/学号/工号、密码、性别、爱好、备注）进行注册，数据保存在浏览器的 LocalStorage 中。
- **用户登录:** 用户通过姓名、身份组、相关ID/学号/工号和密码进行登录验证。登录成功后，用户信息存储在浏览器的 SessionStorage 中，维持登录状态。
- **信息展示:** 登录用户可以在信息页查看自己的详细注册信息。
- **登录状态检测:** 首页、信息页和注册页的顶部会根据 SessionStorage 的状态显示当前登录用户信息或注册/登录链接。
- **退出登录:** 提供退出登录功能，清除 SessionStorage 中的登录信息。
- **身份组字段切换:** 注册和登录页面的 "相关ID" 字段会根据选择的身份组自动切换提示文本（ID/学号/工号）。
- **客户端数据存储:** 所有用户数据和登录状态完全依赖浏览器本地存储 (LocalStorage 和 SessionStorage)。
- **纯前端实现:** 无需后端服务，直接使用浏览器即可运行。

## 使用技术 (Technologies Used)

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage API
- SessionStorage API

## 如何运行 (Getting Started)

由于本项目完全是前端代码，运行非常简单：

1.  **克隆仓库:**
    ```bash
    git clone https://github.com/Your_GitHub_Username/simple-user-system-js.git
    ```
    _(请将 `Your_GitHub_Username` 替换为你的实际用户名)_
2.  **打开文件:** 进入项目目录，在浏览器中直接打开 `index.html` 文件即可。

    **注意:** 直接通过 `file://` 协议打开 `index.html` 文件可能会遇到某些浏览器限制（特别是涉及到 LocalStorage/SessionStorage 的访问）。**强烈建议使用一个简单的本地 Web 服务器来提供文件服务**，例如：
    *   **VS Code Extension:** 安装并使用 "Live Server" 插件，右键点击 `index.html` 选择 "Open with Live Server"。
    *   **Python:** 在项目根目录下打开终端，运行 `python -m http.server` (Python 3) 或 `python -m SimpleHTTPServer` (Python 2)，然后在浏览器中访问 `http://localhost:8000`。

运行后，你可以在浏览器中访问首页，并尝试注册新用户，然后使用注册的账号进行登录。

## 文件结构 (File Structure)

```txt
simpleUserSys/
├── css/
│   └── style.css
├── htmls/
│   ├── info.html
│   ├── login.html
│   └── regis.html
├── imgs/
│   ├── pixel_cactus.jpg
│   ├── pixel_orange.jpg
│   └── pixel_travelfrog.jpg
├── js/
│   ├── indexLoginState.js
│   ├── info.js
│   ├── login.js
│   ├── regisRoleLable.js
│   └── regisSaveData.js
└── index.html
```

*   `index.html`: 项目的入口文件，首页。根据登录状态显示不同的导航信息。
*   `css/style.css`: 项目的全局样式文件，定义了页面元素的通用样式。
*   `htmls/`: 存放除首页外的其他 HTML 页面。
    *   `htmls/regis.html`: 用户注册页面。
    *   `htmls/login.html`: 用户登录页面。
    *   `htmls/info.html`: 登录用户的个人信息展示页面。
*   `imgs/`: 存放项目使用的图片资源，主要是头像图片。
*   `js/`: 存放项目的 JavaScript 逻辑文件。
    *   `js/indexLoginState.js`: 用于处理首页、信息页、注册页顶部的登录状态显示和退出登录逻辑。
    *   `js/regisRoleLable.js`: 处理注册页面中，根据身份组切换相关ID字段标签的逻辑。
    *   `js/regisSaveData.js`: 处理注册表单数据的收集、校验和保存到 LocalStorage 的逻辑。
    *   `js/login.js`: 处理登录表单数据的收集、校验和登录验证（与 LocalStorage 数据比对），以及登录状态的 SessionStorage 存储和页面跳转。
    *   `js/info.js`: 从 SessionStorage 获取当前登录用户信息并显示在信息页表格中。

## 许可证 (License)

本项目采用 MIT 许可证。详情请查看 [LICENSE](LICENSE) 文件。