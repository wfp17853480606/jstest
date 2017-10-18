export function saveToLocal(id,key,vue) {
	// 存储数据
	// 首先在localstorage里先添加一个，存储数据到localStorage中
	let seller = window.localStorage.__seller__
	// 如果说这个数据不存在
	if(!seller) {
		seller = {}
		seller[id] = {}
	} else {
		seller = JSON.parse(seller) //因为这里下方要判断seller对象下的id，所以要解析成json数组
		if(!seller[id]) {
			seller[id] = {}
		}
	}
	seller[id][key] = vue
	window.localStorage.__seller__ = JSON.stringify(seller) //因为存储要存储成字符格式
	
}