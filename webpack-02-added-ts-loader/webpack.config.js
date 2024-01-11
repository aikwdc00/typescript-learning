const path = require('path');

/*
這是一個基本的Webpack配置文件。以下是你提供的代码中各个参数的作用：

entry: 指定Webpack的入口文件，也就是Webpack开始解析你的应用程序的地方。在这个例子中，入口文件是./src/app.ts。

output: 指定Webpack输出（打包后的）文件的位置和文件名。filename是输出文件的名字，path是输出文件的路径。在这个例子中，输出文件名是bundle.js，路径是项目根目录下的dist文件夹。

devtool: 选择一种源映射方式以方便调试。在这个例子中，使用的是inline-source-map，它会生成对应的源码映射，这样在调试时可以直接查看源代码，而不是打包后的代码。

module: 定义了一些关于模块处理的选项，比如加载器（loaders）和解析器（parsers）等。在这个例子中，定义了一个规则，对所有.ts文件使用ts-loader进行处理，但排除了node_modules文件夹。

rules: 是一个数组，其中的每个对象代表一个规则。在这个例子中，有一个规则，它告诉Webpack对所有.ts文件使用ts-loader，但不处理node_modules文件夹中的文件。

resolve: 定义了如何解析模块。在这个例子中，extensions选项告诉Webpack在尝试解析模块时，应该尝试这些扩展名。这意味着你可以在导入模块时省略这些扩展名。例如，你可以写import Foo from './foo'，而不是import Foo from './foo.ts'或import Foo from './foo.js'。
*/
module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};