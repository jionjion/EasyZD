// noinspection JSUnresolvedVariable

/**
 * 背景板,程序驻内存运行.作为后台任务处理
 *
 * @author Jion
 */

/* Google 导入语法,添加扩展JavaScript支持 */
try {
    importScripts('./config.min.js', './utility.min.js', './sha256.min.js');
} catch (e) {
    console.error("JS 导入失败, ", e);
}

/**
 * 调用API, 向后端发送请求
 *
 * @param {object} message 插件消息事件
 * @param {MediaQueryListEvent} sendResponse 谷歌浏览器内置对象...用来发送消息
 */
const requestApi = async (message, sendResponse) => {
    debugger;
    // 应用ID
    let appKey = getCustomizedPropertyValue('appKey');

    // 应用密钥
    let appSecretKey = getCustomizedPropertyValue('appSecretKey');

    // 请求地址
    let url = 'https://openapi.youdao.com/api';

    // UUID 时间戳 => sha256
    const salt = (new Date).getTime();
    // 当前时间
    const curtime = Math.round(new Date().getTime() / 1000);

    // 查询
    let queryWord = message['queryWord'];

    // 查询,源语言
    const from = 'auto';

    // 查询,目标语言 zh-CHS
    const to = 'auto';

    // var vocabId =  '您的用户词表ID';

    // 加密-明文
    let str1 = appKey + truncate(queryWord) + salt + curtime + appSecretKey;

    // 加密-密文
    // noinspection JSUnresolvedFunction
    let sign = sha256(str1);

    // 构建请求参数
    let translationData = {
        q: queryWord,
        from: from,
        to: to,
        appKey: appKey,
        salt: salt,
        sign: sign,
        signType: 'v3',
        curtime: curtime,
        //vocabId: vocabId
    };

    // 检查参数是否满足
    let errorMessage = assertTranslationData(translationData);
    if (Ext.isNotEmpty(errorMessage)) {
        let result = {errorCode: -1, wordErrorValue: errorMessage}
        // noinspection JSValidateTypes
        sendResponse(htmlBuilderFactory(message, result));
        return;
    }

    // 同步发送请求
    await fetch(url, {
        method: 'POST',  // 方式
        body: postDataFormat(translationData) // 数据
    })
        .then(response => response.json())
        .then(result => {
            // let responseJson = JSON.parse(result);
            // noinspection JSValidateTypes
            sendResponse(htmlBuilderFactory(message, result));
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

/**
 *  校验翻译对象数据是否符合要求
 *
 * @param {Object} translationData 翻译数据
 * @return {string} 校验信息
 */
const assertTranslationData = (translationData) => {
    if (Ext.isEmpty(translationData)) {
        return "参数错误!";
    } else if (Ext.isEmpty(translationData['q'])) {
        return "查询单词不能为空!";
    } else if (Ext.isEmpty(translationData['appKey'])) {
        return "应用ID不能为空!";
    } else if (Ext.isEmpty(translationData['sign'])) {
        return "摘要不能为空!";
    }
    return undefined;
}

// 截取字符串
const truncate = (q) => {
    const len = q.length;
    if (len <= 20) {
        return q;
    }
    return q.substring(0, 10) + len + q.substring(len - 10, len);
}

/**
 * 将POST请求的数据体格式化,对象类型
 *
 * @param {object} json 数据内容
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
    let source = message.source || '';
    let errorCode = responseJson.errorCode || "0";

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

/**
 * 错误页面
 *
 * @param {object} data 错误消息
 * @return {string} 错误的HTML页面
 */
const errorHtmlBuilder = (data) => {
    return AppTemplate.getYouDaoError(data);
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
    // 是否显示发音
    const enableDrawTranslationVoice = getCustomizedPropertyValue("enableDrawTranslationVoice");
    if (enableDrawTranslationVoice === 'Y') {
        // 音标, 在大段翻译时,不会有音标,但是有发音
        if (Ext.isNotEmpty(data['basic']) && Ext.isNotEmpty(data.basic['uk-phonetic']) && Ext.isNotEmpty(data.basic['us-phonetic'])) {
            popupHtml += AppTemplate.getWordPhonetic({
                wordUkPhonetic: data.basic['uk-phonetic'],
                wordUkSpeech: data.basic['uk-speech'],
                wordUsPhonetic: data.basic['us-phonetic'],
                wordUsSpeech: data.basic['us-speech']
            });
        }
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
    // 是否显示发音
    const enableDrawTranslationVoice = getCustomizedPropertyValue("enableDrawTranslationVoice");
    if (enableDrawTranslationVoice === 'Y') {
        // 音标, 在大段翻译时,不会有音标,但是有发音
        if (Ext.isNotEmpty(data.basic) && Ext.isNotEmpty(data.basic['uk-phonetic']) && Ext.isNotEmpty(data.basic['us-phonetic'])) {
            popupHtml += DrawTemplate.getWordPhonetic({
                wordUkPhonetic: data.basic['uk-phonetic'],
                wordUkSpeech: data.basic['uk-speech'],
                wordUsPhonetic: data.basic['us-phonetic'],
                wordUsSpeech: data.basic['us-speech']
            });
        }
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
    // 回调调用
    loadConfig().then(config => {
        // 如果停用了程序...
        if (config.enableDrawTranslation === 'Y') {
            // 调用API
            requestApi(message, sendResponse).then(data => console.log("构建请求响应内容....", data));
        } else {
            return sendResponse(errorHtmlBuilder("程序被禁用..."));
        }
    });

    // 默认返回值
    return true;
});