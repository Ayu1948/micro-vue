const { name } = require('./package');
const { defineConfig } = require('@vue/cli-service');
const AutoImport = require('unplugin-auto-import/webpack');

const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // 自定义webpack配置
  chainWebpack: (config) => {
    // 别名
    config.resolve.alias.set('@', resolve('src')); // key,value自行定义，比如.set('@@', resolve('src/components'))
    // .set('_c', resolve('src/components'))
    // .set('_cc', resolve('src/components/common'))
    // .set('_a', resolve('src/assets'))
    // .set('_u', resolve('src/utils'))
    // .set('_font', resolve('src/assets/font'))
    // .set('_css', resolve('src/assets/css'))
    // .set('_img', resolve('src/assets/img'))
    // .set('_api', resolve('src/api'))
    // .set('_d', resolve('src/datadict'));

    // vuecli 3默认开启 prefetch(预先加载模块)，提前获取用户未来可能会访问的内容
    // 在首屏会把这十几个路由文件，都一口气下载了,所以我们要关闭这个功能（移除prefetch插件）
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
  },
  // 自定义webpack配置
  configureWebpack: {
    plugins: [
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: ['vue', 'vue-router'],
        dts: false,
        eslintrc: {
          enabled: true, // <-- this
        },
      }),
    ],
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把子应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },
});
