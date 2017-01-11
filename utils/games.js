// 桌游核心方法/参数

// 取游戏key
function gameDataKeyGet(cate) {
    var ret = "";
    switch (cate) {
        case "killer":
            ret = "killerGameData";
            break;
        default:
            ret = cate;
    }
    return ret;
}

// 读取游戏记录
function gameDataGet(cate) {
    var ret = undefined;
    var gameKey = gameDataKeyGet(cate);
    if (gameKey && gameKey.length > 0) {
        ret = wx.getStorageSync(gameKey);
    }
    return ret;
}

// 保存游戏记录
function gameDataSave(cate, data) {
    var dataSave = Object.assign({}, data);
    var gameKey = gameDataKeyGet(cate);
    delete dataSave['__webviewId__']; // 删除不必要的参数
    if (gameKey && gameKey.length > 0) {
        wx.setStorage({ key: gameKey, data: dataSave });
    }
    return
}

//
module.exports = {
    gameDataKeyGet: gameDataKeyGet,
    gameDataGet: gameDataGet,
    gameDataSave: gameDataSave,
}