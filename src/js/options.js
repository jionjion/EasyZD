// noinspection JSUnresolvedVariable

/**
 *  设置界面.用户自定义配置.
 *
 *  @author Jion
 */

/*
 *	各种Dom元素对象
 */
let $buttonSettingSave = document.querySelector("#setting-save-btn");
let $textInputAppKey = document.querySelector("#app_key");
let $textInputAppSecretKey = document.querySelector("#app_secret_key");
let $checkedInputEnableDrawTranslation = document.querySelector("#enable_draw_translation");
let $radioInputDrawTranslationSecondaryKeyByNone = document.querySelector("#draw_translation_secondary_key_by_none");
let $radioInputDrawTranslationSecondaryKeyByCtrl = document.querySelector("#draw_translation_secondary_key_by_ctrl");
let $radioInputDrawTranslationSecondaryKeyByAlt = document.querySelector("#draw_translation_secondary_key_by_alt");
let $checkedInputEnableDrawTranslationVoice = document.querySelector("#enable_draw_translation_voice");
let $radioInputDrawTranslationDefaultVoiceByUk = document.querySelector("#draw_translation_default_voice_by_uk");
let $radioInputDrawTranslationDefaultVoiceByUs = document.querySelector("#draw_translation_default_voice_by_us");


/**
 * 刷新全局变量
 */
const refreshDom = () => {
    $buttonSettingSave = document.querySelector("#setting-save-btn");
    $textInputAppKey = document.querySelector("#app_key");
    $textInputAppSecretKey = document.querySelector("#app_secret_key");
    $checkedInputEnableDrawTranslation = document.querySelector("#enable_draw_translation");
    $radioInputDrawTranslationSecondaryKeyByNone = document.querySelector("#draw_translation_secondary_key_by_none");
    $radioInputDrawTranslationSecondaryKeyByCtrl = document.querySelector("#draw_translation_secondary_key_by_ctrl");
    $radioInputDrawTranslationSecondaryKeyByAlt = document.querySelector("#draw_translation_secondary_key_by_alt");
    $checkedInputEnableDrawTranslationVoice = document.querySelector("#enable_draw_translation_voice");
    $radioInputDrawTranslationDefaultVoiceByUk = document.querySelector("#draw_translation_default_voice_by_uk");
    $radioInputDrawTranslationDefaultVoiceByUs = document.querySelector("#draw_translation_default_voice_by_us");
}

/**
 * 保存配置
 */
const saveConfig = () => {

    const config = configExtract();

    // 保存到里面
    chrome.storage.local.set({customizedConfig: config}, function () {
        console.log('储存当前配置文件: ' + config);
    });

}

/**
 *  获取页面中的配置信息
 *
 * @return {string} 配置文件信息
 */
const configExtract = () => {
    // 刷新全局变量
    refreshDom();

    let config = {};

    // 应用ID
    let appKey = $textInputAppKey.value
    if (Ext.isNotEmpty(appKey)) {
        config['appKey'] = appKey;
    }

    // 应用密钥
    let appSecretKey = $textInputAppSecretKey.value
    if (Ext.isNotEmpty(appSecretKey)) {
        config['appSecretKey'] = appSecretKey;
    }

    // 是否启用划词
    let enableDrawTranslation = $checkedInputEnableDrawTranslation.hasAttribute("checked") || ($checkedInputEnableDrawTranslation['checked'] !== false) ? 'Y' : 'N';
    if (Ext.isNotEmpty(enableDrawTranslation)) {
        config['enableDrawTranslation'] = enableDrawTranslation;
    }

    // 划词的配合键
    if ($radioInputDrawTranslationSecondaryKeyByNone.hasAttribute("checked") || $radioInputDrawTranslationSecondaryKeyByNone['checked']) {
        config['drawTranslationSecondaryKey'] = 'None';
    } else if ($radioInputDrawTranslationSecondaryKeyByCtrl.hasAttribute("checked") || $radioInputDrawTranslationSecondaryKeyByCtrl['checked']) {
        config['drawTranslationSecondaryKey'] = 'Ctrl';
    } else if ($radioInputDrawTranslationSecondaryKeyByAlt.hasAttribute("checked") || $radioInputDrawTranslationSecondaryKeyByAlt['checked']) {
        config['drawTranslationSecondaryKey'] = 'Alt';
    } else {
        config['drawTranslationSecondaryKey'] = 'None';
    }

    // 是否开启发音
    let enableDrawTranslationVoice = $checkedInputEnableDrawTranslationVoice.hasAttribute("checked") || ($checkedInputEnableDrawTranslationVoice['checked'] !== false) ? 'Y' : 'N';
    if (Ext.isNotEmpty(enableDrawTranslationVoice)) {
        config['enableDrawTranslationVoice'] = enableDrawTranslationVoice;
    }

    // 发音
    if($radioInputDrawTranslationDefaultVoiceByUk.hasAttribute("checked") || $radioInputDrawTranslationDefaultVoiceByUk['checked']){
        config['drawTranslationDefaultVoice'] = 'uk';
    }else if($radioInputDrawTranslationDefaultVoiceByUs.hasAttribute("checked") || $radioInputDrawTranslationDefaultVoiceByUs['checked']){
        config['drawTranslationDefaultVoice'] = 'us';
    }

    return JSON.stringify(config);
}

