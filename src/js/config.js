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
    /* 应用ID的唯一ID */
    appKey: "",
    /* 应用密钥 */
    appSecretKey: "",
    /* 是否开启划词翻译 */
    enableDrawTranslation: 'Y',
    /* 划词的配合快捷键 */
    drawTranslationSecondaryKey: 'Alt',
    /* 默认发音 */
    drawTranslationDefaultVoice: 'uk',
    /** 是否被重新配置 */
    "customized": false
};

/**
 *  用户配置对象, 可以从 local-store 中读取
 */
let CUSTOMIZED_CONFIG = {

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
                if (Ext.isNotEmpty(result.customizedConfig)) {
                    let config = JSON.parse(result.customizedConfig);
                    console.log("加载用户自定义配置文件: " + config);
                    config.customized = true;
                    resolve(config);
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

/**
 *  重新加载配置文件
 */
const reloadConfig = () =>{
    loadConfig().then((config) => {
        Object.assign(CUSTOMIZED_CONFIG, config);
    }).catch((err) => {
        console.error(err);
    })
}

// 加载js后执行.. 加载用户自定义配置到变量中..
reloadConfig()