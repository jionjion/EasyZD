/**
 *   配置信息.
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


export default App;
