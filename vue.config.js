// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
//https://juejin.im/post/5bd02f98e51d457a944b634f
// 这里只列一部分，具体配置参考文档


const Timestamp = new Date().getTime();  //当前时间为了防止打包缓存不刷新，所以给每个js文件都加一个时间戳
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
   pluginOptions: {
      // i18n: {
      // locale: 'fr',
      // fallbackLocale: 'zh-CN',
      // localeDir: 'assets/locales',
      // enableInSFC: true
      // }
   },

   // outputDir: 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）
   // outputDir: '/src/assets',
   publicPath: './',  //有些地方这里需要 ./

   //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
   assetsDir: 'dist',

   //指定生成的 Index.html 的输出路径  (打包之后，改变系统默认的index.html的文件名)
   // indexPath: "myIndex.html",
   //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。
   // (false的时候就是让原来的文件名不改变)
   filenameHashing: false,

   //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
   lintOnSave: false,

   //如果你想要在生产构建时禁用 eslint-loader，你可以用如下配置
   // lintOnSave: process.env.NODE_ENV !== 'production',

   //是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，
   // 但是这会让你的应用额外增加 10kb 左右。(默认false)
   // runtimeCompiler: false,

   /**
    * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    *  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
    *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
    *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
    * */
   productionSourceMap: false,


   css: {
      extract: false,

      // extract: {
      //    filename: 'dist/css/[name].1609317655144.css',
      //    chunkFilename: 'dist/css/[name].1609317655144.css'
      // },

   },

   configureWebpack: (config) => {
      // if (process.env.NODE_ENV === "production") {
      //     // 为生产环境修改配置...
      //     config.mode = "production";
      //     // 这里修改下
      //     config.optimization.minimizer = [
      //         new UglifyJsPlugin({
      //             uglifyOptions: {
      //                 compress: {
      //                     // warnings: false,
      //                     drop_console: true, //console
      //                     drop_debugger: true,
      //                     pure_funcs: ['console.log'] //移除console
      //                 }
      //             }
      //         })
      //     ]
      //     //打包文件大小配置
      //     config["performance"] = {
      //         // "maxEntrypointSize":1000000,
      //         // "maxAssetSize":3000000
      //     }
      // } else {
      //     // 为开发环境修改配置...
      //     config.mode = "development";
      // }

      devtool = 'source-map';

      // 警告 webpack 的性能提示
      performance = {
         hints: 'warning',
         // 入口起点的最大体积
         maxEntrypointSize: 50000000,
         // 生成文件的最大体积
         maxAssetSize: 30000000,
         // 只给出 js 文件的性能提示
         assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js')
         }
      };

      output = { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
         filename: `dist/js/[name].${Timestamp}.js`,
         chunkFilename: `dist/js/[name].${Timestamp}.js`,
      };

   },

   // 它支持webPack-dev-server的所有选项
   devServer: {
      host: "localhost",
      // host: "192.168.31.252",
      // host: "192.168.6.189",
      port: 8084, // 端口号
      https: false, // https:{type:Boolean}
      open: true, //配置自动启动浏览器

      // 配置多个代理
      proxy: {
         "/apiTest": {
            target: "http://192.168.1.30:9201",// 访问的接口域名 乐乐 测试
            // target: "http://192.168.1.34:7040/",// 访问的接口域名
            ws: true,// 是否启用websockets
            changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
            pathRewrite: {
               '^/apiTest': '' //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
            },
         },
         // "/apiFormal": {
         //     target: "http://192.168.1.34:7040",// 访问的接口域名   正式
         //     ws: true,// 是否启用websockets
         //     changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
         //     pathRewrite: {
         //         '^/apiFormal': '',
         //     },
         // },
      }
   },
};