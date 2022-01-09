// noinspection JSUnresolvedVariable

/**
 *  设置界面.用户自定义配置.
 *
 *  @author Jion
 */


/*
 *	各种Dom元素对象
 */
let $queryForm = document.querySelector("#app_key");
let $queryForm = document.querySelector("#app_secret_key");
let $queryForm = document.querySelector("#enable_draw_translation");
let $queryForm = document.querySelector("#draw_translation_secondary_key_by_none");
let $queryForm = document.querySelector("#draw_translation_default_voice_by_uk");


/*
 * 配置对象
 */
const config = {
    'appKey':'1666f504b10dfd2c',
    'appSecretKey':'gKzqWsuGtU3efU4qUlWoR2knV1Q4LST',
    'enableDrawTranslation': 'Y',
    'drawTranslationSecondaryKey':'None',
    'drawTranslationDefaultVoice':'uk',
};




// 页面加载后执行
(() => {

    const hello = (a) => {
        alert(a + '!!')
    }

    // 存
    chrome.storage.sync.set({key: value}, function() {
        console.log('Value is set to ' + value);
    });

    // 取
    chrome.storage.sync.get(['key'], function(result) {
        console.log('Value currently is ' + result.key);
    });

})()
