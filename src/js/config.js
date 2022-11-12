/**
 *  配置文件信息, 这里维护了默认值配置和用户自定义的配置
 *  如果存在用户自定义的配置, 则默认配置不启用
 *
 *  @author Jion
 */

/**
 * 自定义配置对象
 */
const DEFAULT_CONFIG = {
    /* appCodeKey */
    'appCodeKey': 'BED67B17E4FAED2F6545FEBA422B97BCD54D34EABB5993F1661EF9A2A2E8B904',
    /* 是否开启划词翻译 */
    'enableDrawTranslation': 'Y',
    /* 划词的配合快捷键 */
    'drawTranslationSecondaryKey': 'Alt',
    /* 默认发音 */
    'drawTranslationDefaultVoice': 'uk',
};

/**
 *  用户配置对象, 可以从 local-store 中读取
 */
let CUSTOMIZED_CONFIG = {
    /** 是否被重新配置 */
    "customized": false
}


/**
 *  获取配置文件. 如果没有, 则返回默认的配置文件
 *
 * @return {Promise<string>} 异步执行的对象
 */
const loadConfig = async () => {
    return new Promise((resolve, reject) => {
        try {
            // noinspection JSUnresolvedVariable
            chrome.storage.local.get(['customizedConfig'], function (result) {
                const config = result.customizedConfig;
                if (Ext.isNotEmpty(config)) {
                    console.log("加载用户自定义配置文件: " + JSON.parse(config));
                    resolve(JSON.parse(config));
                } else {
                    resolve(DEFAULT_CONFIG);
                }
            });
        } catch (err) {
            reject();
        }
    });
};

/**
 * 获得当前用户自定义的属性
 *
 * @param propertyName 属性名
 * @return {string} 属性值
 */
const getCustomizedPropertyValue = (propertyName) => {
    debugger;
    // 完成自定义..
    if (CUSTOMIZED_CONFIG.customized) {
        return CUSTOMIZED_CONFIG[propertyName];
    }
    // 否则返回空
    return "";
}

// 加载js后执行.. 加载用户自定义配置到变量中..
loadConfig().then((config) => {
    // 将当前用户自定义属性进行设置
    CUSTOMIZED_CONFIG.customized = true;
    Object.assign(CUSTOMIZED_CONFIG, config);
}).catch((err) => {
    console.error(err);
})