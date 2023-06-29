// noinspection JSUnresolvedVariable

/**
 *  鼠标弹窗,划词后显示.
 *
 *  @author Jion
 */

/**
 *  工具方法部分功能,拷贝
 */
const Ext = {
    isEmpty: (obj) => {
        if (typeof obj === 'string') {
            return obj.replace(/(^\s*)|(\s*$)/g, "").length === 0
        }
        // noinspection LoopStatementThatDoesntLoopJS
        for (let name in obj) {
            return false;
        }
        return true;
    },
    //
    isNotEmpty: (obj) => {
        return !(Ext.isEmpty(obj));
    },
    // 去除两端空格
    trim: (str) => {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
}

/**
 *  判断当前事件是否为误触事件, 避免多次调用翻译
 *
 * @param {Object} event 触发事件
 * @return {boolean} true 误触
 */
const assertFalseTrigger = async (event) => {
    // 配合的按键
    const drawTranslationSecondaryKey = await loadConfig().then(config => {
        return (config['drawTranslationSecondaryKey']);
    });

    // 判断是否为组合按键
    if ((drawTranslationSecondaryKey === 'Ctrl' && event.ctrlKey)) {
        return false;
    } else if (drawTranslationSecondaryKey === 'Alt' && event.altKey) {
        return false;
    } else {
        return (drawTranslationSecondaryKey !== 'None');
    }
}


/**
 * 划词处理, 鼠标弹起事件
 *
 * @param {Object} event 鼠标弹起事件
 */
const queryAtSelection = async (event) => {

    const [falseTrigger] = await Promise.all([assertFalseTrigger(event)]);
    if (falseTrigger) {
        return;
    }

    // 选择对象
    let selectionObj = window.getSelection();
    // 存在被选择的对象,或者选择的区域为0.  谷歌浏览器不允许使用ctrl多选
    if (Ext.isEmpty(selectionObj) || selectionObj.rangeCount === 0) {
        return
    }
    // 选择的文本
    let selectText = Ext.trim(selectionObj.toString());
    // var selectRange = selectionObj.getRangeAt(0).getBoundingClientRect();	// 选择的词的页面位置

    // 排除汉字,只翻译英语
    if (selectText === "" || !(/^[^\u4e00-\u9fa5]+$/.test(selectText))) {
        return;
    }

    // 发送消息,并执行回调
    // noinspection JSUnresolvedFunction
    chrome.runtime.sendMessage({
        source: "selection",
        queryWord: selectText
    }, buildResult);

}

/**
 * 查询结果的回调函数
 *
 * @param {string} response 响应 html 文本
 */
const buildResult = (response) => {
    // 之前存在,则删除   @TODO  改为工具方法
    let queryResultElementOld = document.getElementById("Easy-ZD-query-result");
    if (Ext.isNotEmpty(queryResultElementOld)) {
        // 删除
        document.documentElement.removeChild(queryResultElementOld);
    }

    let queryResultElement = document.createElement("div");
    queryResultElement.setAttribute("id", "Easy-ZD-query-result");
    queryResultElement.innerHTML = response;

    document.documentElement.appendChild(queryResultElement);

    // 8S后消失
    setTimeout(() => {
        // 重新获取,并删除
        let queryResultElementOld = document.getElementById("Easy-ZD-query-result");
        if (Ext.isNotEmpty(queryResultElementOld)) {
            // 删除
            document.documentElement.removeChild(queryResultElementOld);
        }
    }, 800000);

    // 绑定发音
    let $wordUkSpeech = document.querySelector("#Easy-ZD-word-uk-speech");
    if (Ext.isNotEmpty($wordUkSpeech)) {
        let src = $wordUkSpeech.getAttribute("data-src");
        let audioElement = document.createElement("audio");
        audioElement.setAttribute("id", "Easy-ZD-word-uk-speech-audio");
        audioElement.setAttribute("class", "Easy-ZD-audio")
        audioElement.setAttribute("src", src);
        $wordUkSpeech.appendChild(audioElement);
        audioElement.addEventListener("ended", function (event) {
            console.log("事件, ", event);
            document.querySelector("#Easy-ZD-word-uk-speech-audio").load();
        });
        $wordUkSpeech.addEventListener("click", (event) => {
            console.log("事件, ", event);
            document.querySelector("#Easy-ZD-word-uk-speech-audio").play();
        });
    }

    let $wordUsSpeech = document.querySelector("#Easy-ZD-word-us-speech");
    if (Ext.isNotEmpty($wordUsSpeech)) {
        let src = $wordUsSpeech.getAttribute("data-src");
        let audioElement = document.createElement("audio");
        audioElement.setAttribute("id", "Easy-ZD-word-us-speech-audio");
        audioElement.setAttribute("class", "Easy-ZD-audio");
        audioElement.setAttribute("src", src);
        $wordUsSpeech.appendChild(audioElement);
        audioElement.addEventListener("ended", function (event) {
            console.log("事件, ", event);
            document.querySelector("#Easy-ZD-word-us-speech-audio").load();
        });
        $wordUsSpeech.addEventListener("click", (event) => {
            console.log("事件, ", event);
            document.querySelector("#Easy-ZD-word-us-speech-audio").play();
        })
    }
}


(() => {

    /* 设置 */
    // let classNameCollection = [];

    /* 事件绑定,鼠标左键松下 */
    document.documentElement.addEventListener("mouseup", queryAtSelection);

})()

