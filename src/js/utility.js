/**
 *  工具方法,仅在调用时使用.
 *
 *  @author Jion
 */

// noinspection JSUnusedGlobalSymbols
/** App信息 */
const App = {
    // 应用名称
    appName: 'EasyZD'
}

/**
 *  有道错误消息返回枚举
 */
const YouDaoErrorEnum = {
    '101': '缺少必填的参数,首先确保必填参数齐全，然后确认参数书写是否正确。',
    '102': '不支持的语言类型',
    '103': '翻译文本过长',
    '104': '不支持的API类型',
    '105': '不支持的签名类型',
    '106': '不支持的响应类型',
    '107': '不支持的传输加密类型',
    '108': '应用ID无效，注册账号，登录后台创建应用并完成绑定，可获得应用ID和应用密钥等信息',
    '109': 'batchLog格式不正确',
    '110': '无相关服务的有效应用,应用没有绑定服务应用，可以新建服务应用。注：某些服务的翻译结果发音需要tts服务，需要在控制台创建语音合成服务绑定应用后方能使用。',
    '111': '开发者账号无效',
    '112': '请求服务无效',
    '113': 'q不能为空',
    '114': '不支持的图片传输方式',
    '116': 'strict字段取值无效，请参考文档填写正确参数值',
    '201': '解密失败，可能为DES,BASE64,URLDecode的错误',
    '202': '签名检验失败,如果确认应用ID和应用密钥的正确性，仍返回202，一般是编码问题。请确保翻译文本 q 为UTF-8编码.',
    '203': '访问IP地址不在可访问IP列表',
    '205': '请求的接口与应用的平台类型不一致，确保接入方式（Android SDK、IOS SDK、API）与创建的应用平台类型一致。如有疑问请参考入门指南',
    '206': '因为时间戳无效导致签名校验失败',
    '207': '重放请求',
    '301': '辞典查询失败',
    '302': '翻译查询失败',
    '303': '服务端的其它异常',
    '304': '会话闲置太久超时',
    '401': '账户已经欠费，请进行账户充值',
    '402': 'offline-sdk不可用',
    '411': '访问频率受限,请稍后访问',
    '412': '长请求过于频繁，请稍后访问',
    '1001': '无效的OCR类型',
    '1002': '不支持的OCR image类型',
    '1003': '不支持的OCR Language类型',
    '1004': '识别图片过大',
    '1201': '图片base64解密失败',
    '1301': 'OCR段落识别失败',
    '1411': '访问频率受限',
    '1412': '超过最大识别字节数',
    '2003': '不支持的语言识别Language类型',
    '2004': '合成字符过长',
    '2005': '不支持的音频文件类型',
    '2006': '不支持的发音类型',
    '2201': '解密失败',
    '2301': '服务的异常',
    '2411': '访问频率受限,请稍后访问',
    '2412': '超过最大请求字符数',
    '3001': '不支持的语音格式',
    '3002': '不支持的语音采样率',
    '3003': '不支持的语音声道',
    '3004': '不支持的语音上传类型',
    '3005': '不支持的语言类型',
    '3006': '不支持的识别类型',
    '3007': '识别音频文件过大',
    '3008': '识别音频时长过长',
    '3009': '不支持的音频文件类型',
    '3010': '不支持的发音类型',
    '3201': '解密失败',
    '3301': '语音识别失败',
    '3302': '语音翻译失败',
    '3303': '服务的异常',
    '3411': '访问频率受限,请稍后访问',
    '3412': '超过最大请求字符数',
    '4001': '不支持的语音识别格式',
    '4002': '不支持的语音识别采样率',
    '4003': '不支持的语音识别声道',
    '4004': '不支持的语音上传类型',
    '4005': '不支持的语言类型',
    '4006': '识别音频文件过大',
    '4007': '识别音频时长过长',
    '4201': '解密失败',
    '4301': '语音识别失败',
    '4303': '服务的异常',
    '4411': '访问频率受限,请稍后访问',
    '4412': '超过最大请求时长',
    '5001': '无效的OCR类型',
    '5002': '不支持的OCR image类型',
    '5003': '不支持的语言类型',
    '5004': '识别图片过大',
    '5005': '不支持的图片类型',
    '5006': '文件为空',
    '5201': '解密错误，图片base64解密失败',
    '5301': 'OCR段落识别失败',
    '5411': '访问频率受限',
    '5412': '超过最大识别流量',
    '9001': '不支持的语音格式',
    '9002': '不支持的语音采样率',
    '9003': '不支持的语音声道',
    '9004': '不支持的语音上传类型',
    '9005': '不支持的语音识别 Language类型',
    '9301': 'ASR识别失败',
    '9303': '服务器内部错误',
    '9411': '访问频率受限（超过最大调用次数）',
    '9412': '超过最大处理语音长度',
    '10001': '无效的OCR类型',
    '10002': '不支持的OCR image类型',
    '10004': '识别图片过大',
    '10201': '图片base64解密失败',
    '10301': 'OCR段落识别失败',
    '10411': '访问频率受限',
    '10412': '超过最大识别流量',
    '11001': '不支持的语音识别格式',
    '11002': '不支持的语音识别采样率',
    '11003': '不支持的语音识别声道',
    '11004': '不支持的语音上传类型',
    '11005': '不支持的语言类型',
    '11006': '识别音频文件过大',
    '11007': '识别音频时长过长，最大支持30s',
    '11201': '解密失败',
    '11301': '语音识别失败',
    '11303': '服务的异常',
    '11411': '访问频率受限,请稍后访问',
    '11412': '超过最大请求时长',
    '12001': '图片尺寸过大',
    '12002': '图片base64解密失败',
    '12003': '引擎服务器返回错误',
    '12004': '图片为空',
    '12005': '不支持的识别图片类型',
    '12006': '图片无匹配结果',
    '13001': '不支持的角度类型',
    '13002': '不支持的文件类型',
    '13003': '表格识别图片过大',
    '13004': '文件为空',
    '13301': '表格识别失败',
    '15001': '需要图片',
    '15002': '图片过大（1M）',
    '15003': '服务调用失败',
    '17001': '需要图片',
    '17002': '图片过大（1M）',
    '17003': '识别类型未找到',
    '17004': '不支持的识别类型',
    '17005': '服务调用失败'
}

