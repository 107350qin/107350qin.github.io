module.exports = {
  title: 'Code Design',
  description: '代码设计',
  head: [
    ['link', { rel: 'icon', href: `../hero.png` }]
  ],
  port: 80,
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '黑科技', link: '/black/' },
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
    repo: 'https://github.com/107350qin/107350qin.github.io',
    // 如果你的文档不在仓库的根部
    docsDir: 'docs',
    // 可选，默认为 master
    docsBranch: 'master',
    // 默认为 true，设置为 false 来禁用
    editLinks: true,
  },
  plugins: 
    {
      '@vssue/vuepress-plugin-vssue': {
        platform: 'github',
        owner: '107350qin',
        repo: '107350qin.github.io',
        clientId: 'ac93c1b414bc065602c5',
        clientSecret: '7b9e1e05355d59d58e8de2da0a4032f744dd8bdf',
        locale: 'zh-CN'
      },
      'vuepress-plugin-code-copy':{}
    },
}
