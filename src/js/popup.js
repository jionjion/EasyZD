// noinspection JSUnresolvedVariable

/**
 *  弹窗页面,点击浏览器插件图标显示
 *
 *  @author Jion
 */

/*
 *	各种Dom元素对象
 */
let $body = document.querySelector('#Easy-ZD-body')
// noinspection JSUnusedGlobalSymbols
let $queryForm = document.querySelector("#Easy-ZD-query-form");
let $queryTxt = document.querySelector("#Easy-ZD-query-txt");
// noinspection JSUnusedGlobalSymbols
let $queryBtn = document.querySelector("#Easy-ZD-query-btn");
let $queryResult = document.querySelector("#Easy-ZD-query-result");
// noinspection JSUnusedGlobalSymbols
let $wordQuery = document.querySelector("#Easy-ZD-word-query");


// noinspection JSUnusedLocalSymbols
/**
 * 监听HTML元素中的输入动作
 *
 * @param {string} type 监听类型
 * @param {function} callback 匿名回调
 */
$queryTxt.addEventListener("input", (event) => {
    // @ts-ignore
    let currentInput = $queryTxt.value;
    // 延时0.6S后查询
    setTimeout(() => {
        // 存在查询结果
        // @ts-ignore
        if ($queryTxt.value === currentInput && Ext.isNotEmpty($queryTxt.value)) {
            // @ts-ignore
            queryAtPopup($queryTxt.value);
        }
    }, 600);
});


/**
 * 向后台查询
 *
 * @param {string} queryWord 要查询的单词
 */
const queryAtPopup = (queryWord) => {

    // 预设查询时,样式
    // if ($queryTxt.value !== "") {
    //     $queryResult.innerHTML = "划词君正在翻译...";
    // }

    if (Ext.isNotEmpty(queryWord)) {
        // @ts-ignore
        $queryTxt.value = queryWord;

        debugger;
        console.log(queryWord)

        // 发送消息,并执行回调
        // noinspection JSUnresolvedFunction
        chrome.runtime.sendMessage({
            source: "popup",
            queryWord: queryWord
        }, buildResult);
    }
}

/**
 * 查询结果的回调函数
 *
 * @param response
 */
const buildResult = (response) => {
    // 去掉背景图片
    $body.removeAttribute("class");

    // 绑定html
    $queryResult.innerHTML = response;
    // 绑定音频
    let $wordUkSpeech = document.querySelector("#word-uk-speech");
    if (Ext.isNotEmpty($wordUkSpeech)) {

        let src = $wordUkSpeech.getAttribute("data-src");
        let audioElement = document.createElement("audio");
        audioElement.setAttribute("id", "Easy-ZD-word-uk-speech-audio");
        audioElement.setAttribute("src", src);
        $wordUkSpeech.appendChild(audioElement);
        // noinspection JSUnusedLocalSymbols
        audioElement.addEventListener("ended", function (event) {
            // @ts-ignore
            document.querySelector("#word-uk-speech-audio").load();
        });
        // noinspection JSUnusedLocalSymbols
        $wordUkSpeech.addEventListener("click", (e) => {
            // @ts-ignore
            document.querySelector("#word-uk-speech-audio").play();
        });
    }

    let $wordUsSpeech = document.querySelector("#word-us-speech");
    if (Ext.isNotEmpty($wordUsSpeech)) {
        let src = $wordUsSpeech.getAttribute("data-src");
        let audioElement = document.createElement("audio");
        audioElement.setAttribute("id", "Easy-ZD-word-us-speech-audio");
        audioElement.setAttribute("src", src);
        $wordUsSpeech.appendChild(audioElement);
        // noinspection JSUnusedLocalSymbols
        audioElement.addEventListener("ended", function (event) {
            // @ts-ignore
            document.querySelector("#word-us-speech-audio").load();
        });
        // noinspection JSUnusedLocalSymbols
        $wordUsSpeech.addEventListener("click", (e) => {
            // @ts-ignore
            document.querySelector("#word-us-speech-audio").play();
        })
    }
}