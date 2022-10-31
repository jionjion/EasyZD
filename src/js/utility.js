/**
 *  工具方法,仅在调用时使用.
 *
 *  @author Jion
 */

// noinspection SpellCheckingInspection
/** App信息 */
const App = {
    // 认证 appCode
    appCode: "BED67B17E4FAED2F6545FEBA422B97BCD54D34EABB5993F1661EF9A2A2E8B904",
    // 应用ID的唯一ID
    appKey: "1666f504b10dfd2c",
    // 应用密钥
    appSecretKey:"gKzoqWsuGtU3efU4qUlWoR2knV1Q4LST",
    // 应用名称
    appName: "EasyZD",
    // 请求 url
    url: "https://openapi.youdao.com/api"
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
    // 错误页面提示
    getWordError: (args) => {
        return BaseTemplate.getWordError(args);
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