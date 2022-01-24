// noinspection JSUnresolvedVariable

/**
 *  背景板,程序驻内存运行.作为后台任务处理
 *
 *  @author Jion
 */

/* Google 导入语法,添加扩展JavaScript支持 */
try {
    importScripts('./utility.min.js', './sha256.min.js');
} catch (e) {
    console.error(e);
}

/** 调用API */
const requestApi = async (message, sendResponse) => {

    let appKey = App.appKey;
    let appSecretKey = App.appSecretKey;

    // UUID 时间戳 => sha256
    let salt = new Date().getTime();
    // 当前时间
    let curtime = Math.round(new Date().getTime() / 1000);

    // 查询
    let query = message.queryWord;

    // 查询,源语言
    let from = 'auto';
    // 查询,目标语言
    let to = 'auto'; //'zh-CHS';
    // 加密-明文
    let str1 = appKey + getInput(query) + salt + curtime + appSecretKey;

    // 加密-密文
    // noinspection JSUnresolvedFunction
    let sign = sha256(str1);
    let data = {
        q: query, from: from, to: to, appKey: appKey, salt: salt, sign: sign, signType: 'v3', curtime: curtime
    };
    let url = "https://openapi.youdao.com/api";

    await fetch(url, {
        method: 'POST', body: postDataFormat(data)
    })
        .then(response => response.json())
        .then(result => {
            // let responseJson = JSON.parse(result);
            sendResponse(htmlBuilderFactory(message, result));
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/** 调用API方法:截取输入文本,API要求加密时,查询内容最多输入 20 字符 */
const getInput = (input) => {
    if (input.length === 0) {
        return null;
    }
    let result;
    let len = input.length;
    if (len <= 20) {
        result = input;
    } else {
        let startStr = input.substring(0, 10);
        let endStr = input.substring(len - 10, len);
        result = startStr + len + endStr;
    }
    return result;
}

/* 将POST请求的数据体格式化,对象类型 */
const postDataFormat = (obj) => {
    let data = new FormData();
    for (let attr in obj) {
        data.append(attr, obj[attr]);
    }
    return data;
}

/* 根据来源,选择不同的渲染函数.如果失败,返回失败情况 */
const htmlBuilderFactory = (message, responseJson) => {
    debugger;
    console.log(responseJson);
    let source = message.source || '';
    let errorCode = responseJson.errorCode || "0";

    // @TODO 错误信息,返回错误信息页面
    if (errorCode !== "0") {
        return errorHtmlBuilder(responseJson);
    } else if (source === "popup") {
        return popupHtmlBuilder(responseJson);
    } else if (source === "selection") {
        return selectionHtmlBuilder(responseJson);
    } else {
        return '';
    }
}

/* 错误页面 */
const errorHtmlBuilder = (obj) => {
    let errorCode = obj.errorCode;
    let errorValue = Ext.getAppErrorCodeValue(errorCode);
    return AppTemplate.getWordError({wordErrorValue: errorValue});
}

/* 在popup页面中正确的查询结果 */
const popupHtmlBuilder = (obj) => {
    debugger;
    // 渲染
    let popupHtml = '';

    // 单词
    if (Ext.isNotEmpty(obj.query)) {
        popupHtml += AppTemplate.getWordQuery({query: obj.query});
    }
    // 音标, 在大段翻译时,不会有音标,但是有发音
    if (Ext.isNotEmpty(obj['basic']) && Ext.isNotEmpty(obj.basic['uk-phonetic']) && Ext.isNotEmpty(obj.basic['us-phonetic'])) {
        popupHtml += AppTemplate.getWordPhonetic({
            wordUkPhonetic: obj.basic['uk-phonetic'],
            wordUkSpeech: obj.basic['uk-speech'],
            wordUsPhonetic: obj.basic['us-phonetic'],
            wordUsSpeech: obj.basic['us-speech']
        });
    }
    // 大段翻译,优先级低于词释
    if (Ext.isNotEmpty(obj.translation) && Ext.isEmpty(obj.basic)) {
        popupHtml += AppTemplate.getWordTranslation({translation: obj.translation});
    }
    // 词释
    if (Ext.isNotEmpty(obj.basic) && Ext.isNotEmpty(obj.basic.explains)) {
        popupHtml += AppTemplate.getWordExplains(obj.basic.explains);
    }
    // 词释扩展,变形
    if (Ext.isNotEmpty(obj.basic) && Ext.isNotEmpty(obj.basic.wfs)) {
        popupHtml += AppTemplate.getWordWfs(obj.basic.wfs);
    }
    // 网络词义
    if (Ext.isNotEmpty(obj.web)) {
        popupHtml += AppTemplate.getWordWeb(obj.web);
    }
    return popupHtml;
}

/** 在selection页面中正确的查询结果 */
const selectionHtmlBuilder = (obj) => {
    debugger;
    // 渲染
    let popupHtml = '';

    // 单词
    if (Ext.isNotEmpty(obj.query)) {
        popupHtml += DrawTemplate.getWordQuery({query: obj.query});
    }
    // 音标, 在大段翻译时,不会有音标,但是有发音
    if (Ext.isNotEmpty(obj.basic) && Ext.isNotEmpty(obj.basic['uk-phonetic']) && Ext.isNotEmpty(obj.basic['us-phonetic'])) {
        popupHtml += DrawTemplate.getWordPhonetic({
            wordUkPhonetic: obj.basic['uk-phonetic'],
            wordUkSpeech: obj.basic['uk-speech'],
            wordUsPhonetic: obj.basic['us-phonetic'],
            wordUsSpeech: obj.basic['us-speech']
        });
    }
    // 大段翻译,优先级低于词释
    if (Ext.isNotEmpty(obj.translation) && Ext.isEmpty(obj.basic)) {
        popupHtml += DrawTemplate.getWordTranslation({translation: obj.translation});
    }
    // 词释
    if (Ext.isNotEmpty(obj.basic) && Ext.isNotEmpty(obj.basic.explains)) {
        popupHtml += DrawTemplate.getWordExplains(obj.basic.explains);
    }
    return popupHtml;
}

/** 监听请求 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    debugger;
    // 调用API
    requestApi(message, sendResponse).then(data => console.log("这是....{}", data));

    return true;
});