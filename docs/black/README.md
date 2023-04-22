# 使用vuepress+github搭建静态网站

## vuepress项目开发

这里参照[官网](http://caibaojian.com/vuepress/)一步步做就行，我这里关键记录一下部署过程。

## 项目部署

### 仓库名称

由于我们要使用GitHub的免费域名来部署网站，所以仓库名称就起成 `username.github.io`，这里的username是你的github的账号名。

### 分支

我们提交的源代码是**master**分支，**npm**编译之后的资源文件我们希望通过脚本push到另外一个分支，所以还要建一个分支，这里就叫做 **gh-pages** 吧！

### 配置编译&推送脚本

在仓库下新建文件 `.github/workflows/gh-pages.yml`，内容如下：

```js
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2.4.0
        with:
          node-version: '14.x'
      - name: Install dependencies
        run: npm ci
      - name: Build site
        run: npm run docs:build
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@4.1.1
        with:
          token: ${{ secrets.VUEPRESS_SECRET }}
          branch: gh-pages
          folder: docs/.vuepress/dist/
```

表示当master分支有更新时，自动编译之后推送到gh-pages分支。其中重要的参数如下：

- 这里推送目录写编译之后的dist目录哈
- token怎么获取？
  - github>setting>Developer settings>Personal access tokens>Tokens(classis)新建一个token，我这里就写一个叫做VUEPRESS_TOKEN，生成的token字符串自己保存一下哈，下一步要用。
  - 仓库>Settings>Security>Secrets and variables>Actions>New repository secrets，我这里就写一个叫做VUEPRESS_SECRETS，对应的值写上面获得的token字符串。
  - 于是乎，脚本文件中的token就可以写上`secrets.VUEPRESS_SECRET`

### 部署

当主分支内容改变之后，查看部署分支gh-pages内容是否更新了，更新之后访问`username.github.io`即可！

### 其他问题

- 部署之后如果发现页面错乱，可能是config.js里配置的base不正确，把它去掉试试。
- 当部署失败时，尝试使用仓库下的 Actions 进行手动部署，这样可以看到日志，以便排查错误
  - 如果看到deploy阶段Permisson之类的问题，可能是你的TOKEN配置的权限不够！
  - md文档编辑是不要用大括号，否则可能会编译失败。


<Vssue :title="$title" />