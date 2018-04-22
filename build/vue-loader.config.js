 module.exports = (isDev) => {
 	return {
 		preserveWhitespace: true, // 过滤空格
 		extractCSS: !isDev, // 抽离 vue 文件中的 css 
 		// hotReload: true, // 根据环境变量 热重载
 		// loaders: {}, // 指定 vue 文件解析对应的 loader
 		// preLoader: {},
 		// postLoader: {},
 		cssModules: { // 更改 className 配置  1: 好处命名空间冲突 2:可以重定义 className
 			// 更改 vue 文件中 class 名定义
 			localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
 			// 驼峰命名
 			camelCase: true
 		}
 		// extractCSS: process.env.NODE_ENV === 'production' // 抽离vue文件中的css
 	};
 };