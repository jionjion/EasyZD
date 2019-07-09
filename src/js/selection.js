/* 鼠标弹窗 */

(() => {

	/* 设置 */
	let classNameCollection = [];

	/* 划词处理 */
	const queryAtSelection = (event) => {

		// @TODO 根据设置的配合划词按键进行匹配
		// 如果不是alt键配合,不作触发
		if (!event.altKey) {
			return;
		}

		// 不进行划词的部分
		// for (var name in classNameCollection) {
		// 	if (event.target.classList.contains(classNameCollection[name])) {
		// 		return;
		// 	}
		// }

		// 选择对象
		let selectionObj = window.getSelection();
		// 存在被选择的对象,或者选择的区域为0.  谷歌浏览器不允许使用ctrl多选
		if (Ext.isEmpty(selectionObj) || selectionObj.rangeCount == 0) {
			return
		}
		// 选择的文本
		var selectText = Ext.trim(selectionObj.toString());
		// var selectRange = selectionObj.getRangeAt(0).getBoundingClientRect();	// 选择的词的页面位置
		
		// 排除汉字,只翻译英语
		if (selectText === "" || !(/^[^\u4e00-\u9fa5]+$/.test(selectText))) {
			return;
		}
		
		// 发送消息,并执行回调
		chrome.extension.sendMessage({
			source: "selection",
			queryWord: selectText
		}, buildResult);
		
	}

	/* 查询结果的回调函数 */
	const buildResult = (response) => {
		debugger;
		console.log(response);
		
		let queryResultElement = document.createElement("div");
		queryResultElement.setAttribute("id","query-result");
		queryResultElement.innerHTML = response;
		
		document.documentElement.appendChild(queryResultElement);
	}


	/* 事件绑定,鼠标左键松下 */
	document.documentElement.addEventListener("mouseup", queryAtSelection);

})()
