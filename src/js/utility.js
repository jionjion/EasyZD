/**
 *  工具方法,仅在调用时使用.
 *
 *  @author Jion
 */


/* App信息 */
const App = {
    // 应用ID
    appKey: "1666f504b10dfd2c",
    // 应用秘钥
    appSecretKey: "gKzoqWsuGtU3efU4qUlWoR2knV1Q4LST",
    // 应用名称
    appName: "EasyZD",
    // 错误信息
    appErrorInfo: [{
        code: "0",
        value: "成功"
    }, {
        code: 101,
        value: "缺少必填的参数，出现这个情况还可能是et的值和实际加密方式不对应"
    }, {
        code: 102,
        value: "不支持的语言类型"
    }, {
        code: 103,
        value: "翻译文本过长"
    }, {
        code: 104,
        value: "不支持的API类型"
    }, {
        code: 105,
        value: "不支持的签名类型"
    }, {
        code: 106,
        value: "不支持的响应类型"
    }, {
        code: 107,
        value: "不支持的传输加密类型"
    }, {
        code: 108,
        value: "appKey无效，注册账号， 登录后台创建应用和实例并完成绑定， 可获得应用ID和密钥等信息，其中应用ID就是appKey（ 注意不是应用密钥"
    }, {
        code: 109,
        value: "batchLog格式不正确"
    }, {
        code: 110,
        value: "无相关服务的有效实例"
    }, {
        code: 111,
        value: "开发者账号无效"
    }, {
        code: 113,
        value: "查询内容q不能为空"
    }, {
        code: 201,
        value: "解密失败，可能为DES,BASE64,URLDecode的错误"
    }, {
        code: 202,
        value: "签名检验失败"
    }, {
        code: 203,
        value: "访问IP地址不在可访问IP列表"
    }, {
        code: 205,
        value: "请求的接口与应用的平台类型不一致，如有疑问请参考[入门指南]()"
    }, {
        code: 206,
        value: "因为时间戳无效导致签名校验失败"
    }, {
        code: 207,
        value: "重放请求"
    }, {
        code: 301,
        value: "辞典查询失败"
    }, {
        code: 302,
        value: "翻译查询失败"
    }, {
        code: 303,
        value: "服务端的其它异常"
    }, {
        code: 401,
        value: "账户已经欠费停"
    }, {
        code: 411,
        value: "访问频率受限,请稍后访问"
    }, {
        code: 412,
        value: "长请求过于频繁，请稍后访问"
    }]
}


/* 模板对象,提供字符串模板 */
const AppTemplate = {
    // 错误页面提示
    getWordError: (args) => {
        return `<div id="word-error">
				<p>
					震惊,程序执行出现错误 X﹏X
				</p>
				<p id="word-error-value">${args.wordErrorValue}</p>
			</div>`;
    },
    // 单词
    getWordQuery: (args) => `<div id="word-query">${args.query}</div>`,
    // 音标
    getWordPhonetic: (args) => {
        return `<div id="word-basic">
			<p>
				<span>英</span>
				<span id="word-uk-phonetic">[${args.wordUkPhonetic}]</span>
				<span id="word-uk-speech" data-src="${args.wordUkSpeech}"><a><i class="icon-volume-medium"></i></a></span>
				<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<span>美</span>
				<span id="word-us-phonetic">[${args.wordUsPhonetic}]</span>
				<span id="word-us-speech" data-src="${args.wordUsSpeech}"><a><i class="icon-volume-medium"></i></a></span>
			</p>
		</div>`;
    },
    // 词释,数组字符串
    getWordExplains: (args) => {
        let temp =
            `<div id="word-explains">`;
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
    },
    // 翻译,数组字符串
    getWordTranslation: (args) => {
        let temp =
			`<div id="word-translation">`;
		for (let i in args) {
			temp += `<p>${args[i]}</p>`;
		}
		temp += `</div>`;
		return temp;
	},
	// 词释扩展,数组对象
	getWordWfs: (args) => {
		let temp =
			`<div id="word-wfs">` +
			`<p><span>扩展</span>&nbsp;`;
		for (let arg of args) {
			temp +=
				`<span class="word-wf">
				<span>${arg.wf.name}</span>
				<span>${arg.wf.value}</span>
				<span>;</span>
			</span>`;
        }
        temp += `</p></div>`;
        return temp;
    },
    // 网络词义,对象数组
    getWordWeb: (args) => {
        let temp =
            `<div id="word-web">
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
    // 错误页面提示
    getWordError: (args) => {
        let temp =
            `<div id="Easy-ZD-word-error">
				<p>
					震惊,程序执行出现错误 X﹏X
				</p>
				<p id="Easy-ZD-word-error-value">${args.wordErrorValue}</p>
			</div>`;
        return temp;
    },
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
    // 判断一个初始化后的对象是否为空: true 为空,false不为空
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
    },
    // 只将字符串进行SHA256加密
    sha256Encode: (str) => {
        if (typeof str == 'string' && str.constructor === String) {
            return sha256(Ext.trim(str));
        }
        return null;
    },
    // 获得接口的错误信息
    getAppErrorCodeValue: (code) => {
        for (let err of App.appErrorInfo) {
            if (err.code === code) {
                return err.value
            }
        }
    }
}