/**
 *  初始化配置文件
 *
 * @param config
 */
const configApply = (config) => {

    // 个人定制,不显示
    if (Ext.isEmpty(config)) {
        return;
    }

    if (Ext.isNotEmpty(config.appKey)) {
        $textInputAppKey.setAttribute("value", config.appKey);
    }

    if (Ext.isNotEmpty(config.appSecretKey)) {
        $textInputAppSecretKey.setAttribute("value", config.appSecretKey);
    }

    if (Ext.isNotEmpty(config.enableDrawTranslation)) {
        if (config.enableDrawTranslation === 'Y') {
            $checkedInputEnableDrawTranslation['checked'] = true
        } else {
            $checkedInputEnableDrawTranslation.removeAttribute("checked");
        }
    }

    if (Ext.isNotEmpty(config.drawTranslationSecondaryKey)) {
        if (config.drawTranslationSecondaryKey === "None") {
            $radioInputDrawTranslationSecondaryKeyByNone['checked'] = true
            $radioInputDrawTranslationSecondaryKeyByCtrl.removeAttribute("checked");
            $radioInputDrawTranslationSecondaryKeyByAlt.removeAttribute("checked");

        } else if (config.drawTranslationSecondaryKey === "Ctrl") {
            $radioInputDrawTranslationSecondaryKeyByCtrl['checked'] = true
            $radioInputDrawTranslationSecondaryKeyByNone.removeAttribute("checked");
            $radioInputDrawTranslationSecondaryKeyByAlt.removeAttribute("checked");

        } else if (config.drawTranslationSecondaryKey === "Alt") {
            $radioInputDrawTranslationSecondaryKeyByAlt['checked'] = true
            $radioInputDrawTranslationSecondaryKeyByNone.removeAttribute("checked");
            $radioInputDrawTranslationSecondaryKeyByCtrl.removeAttribute("checked");
        }
    }

    if (Ext.isNotEmpty(config.enableDrawTranslationVoice)) {
        if (config.enableDrawTranslationVoice === 'Y') {
            $checkedInputEnableDrawTranslationVoice['checked'] = true
        } else {
            $checkedInputEnableDrawTranslationVoice.removeAttribute("checked");
        }
    }

    if (Ext.isNotEmpty(config.drawTranslationDefaultVoice)) {
        if (config.drawTranslationDefaultVoice === 'uk') {
            $radioInputDrawTranslationDefaultVoiceByUk['checked'] = true
            $radioInputDrawTranslationDefaultVoiceByUs.removeAttribute("checked");
        } else if (config.drawTranslationDefaultVoice === 'us') {
            $radioInputDrawTranslationDefaultVoiceByUs['checked'] = true
            $radioInputDrawTranslationDefaultVoiceByUk.removeAttribute("checked");
        }
    }
}

// 触发变更事件
// chrome.storage.onChanged.addListener(function (changes, namespace) {
//     for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//         console.log(
//             `Storage key "${key}" in namespace "${namespace}" changed.`,
//             `Old value was "${oldValue}", new value is "${newValue}".`
//         );
//     }
// });

// 页面加载后执行
(() => {

    // 绑定事件, 保存按钮事件
    $buttonSettingSave.addEventListener("click", saveConfig);

    // 获取配置文件. 如果没有给默认的配置文件
    chrome.storage.local.get(['customizedConfig'], function (result) {
        const config = result.customizedConfig;
        console.log("获取当前配置文件: " + config)

        if (Ext.isNotEmpty(config)) {
            // 初始化配置文件
            configApply(JSON.parse(config));
        } else {
            // 初始化默认配置文件
            configApply(DEFAULT_CONFIG);
        }
    });
})()

