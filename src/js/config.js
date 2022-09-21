/**
 *  配置文件信息
 *
 *  @author Jion
 */

/**
 * 配置对象
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