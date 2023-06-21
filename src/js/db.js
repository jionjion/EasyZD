/*
 *  自定义实现内存数据库
 */

/**
 * 表余数..加快检索, 默认一个表簇有四个子表
 * @type {number[]}
 */
const TABLE_MOD = [0, 1, 2, 3]
let CURRENT_VALUE = 0;
let CURRENT_METADATA = {};


/**
 * 计算哈希值
 * @param str {string} 哈希字符
 * @return {number} 哈希值
 */
const BKDRHash = function (str) {
    str = str.toLowerCase();
    let hash = 1315423911;
    let i = 0
    for (i = str.length - 1; i >= 0; i--) {
        hash ^= ((hash << 5) + str.charCodeAt(i) + (hash >> 2));
    }
    return (hash & 0x7FFFFFFF);
}


/**
 * 自动获取序列自增, 线程安全
 * @param name {string} 序列名
 */
const sequence = {

    /**
     * 锁
     */
    locked: false,

    /**
     * 获取序列值
     * @return {number} 序列
     */
    nextValue: () => {
        // 被锁时, 递归调用
        if (this.locked) {
            this.nextValue();
        }
        // 上锁. 自增, 解锁
        this.locked = true;
        CURRENT_VALUE = CURRENT_VALUE++;
        this.locked = false;
        return CURRENT_VALUE
    }
}

/**
 *  新增一个
 *
 * @param word string 翻译单词
 * @param obj {JSON} 响应结果
 */
const push = (word, obj) => {
    if (Ext.isNotEmpty(obj)) {
        // 内容
        let context = JSON.stringify(obj);
        // 哈希
        let hash = BKDRHash(word);
        let mod = hash % TABLE_MOD.length;
        // 主键
        let id = sequence.nextValue();

        // 哈希表 _metadata = {_hash: hash, _id: id}
        let _metadata = CURRENT_METADATA;
        _metadata['hash'] = id;
        CURRENT_METADATA = _metadata;
        // 异步备份一份

        // 存入当前表
        // {_id: id, word: word, }
    }
}

/**
 *  查询
 * @param obj {JSON}
 */
const find = (obj) => {

}

// noinspection DuplicatedCode
const Ext = {
    isEmpty: (obj) => {
        if (typeof obj === 'string') {
            return obj.replace(/(^\s*)|(\s*$)/g, "").length === 0
        }
        // noinspection LoopStatementThatDoesntLoopJS
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
    }
}
