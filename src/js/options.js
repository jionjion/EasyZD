// noinspection JSUnresolvedVariable

/**
 *  设置界面.用户自定义配置.
 *
 *  @author Jion
 */

/*
 *	各种Dom元素对象
 */
let $textInputAppKey = document.querySelector("#app_key");
let $passwordInputAppSecretKey = document.querySelector("#app_secret_key");
let $checkedInputEnableDrawTranslation = document.querySelector("#enable_draw_translation");
let $radioInputDrawTranslationSecondaryKeyByNone = document.querySelector("#draw_translation_secondary_key_by_none");
let $radioInputDrawTranslationSecondaryKeyByCtrl = document.querySelector("#draw_translation_secondary_key_by_ctrl");
let $radioInputDrawTranslationSecondaryKeyByAlt = document.querySelector("#draw_translation_secondary_key_by_alt");
let $radioInputDrawTranslationDefaultVoiceByUk = document.querySelector("#draw_translation_default_voice_by_uk");
let $radioInputDrawTranslationDefaultVoiceByUs = document.querySelector("#draw_translation_default_voice_by_us");


/*
 * 配置对象
 */
const config = {
    'appKey': '1666f504b10dfd2c',
    'appSecretKey': 'gKzqWsuGtU3efU4qUlWoR2knV1Q4LST',
    'enableDrawTranslation': 'Y',
    'drawTranslationSecondaryKey': 'Alt',
    'drawTranslationDefaultVoice': 'uk',
};


// 页面加载后执行
(() => {
    const init = (config) => {
        console.log(config)
        debugger;
        // 个人定制,不显示
        if (Ext.isEmpty(config)) {
            return;
        }

        if (Ext.isNotEmpty(config.appKey)) {
            $textInputAppKey.setAttribute("value", config.appKey);
        }

        if (Ext.isNotEmpty(config.appSecretKey)) {
            $passwordInputAppSecretKey.setAttribute("value", config.appSecretKey);
        }

        if (Ext.isNotEmpty(config.enableDrawTranslation)) {
            if (config.enableDrawTranslation === 'Y') {
                $checkedInputEnableDrawTranslation.setAttribute("value", "checked");
            } else {
                $checkedInputEnableDrawTranslation.removeAttribute("checked");
            }
        }

        if (Ext.isNotEmpty(config.drawTranslationSecondaryKey)) {
            if (config.drawTranslationSecondaryKey === "None") {
                $radioInputDrawTranslationSecondaryKeyByNone.setAttribute("checked", "checked");
                $radioInputDrawTranslationSecondaryKeyByCtrl.removeAttribute("checked");
                $radioInputDrawTranslationSecondaryKeyByAlt.removeAttribute("checked");

            } else if (config.drawTranslationSecondaryKey === "Ctrl") {
                $radioInputDrawTranslationSecondaryKeyByCtrl.setAttribute("checked", "checked");
                $radioInputDrawTranslationSecondaryKeyByNone.removeAttribute("checked");
                $radioInputDrawTranslationSecondaryKeyByAlt.removeAttribute("checked");

            } else if (config.drawTranslationSecondaryKey === "Alt") {
                $radioInputDrawTranslationSecondaryKeyByAlt.setAttribute("checked", "checked");
                $radioInputDrawTranslationSecondaryKeyByNone.removeAttribute("checked");
                $radioInputDrawTranslationSecondaryKeyByCtrl.removeAttribute("checked");
            }
        }

        if (Ext.isNotEmpty(config.drawTranslationDefaultVoice)) {
            if (config.drawTranslationDefaultVoice === 'uk') {
                $radioInputDrawTranslationDefaultVoiceByUk.setAttribute("checked", "checked");
                $radioInputDrawTranslationDefaultVoiceByUs.removeAttribute("checked");
            } else if (config.drawTranslationDefaultVoice === 'us') {
                $radioInputDrawTranslationDefaultVoiceByUs.setAttribute("checked", "checked");
                $radioInputDrawTranslationDefaultVoiceByUk.removeAttribute("checked");
            }
        }
    }

    // // 存
    // chrome.storage.sync.set({key: value}, function() {
    //     console.log('Value is set to ' + value);
    // });
    //
    // // 取
    // chrome.storage.sync.get(['key'], function(result) {
    //     console.log('Value currently is ' + result.key);
    // });


    // 初始化值
    init(config);
})()
