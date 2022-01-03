// noinspection JSUnresolvedVariable

/**
 *  鼠标弹窗,划词后显示.
 *
 *  @author Jion
 */

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
        debugger;
        // 发送消息,并执行回调
        // @ts-ignore
        chrome.runtime.sendMessage({
            source: "selection",
            queryWord: selectText
        }, buildResult);

    }

    /* 查询结果的回调函数 */
    const buildResult = (response) => {
        // 之前存在,则删除   @TODO  改为工具方法
        let queryResultElementOld = document.getElementById("Easy-ZD-query-result");
        if(Ext.isNotEmpty(queryResultElementOld)){
            // 删除
            document.documentElement.removeChild(queryResultElementOld);
        }

        let queryResultElement = document.createElement("div");
        queryResultElement.setAttribute("id","Easy-ZD-query-result");
        queryResultElement.innerHTML = response;

        document.documentElement.appendChild(queryResultElement);

        // 5S后消失
        let timeoutFn = setTimeout(()=>{
            // 重新获取,并删除
            let queryResultElementOld = document.getElementById("Easy-ZD-query-result");
            if(Ext.isNotEmpty(queryResultElementOld)){
                // 删除
                document.documentElement.removeChild(queryResultElementOld);
            }
        },5000);


        // 绑定发音
        let $wordUkSpeech = document.querySelector("#Easy-ZD-word-uk-speech");
        if(Ext.isNotEmpty($wordUkSpeech)){

            let src = $wordUkSpeech.getAttribute("data-src");
            let audioElement = document.createElement("audio");
            audioElement.setAttribute("id", "Easy-ZD-word-uk-speech-audio");
            audioElement.setAttribute("class","Easy-ZD-audio")
            audioElement.setAttribute("src", src);
            $wordUkSpeech.appendChild(audioElement);
            audioElement.addEventListener("ended", function (event) {
                // @ts-ignore
                document.querySelector("#Easy-ZD-word-uk-speech-audio").load();
            });
            $wordUkSpeech.addEventListener("click",(e)=>{
                // @ts-ignore
                document.querySelector("#Easy-ZD-word-uk-speech-audio").play();
            });
        }

        let $wordUsSpeech = document.querySelector("#Easy-ZD-word-us-speech");
        if(Ext.isNotEmpty($wordUsSpeech)){
            let src = $wordUsSpeech.getAttribute("data-src");
            let audioElement = document.createElement("audio");
            audioElement.setAttribute("id", "Easy-ZD-word-us-speech-audio");
            audioElement.setAttribute("src", src);
            $wordUsSpeech.appendChild(audioElement);
            audioElement.addEventListener("ended", function (event) {
                // @ts-ignore
                document.querySelector("#Easy-ZD-word-us-speech-audio").load();
            });
            $wordUsSpeech.addEventListener("click",(e)=>{
                // @ts-ignore
                document.querySelector("#Easy-ZD-word-us-speech-audio").play();
            })
        }
    }


    /* 事件绑定,鼠标左键松下 */
    document.documentElement.addEventListener("mouseup", queryAtSelection);


    /* 工具方法部分功能,拷贝 */
    const Ext={
        isEmpty: (obj) => {
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

})()
