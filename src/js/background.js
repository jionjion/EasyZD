// noinspection JSUnresolvedVariable

/**
 * 背景板,程序驻内存运行.作为后台任务处理
 *
 * @author Jion
 */

/* Google 导入语法,添加扩展JavaScript支持 */
try {
    importScripts('./utility.min.js', './sha256.min.js');
} catch (e) {
    console.error(e);
}

/**
 * 调用API, 向后端发送请求
 *
 * @param {object} message 插件消息事件
 * @param {MediaQueryListEvent} sendResponse 谷歌浏览器内置对象...用来发送消息
 */
const requestApi = async (message, sendResponse) => {
    // 认证
    let appCode = App.appCode;

    // 查询
    let queryWord = message['queryWord'];

    let url = App.url;

    // Form 表单数据
    let data = {
        word: queryWord
    };

    console.log(data);
    // 同步请求
    await fetch(url, {
        method: 'POST',
        headers: {'Authorization': 'Appcode ' + appCode},
        body: postDataFormat(data)
    })
        .then(response => response.json())
        .then(result => {
            // noinspection JSValidateTypes
            sendResponse(htmlBuilderFactory(message, result));
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/**
 * 将POST请求的数据体格式化,对象类型
 *
 * @param {JSON} json 数据内容
 * @return {FormData} Form表单的数据
 */
const postDataFormat = (json) => {
    let data = new FormData();
    for (let attr in json) {
        data.append(attr, json[attr]);
    }
    return data;
}

/**
 * 工厂方法, 根据不同的查询来源,去响应生成不同的html页面
 * 根据来源,选择不同的渲染函数.如果失败,返回失败情况
 *
 * @param message 插件消息事件
 * @param responseJson 响应内容
 * @return {string} 生成的HTML页面
 */
const htmlBuilderFactory = (message, responseJson) => {
    debugger;
    console.log(responseJson);
    if (responseJson.status === 'success') {
        let content = responseJson.result.content;
        let source = message.source || '';
        if (source === "popup") {
            return popupHtmlBuilder(content);
        } else if (source === "selection") {
            return selectionHtmlBuilder(content);
        } else {
            return '';
        }
    } else if (responseJson.status === 'error') {
        return errorHtmlBuilder(responseJson['message']);
    }

    return '';
}

/**
 * 错误页面
 *
 * @param {string} message 错误消息
 * @return {string} 错误的HTML页面
 */
const errorHtmlBuilder = (message) => {
    return AppTemplate.getWordError({wordErrorValue: message});
}

/**
 * 在popup页面中正确的查询结果
 *
 * @param {object} data 响应的翻译结果的json报文体
 * @return {string} popup功能的弹出的HTML页面
 */
const popupHtmlBuilder = (data) => {
    debugger;
    // 渲染
    let popupHtml = '';

    // 单词
    if (Ext.isNotEmpty(data.query)) {
        popupHtml += AppTemplate.getWordQuery({query: data.query});
    }
    // 音标, 在大段翻译时,不会有音标,但是有发音
    if (Ext.isNotEmpty(data['basic']) && Ext.isNotEmpty(data.basic['uk-phonetic']) && Ext.isNotEmpty(data.basic['us-phonetic'])) {
        popupHtml += AppTemplate.getWordPhonetic({
            wordUkPhonetic: data.basic['uk-phonetic'],
            wordUkSpeech: data.basic['uk-speech'],
            wordUsPhonetic: data.basic['us-phonetic'],
            wordUsSpeech: data.basic['us-speech']
        });
    }
    // 大段翻译,优先级低于词释
    if (Ext.isNotEmpty(data.translation) && Ext.isEmpty(data.basic)) {
        popupHtml += AppTemplate.getWordTranslation({translation: data.translation});
    }
    // 词释
    if (Ext.isNotEmpty(data.basic) && Ext.isNotEmpty(data.basic.explains)) {
        popupHtml += AppTemplate.getWordExplains(data.basic.explains);
    }
    // 词释扩展,变形
    if (Ext.isNotEmpty(data.basic) && Ext.isNotEmpty(data.basic.wfs)) {
        popupHtml += AppTemplate.getWordWfs(data.basic.wfs);
    }
    // 网络词义
    if (Ext.isNotEmpty(data.web)) {
        popupHtml += AppTemplate.getWordWeb(data.web);
    }
    return popupHtml;
}

/**
 * 在selection页面中正确的查询结果
 *
 * @param {object} data 响应的翻译结果的json报文体
 * @return {string} selection功能的弹出的HTML页面
 */
const selectionHtmlBuilder = (data) => {
    debugger;
    // 渲染
    let popupHtml = '';

    // 单词
    if (Ext.isNotEmpty(data.query)) {
        popupHtml += DrawTemplate.getWordQuery({query: data.query});
    }
    // 音标, 在大段翻译时,不会有音标,但是有发音
    if (Ext.isNotEmpty(data.basic) && Ext.isNotEmpty(data.basic['uk-phonetic']) && Ext.isNotEmpty(data.basic['us-phonetic'])) {
        popupHtml += DrawTemplate.getWordPhonetic({
            wordUkPhonetic: data.basic['uk-phonetic'],
            wordUkSpeech: data.basic['uk-speech'],
            wordUsPhonetic: data.basic['us-phonetic'],
            wordUsSpeech: data.basic['us-speech']
        });
    }
    // 大段翻译,优先级低于词释
    if (Ext.isNotEmpty(data.translation) && Ext.isEmpty(data.basic)) {
        popupHtml += DrawTemplate.getWordTranslation({translation: data.translation});
    }
    // 词释
    if (Ext.isNotEmpty(data.basic) && Ext.isNotEmpty(data.basic.explains)) {
        popupHtml += DrawTemplate.getWordExplains(data.basic.explains);
    }
    return popupHtml;
}

// noinspection JSCheckFunctionSignatures,JSDeprecatedSymbols

/**
 * 监听请求
 *
 * @param {MediaQueryListEvent} message 谷歌浏览器内置对象...发送的消息内容
 * @param {MediaQueryList}  sender 谷歌浏览器内置对象...发送的具体窗口ID
 * @param {Object} sendResponse 谷歌浏览器内置对象...用来发送消息
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    debugger;
    // 调用API
    requestApi(message, sendResponse).then(data => console.log("这是....{}", data));

    return true;
});