// noinspection JSUnresolvedVariable

/**
 *  弹窗页面,点击浏览器插件图标显示
 *
 *  @author Jion
 */

/*
 *	各种Dom元素对象
 */
let $queryForm = document.querySelector("#query-form");
let $queryTxt = document.querySelector("#query-txt");
let $queryBtn = document.querySelector("#query-btn");
let $queryResult = document.querySelector("#query-result");
let $wordQuery = document.querySelector("#word-query");


/** 监听输入动作. */
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


/** 向后台查询 */
const queryAtPopup = (queryWord) => {

    // 预设查询时,样式
    // if ($queryTxt.value !== "") {
    //     $queryResult.innerHTML = "ψ(._. )>词典君正在翻译。。。";
    // }

    if (Ext.isNotEmpty(queryWord)) {
        // @ts-ignore
        $queryTxt.value = queryWord;

        debugger;
        console.log(queryWord)

        // 发送消息,并执行回调
        chrome.runtime.sendMessage({
            source: "popup",
            queryWord: queryWord
        }, buildResult);
    }
}

/* 查询结果的回调函数 */
const buildResult = (response) => {
    // 绑定html
    $queryResult.innerHTML = response;
    // 绑定音频
    let $wordUkSpeech = document.querySelector("#word-uk-speech");
    if (Ext.isNotEmpty($wordUkSpeech)) {

        let src = $wordUkSpeech.getAttribute("data-src");
        let audioElement = document.createElement("audio");
        audioElement.setAttribute("id", "word-uk-speech-audio");
        audioElement.setAttribute("src", src);
        $wordUkSpeech.appendChild(audioElement);
        audioElement.addEventListener("ended", function (event) {
            // @ts-ignore
            document.querySelector("#word-uk-speech-audio").load();
        });
        $wordUkSpeech.addEventListener("click", (e) => {
            // @ts-ignore
            document.querySelector("#word-uk-speech-audio").play();
        });
    }

    let $wordUsSpeech = document.querySelector("#word-us-speech");
    if (Ext.isNotEmpty($wordUsSpeech)) {
        let src = $wordUsSpeech.getAttribute("data-src");
        let audioElement = document.createElement("audio");
        audioElement.setAttribute("id", "word-us-speech-audio");
        audioElement.setAttribute("src", src);
        $wordUsSpeech.appendChild(audioElement);
        audioElement.addEventListener("ended", function (event) {
            // @ts-ignore
            document.querySelector("#word-us-speech-audio").load();
        });
        $wordUsSpeech.addEventListener("click", (e) => {
            // @ts-ignore
            document.querySelector("#word-us-speech-audio").play();
        })
    }
}