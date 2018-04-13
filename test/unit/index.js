import Vue from 'vue'

Vue.config.productionTip = false

// 加载所有的测试用例文件
// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
// 加载所有的资源文件，及src目录下的除了main.js文件的所有文件, 即要覆盖的所有代码
const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)
