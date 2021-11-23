/**
 *  工具方法,仅在调用时使用.
 *
 *  @author Jion
 */


import App from "./config";


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
        debugger;
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
            `<div id="ZD-Ext-word-error">
				<p>
					震惊,程序执行出现错误 X﹏X
				</p>
				<p id="ZD-Ext-word-error-value">${args.wordErrorValue}</p>
			</div>`;
        return temp;
    },
    // 单词
    getWordQuery: (args) => `<div id="ZD-Ext-word-query">${args.query}</div>`,
    // 音标
    getWordPhonetic: (args) => {
        return `<div id="ZD-Ext-word-basic">
			<p>
				<span>英</span>
				<span id="ZD-Ext-word-uk-phonetic">[${args.wordUkPhonetic}]</span>
				<span id="ZD-Ext-word-uk-speech" data-src="${args.wordUkSpeech}">
					<a class="ZD-Ext-a">
						<i class="icon-volume-medium"></i>
					</a>
				</span>
				<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
				<span>美</span>
				<span id="ZD-Ext-word-us-phonetic">[${args.wordUsPhonetic}]</span>
				<span id="ZD-Ext-word-us-speech" data-src="${args.wordUsSpeech}">
					<a class="ZD-Ext-a">
						<i class="icon-volume-medium"></i>
					</a>
				</span>
			</p>
		</div>`;
    },
    // 词释,数组字符串
    getWordExplains: (args) => {
        let temp =
            `<div id="ZD-Ext-word-explains">`;
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
            `<div id="ZD-Ext-word-translation">`;
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
        if (typeof str == 'string' && str.constructor == String) {
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