/**
 *  翻译有道返回消息内容
 *
 * @param args 错误内容
 * @return {string} 消息内容
 */
function translateYouDaoMessage(args) {
    if (Ext.isNotEmpty(args)) {
        let errorCode = args['errorCode'];
        if (Ext.isNotEmpty(errorCode)) {
            let errorMessage = YouDaoErrorEnum[errorCode];
            if (errorMessage) {
                return errorMessage;
            }
        }
        return args['wordErrorValue'];
    }
    return "";
}

/* 通过模板 */
const BaseTemplate = {
    // 错误页面提示
    getWordError: (args) => {
        return `<div id="Easy-ZD-word-error">
				<p>
					震惊, o(≧口≦)o
				</p>
				<p id="Easy-ZD-word-error-value">${args.wordErrorValue}</p>
			</div>`;
    },

    // 词释,数组字符串
    getWordExplains: (args) => {
        let temp =
            `<div id="Easy-ZD-word-explains">`;
        for (let arg of args) {
            // 不一定会有词性前缀,如 n. adj. adv.
            if (arg.indexOf('.') >= 0) {
                temp += `<p><span>` + arg.split('.')[0] + '.' + `</span>&nbsp;<span>` + arg.split('.')[1] + `</span></p>`
            } else {
                temp += `<p>` + arg + `</p>`
            }
        }
        temp += `</div>`;
        return temp;
    }
}

