module.exports = {
  root: true,
  /**
   * 解析器
   *
   * ESLint默认使用Espree作为其解析器
   * 解析器必须是本地安装的一个npm模块。即必须在本地的node_module中
   * 解析器是用于解析js代码的，怎么去理解每一个表达式，有点C++中编译器的概念，会对js进行一些语法分析，语义分析什么的，才能判断语句符不符合规范
   * 而不是通过简单的字符串对比，解析器有很多，但兼容eslint的解析器有以下几个
   * Espree：默认解析器，一个从Esprima中分离出来的解析器，做了一些优化
   * Esprima：js标准解析器
   * Babel-ESLint：一个对Babel解析器的包装，babel本身也是js解析器的一种（不然怎么能转化为兼容性代码呢？首先需要进行js解析，才能转化）。
   * 如果我们的代码需要经过babel转化，则对应使用这个解析器
   * @typescript-eslint/parser：将TypeScript转换成与estree兼容的形式，以便在ESLint中使用。
   */
  parser: 'vue-eslint-parser',
  /**
  * 解析器配置项
  * 
  * 这里设置的配置项将会传递到解析器中，被解析器获取到，进行一定的处理。具体被利用到，要看解析器的源码有没有对其进行利用。
  * 这里仅仅做了参数定义，做了规定，告诉解析器的开发者可能有这些参数
  * 配置项目有：
  * ecmaVersion - 支持的ES语法版本，默认为5。注意只是语法，不包括ES的全局变量。全局变量需要在env选项中进行定义
  * sourceType - 指定JS代码来源的类型，script(script标签引入？) | module（es6的module模块），默认为script
  * 为什么vue的会使用script呢？因为vue是通过babel-loader编译的，而babel编译后的代码就是script方式
  * ecmaFeatures - Features是特征的意思，这里用于指定要使用其他那些语言对象
      > globalReturn - 是否允许在全局作用域下使用 return 语句
      > impliedStrict - 是否启用全局 strict mode (如果 ecmaVersion 是 5 或更高) 
      > jsx - 启用jsx语法
      > experimentalObjectRestSpread - 是否启用实验性的 object rest/spread properties 支持
  */
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: true
    },
    // 即使没有 babelrc 配置文件，也使用 babel-eslint 来解析
    requireConfigFile: false,
    // 仅允许 import export 语句出现在模块的顶层
    allowImportExportEverywhere: false
  },
  /**
   * 运行环境
   *
   * 一个环境定义了一组预定义的全局变量
   * 获得了特定环境的全局定义，就不会认为是开发定义的，跳过对其的定义检测。否则会被认为该变量未定义
   * 常见的运行环境有以下这些，更多的可查看官网
   * browser - 浏览器环境中的全局变量。
   * node - Node.js 全局变量和 Node.js 作用域。
   * es6 - 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
   * amd - 将 require() 和 define() 定义为像 amd 一样的全局变量。
   * commonjs - CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)。
   * jquery - jQuery 全局变量。
   */
  env: {
    browser: true,
    node: true,
    amd: true,
    commonjs: true,
    // 自动启动es6新的全局变量
    es6: true,
    jquery: true
  },
  /**
   * 全局变量
   *
   * 定义额外的全局，开发者自定义的全局变量，让其跳过no-undef规则
   * key值就是额外添加的全局变量
   * value值用于标识该变量能否被重写，类似于const的作用。true为允许变量被重写
   * 注意：要启用no-global-assign规则来禁止对只读的全局变量进行修改
   */
  globals: {
    // a: true, // 例如定义a这个全局变量，且这个变量可以被重写
  },
  /**
   * 插件
   *
   * 插件同样需要在node_module中下载
   * 注意插件名忽略了「eslint-plugin-」前缀，所以在package.json中，对应的项目名是「eslint-plugin-vue」
   * 插件的作用类似于解析器，用以扩展解析器的功能，用于检测非常规的js代码，也可能会新增一些特定的规则
   * 如eslint-plugin-vue，是为了帮助我们检测.vue文件中<template>和<script>中的js代码
   */
  plugins: ['vue', '@typescript-eslint'],
  /**
   * 规则继承
   *
   * 可继承的方式有以下几种
   * eslint内置推荐规则，就只有一个，即「eslint:recommended」
   * 可共享的配置，是一个npm包，它输出一个配置对象。即通过npm安装到node_module中
   * 可共享的配置可以省略包名的前缀 eslint-config-，即实际设置安装的包名是eslint-config-airbnb-base
   * 从插件中获取的规则，书写规则为「plugin:插件包名/配置名」，其中插件包名也是可以忽略「eslint-plugin-」前缀。如「plugin:vue/essential」
   * 从配置文件中继承，即继承另外的一个配置文件，如'./node_modules/coding-standard/eslintDefaults.js'
   */
  extends: ['./eslint.rules.typescript.js'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
};
