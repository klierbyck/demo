const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    //提示错误在哪一行的工具插件
    devtool: "inline-source-map",
    //程序入口文件
    entry: "./src/index.js",
    /* 
    //多文件入口时
    entry: {
        app : [path.resolve(__dirname + "./src/index.js")],
        home : [path.resolve(__dirname + "./src/home.js")]
    },
    output: {
        path: path.resolve(__dirname + "/dist"),
        filename: "[name].bundle.js"
    },
    */
    //处理后输入文件
    output: {
        path: path.resolve(__dirname + "/dist"),
        filename: "bundle-[hash].js"
    },
    //服务器默认开启目录，文件更改会实时刷新页面
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,
        hot: true
    },
    //使用loader处理文件
    module: {
        //1.0为loaders
        rules: [
            //css模块化配置
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        }
                    ]
                })
                /*   use: [
                      {
                          loader: "style-loader"
                      }, 
                      {
                          loader: "css-loader",
                          options: {
                              modules: true
                          }
                      }
                  ] */
            },
            //less处理
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            //图片处理
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: ["file-loader"]
            },
            //es6
            {
                test: /(\.jsx|\.js)$/,
                //不解析文件目录
                exclude: /node_modules/,
                loader: 'babel-loader',
                //1.0为query
                options: {
                    //转换es代码及jsx代码
                    presets: ['es2015', 'react', 'stage-2']
                }
            }
        ]
    },
    plugins: [
        //自动生成html页面显示文件title
        new htmlWebpackPlugin({
            title: "新信息"
        }),
        new CleanWebpackPlugin(
            ['dist'],　 //匹配删除的文件
            {
                root: __dirname,//根目录
                verbose: true,//开启在控制台输出信息
                dry: false//启用删除文件
            }
        ),
        new extractTextPlugin({
            filename: 'focus.index.css'
        })
    ]
}
