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
let $textInputAppCodeKey = document.querySelector("#app_code_key");
let $checkedInputEnableDrawTranslation = document.querySelector("#enable_draw_translation");
let $radioInputDrawTranslationSecondaryKeyByNone = document.querySelector("#draw_translation_secondary_key_by_none");
let $radioInputDrawTranslationSecondaryKeyByCtrl = document.querySelector("#draw_translation_secondary_key_by_ctrl");
let $radioInputDrawTranslationSecondaryKeyByAlt = document.querySelector("#draw_translation_secondary_key_by_alt");
let $radioInputDrawTranslationDefaultVoiceByUk = document.querySelector("#draw_translation_default_voice_by_uk");
let $radioInputDrawTranslationDefaultVoiceByUs = document.querySelector("#draw_translation_default_voice_by_us");


/*
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

/*
 * 配置文件本地储存的 key
 */
const CONFIG_LOCAL_STORE_KEY = "CUSTOMIZED_CONFIG";

/**
 * 刷新全局变量
 */
const refreshDom = () => {
    $buttonSettingSave = document.querySelector("#setting-save-btn");
    $textInputAppCodeKey = document.querySelector("#app_code_key");
    $checkedInputEnableDrawTranslation = document.querySelector("#enable_draw_translation");
    $radioInputDrawTranslationSecondaryKeyByNone = document.querySelector("#draw_translation_secondary_key_by_none");
    $radioInputDrawTranslationSecondaryKeyByCtrl = document.querySelector("#draw_translation_secondary_key_by_ctrl");
    $radioInputDrawTranslationSecondaryKeyByAlt = document.querySelector("#draw_translation_secondary_key_by_alt");
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

    // 存
    chrome.storage.local.set({key: config}, function () {
        console.log('Value is set to ' + config);
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

    let appCodeKey = $textInputAppCodeKey.getAttribute("value");

    if (Ext.isNotEmpty(appCodeKey)) {
        config['appCodeKey'] = appCodeKey;
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

    // 发音
    if($radioInputDrawTranslationDefaultVoiceByUk.hasAttribute("checked") || $radioInputDrawTranslationDefaultVoiceByUk['checked']){
        config['drawTranslationDefaultVoice'] = 'uk';
    }else if($radioInputDrawTranslationDefaultVoiceByUs.hasAttribute("checked") || $radioInputDrawTranslationDefaultVoiceByUs['checked']){
        config['drawTranslationDefaultVoice'] = 'us';
    }


    console.log(config);

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

    if (Ext.isNotEmpty(config.appCodeKey)) {
        $textInputAppCodeKey.setAttribute("value", config.appCodeKey);
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


// 页面加载后执行
(() => {

    // 取
    chrome.storage.local.get(['key'], function (result) {
        console.log('Value currently is ' + result.key);
    });

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

