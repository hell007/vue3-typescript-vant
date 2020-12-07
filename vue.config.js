// eslint-disable-next-line @typescript-eslint/no-require-imports
const merge = require("webpack-merge");

// eslint-disable-next-line @typescript-eslint/no-require-imports
const tsImportPluginFactory = require("ts-import-plugin");

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pxtoviewport = require("postcss-px-to-viewport");

// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

// eslint-disable-next-line @typescript-eslint/no-require-imports
const autoprefixer = require("autoprefixer");

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== "development";

// 本地环境是否需要使用cdn
const devNeedCdn = true;

// cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
const cdn = {
  externals: {
    echarts: "echarts"
  },
  css: [],
  js: ["https://cdn.bootcss.com/echarts/4.6.0/echarts.min.js"]
};

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: "dist",
  indexPath: "index.html",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  parallel: false,
  runtimeCompiler: true, //热更新
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: "http://ynyd.ynicity.cn:9080",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    }
  },
  css: {
    loaderOptions: {
      //配置less主题
      less: {
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            "text-color": "#111",
            "border-color": "#eee",
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "./src/theme/var.less";`
          }
        }
      },
      //配置路vw vm适配
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375
          })
        ]
      }
    }
  },
  //配置路径别名
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        "@assets": resolve("src/assets")
      }
    }
  },
  chainWebpack: config => {
    // 修复HMR
    // config.resolve.symlinks(true);
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: path.resolve(__dirname, './src/styles/_global.scss'),
        })
        .end()
    })

    config.module
      .rule("ts")
      .use("ts-loader")
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "vant",
                libraryDirectory: "es",
                style: name => `${name}/style/less`
              })
            ]
          }),
          compilerOptions: {
            module: "es2015"
          }
        });
        return options;
      });

    // 生产环境压缩、分割代码
    if (isProduction) {
      // 压缩代码
      config.optimization.minimize(true);

      // 分割代码
      config.optimization.splitChunks({
        chunks: "all"
      });
    }

    // 注入cdn
    config.plugin("html").tap(args => {
      if (isProduction || devNeedCdn) args[0].cdn = cdn;
      return args;
    });
  }
};
