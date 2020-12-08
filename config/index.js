'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  //开发环境
  dev: {

    // Paths
    assetsSubDirectory: 'static',  //编译输出的二级目录
    assetsPublicPath: '/',         //编译发布的根目录，可配置为资源服务器域名或CDN域名
    proxyTable: {    //配置后台代理
      '/api': {           // 配置后台代理
        target: 'http://192.168.37.56:8090', //本地测试环境请求后台接口的域名ip
        secure: false,                       //https需要配置的参数
        pathRewrite: {
          '^/api': ''                       //代替targe里面的地址
        },
        changeOrigin: true                 // 接口跨域需要配置的参数
      },

    },

    // Various Dev Server settings
    host: 'localhost', // 运行测试页面的域名ip
    port: 8080, // 运行测试页面的端口
    autoOpenBrowser: false,  //项目运行时是否自动打开浏览器
    errorOverlay: true,      //浏览器错误提示
    notifyOnErrors: true,    // 跨平台错误提示
    poll: false, // 使用文件系统获取文件改动的通知devServer.watchOptions https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',   // 增加调试，该属性为原始源代码

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,  // 使缓存失效

    cssSourceMap: true  // 代码压缩后bug定位将非常困难，引入SourceMap记录压缩前后的位置信息记录，当产生错误时直接定位到压缩前的位置
  },
  
  //生产环境
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'), // 编译输入的index.html文件

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),  // 编译输出的静态资源路径（项目打包时的文件）
    assetsSubDirectory: 'static',  // 编译输出的二级目录
    assetsPublicPath: '/',   // 编译发布的根目录，可配置为资源服务器域名或CDN域名

    /**
     * Source Maps
     */

    productionSourceMap: true,  // 是否开启cssSourceMap
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',   // 增加调试，该属性为原始源代码

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,    // 是否开启gzip
    productionGzipExtensions: ['js', 'css'],   // 需要使用gzip压缩文件的扩展名

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report    // 打包分析
  }
}