/* 模板对象,提供字符串模板,点击图标进行渲染 */
const AppTemplate = {
    // 处理有道翻译的
    getYouDaoError: (args) => {
        debugger;
        let message = translateYouDaoMessage(args);
        return BaseTemplate.getWordError({wordErrorValue: message});
    },
    // 单词
    getWordQuery: (args) => `<div id="Easy-ZD-word-query">${args.query}</div>`,
    // 音标
    getWordPhonetic: (args) => {
        return `<div id="Easy-ZD-word-basic">
			<p>
				<span>英</span>
				<span id="Easy-ZD-word-uk-phonetic">[${args.wordUkPhonetic}]</span>
				<span id="Easy-ZD-word-uk-speech" data-src="${args.wordUkSpeech}"><a><i class="icon-volume-medium"></i></a></span>
				<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<span>美</span>
				<span id="Easy-ZD-word-us-phonetic">[${args.wordUsPhonetic}]</span>
				<span id="Easy-ZD-word-us-speech" data-src="${args.wordUsSpeech}"><a><i class="icon-volume-medium"></i></a></span>
			</p>
		</div>`;
    },
    // 词释,数组字符串
    getWordExplains: (args) => {
        return BaseTemplate.getWordExplains(args);
    },
    // 翻译,数组字符串
    getWordTranslation: (args) => {
        debugger;
        let temp =
            `<div id="Easy-ZD-word-translation">`;
        for (let i in args) {
            temp += `<p>${args[i]}</p>`;
        }
        temp += `</div>`;
        return temp;
    },
    // 词释扩展,数组对象
    getWordWfs: (args) => {
        let temp =
            `<div id="Easy-ZD-word-wfs">` +
            `<p><span>扩展</span>&nbsp;`;
        for (let arg of args) {
            temp +=
                `<span class="Easy-ZD-word-wf">
				<span>${arg['wf']['name']}</span>
				<span>${arg['wf']['value']}</span>
				<span>;</span>
			</span>`;
        }
        temp += `</p></div>`;
        return temp;
    },
    // 网络词义,对象数组
    getWordWeb: (args) => {
        let temp =
            `<div id="Easy-ZD-word-web">
			<hr />
			<p>网络词义</p>`;
        for (let i in args) {
            temp +=
                `<p>` +
                `<span>${parseInt(i) + 1}.</span>` +
                `<span>${args[i].key}</span>` +
                `<span>${args[i].value.toString()}</span>` +
                `</p>`;
        }
        temp += `</div>`;
        return temp
    }
}

/* 模板对象,划词时使用 Draw */
const DrawTemplate = {
    // 单词
    getWordQuery: (args) => `<div id="Easy-ZD-word-query">${args.query}</div>`,
    // 音标
    getWordPhonetic: (args) => {
        return `<div id="Easy-ZD-word-basic">
			<p>
				<span>英</span>
				<span id="Easy-ZD-word-uk-phonetic">[${args.wordUkPhonetic}]</span>
				<span id="Easy-ZD-word-uk-speech" data-src="${args.wordUkSpeech}">
					<a class="Easy-ZD-a">
						<i class="icon-volume-medium"></i>
					</a>
				</span>
				<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<span>美</span>
				<span id="Easy-ZD-word-us-phonetic">[${args.wordUsPhonetic}]</span>
				<span id="Easy-ZD-word-us-speech" data-src="${args.wordUsSpeech}">
					<a class="Easy-ZD-a">
						<i class="icon-volume-medium"></i>
					</a>
				</span>
			</p>
		</div>`;
    },
    // 词释,数组字符串
    getWordExplains: (args) => {
        return BaseTemplate.getWordExplains(args);
    },

    // 翻译,数组字符串
    getWordTranslation: (args) => {
        let temp =
            `<div id="Easy-ZD-word-translation">`;
        for (let i in args) {
            temp += `<p>${args[i]}</p>`;
        }
        temp += `</div>`;
        return temp;
    }
}


/* 工具方法对象 */
const Ext = {
    /**
     * 判断一个初始化后的对象是否为空或空串: true为空, false不为空
     *
     * @param {any} obj 判断对象
     * @return {boolean} 是否为空: true为空, false不为空
     */
    isEmpty: (obj) => {
        // 字符串类型
        if (typeof obj === 'string') {
            return obj.replace(/(^\s*)|(\s*$)/g, "").length === 0
        }

        // object 等其他类型判断
        // noinspection LoopStatementThatDoesntLoopJS
        for (let name in obj) {
            return false;
        }
        return true;
    },

    /**
     *  判断一个初始化后的对象是否不为空或不为空串: true不为空, false为空
     *
     * @param {any} obj 判断对象
     * @return {boolean} 是否不为空: true不为空, false为空
     */
    isNotEmpty: (obj) => {
        return !(Ext.isEmpty(obj));
    },

    /**
     * 去除两端空格
     *
     * @param {string} str 来源字符串
     * @return {string} 去除空格后的字符串
     */
    trim: (str) => {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
}