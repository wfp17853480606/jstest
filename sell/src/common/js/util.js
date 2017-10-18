export function urlParse() {
	// 首先获取网址
	let url = window.location.search
	// 定义一个对象，因为等会我们要返回一个对象
	let obj = {}
	// 定义一个正则
	let reg = /[?&][^?&]+=[^?&]+/g
	let arr = url.match(reg) // 匹配返回  ["?id=112", "&name=223"]
	arr.forEach((item) => {
		let tempArr = item.substring(1).split('=')
		let key = decodeURIComponent(tempArr[0])
		let vue = decodeURIComponent(tempArr[1]) // decodeURIComponent() 函数可对 dencodeURIComponent() 函数编码的 URI 进行解码。
		obj[key] = vue
	})
	return obj
}
