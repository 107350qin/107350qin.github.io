module.exports = {
  title: 'Java帮帮忙',
  description: '搜罗Java开发中常用的工具',
  base: "/java-asker/",
  head: [
    ['link', { rel: 'icon', href: `../hero.png` }]
  ],
  port: 80,
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '黑科技', link: '/black/' },
      { text: 'GitHub', link: 'https://github.com' },
    ],
    sidebar: {
      // 侧边栏在 /guide/ 上
      '/guide/': [
        '',
        'java_base',
        'java_collection',
        'java_thread'
      ],
      // 侧边栏在 /black/ 上
      '/black/': [
        '',
        'chatgpt',
        'chatgpt_ali',
        'chatgpt_baidu',
        'chatgpt_huawei',
      ]
    },

    // 假定 GitHub。也可以是一个完整的 GitLab 网址
    repo: 'https://gitee.com/qinmengqinmeng/vuepress-asker',
    // 如果你的文档不在仓库的根部
    docsDir: 'docs',
    // 可选，默认为 master
    docsBranch: 'master',
    // 默认为 true，设置为 false 来禁用
    editLinks: true
  }
}
