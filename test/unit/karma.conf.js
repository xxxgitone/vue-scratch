var webpackConfig = require('../../webpack.config')

module.exports = function (config) {
  config.set({
    // 测试器环境
    browsers: ['PhantomJS'],
    // 测试使用的框架
    frameworks: ['mocha', 'sinon-chai'],
    // 结果存在哪里
    reporters: ['spec', 'coverage'],
    // 测试入口
    files: ['./index.js'],
    // 对指定文件进行预处理
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    // webpack打包规则
    webpack: webpackConfig,
    // 覆盖率配置
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
