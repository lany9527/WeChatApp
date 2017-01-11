// 联网相关
const Promise = require('../vender/node_modules/bluebird/js/browser/bluebird.core.min');

var resource = {
    // var
    wx: undefined,        // 微信接口
    connWs: undefined,    // websocket连接
    inited: false,        // true: 已初始化过
    connInited: false,    // true: 已初始化过

    // const
    connReply: 1000,      // 断线重连:毫秒

    // init
    init: function (wx) {
        this.wx = wx;
        console.log("init resource");

        // this.connDo();     // 连接服务器

        // 一次性初始化
        if (this.inited == false) {
            this.inited = true;
        }
    },

    // 连接websocket
    connDo: function () {
        var that = this;

        // 事件监听
        if (!this.connInited) {
            this.connInited = true;
            this.wx.onSocketOpen(function (res) {
                that.connWs = res;
                console.log('onSocketOpen ', res);
            });
            this.wx.onSocketError(function (res) {
                console.log('onSocketError ', res);
            });
            this.wx.onSocketMessage(function (res) {
                console.log('onSocketMessage' + res.data);
            });
            // 连接断开后的监听
            this.wx.onSocketClose(function (res) {
                that.connWs = undefined;
                console.log('onSocketClose', res);
                setTimeout(function () {
                    that.connDo();
                }, that.connReply);

            })
        }

        // 连接
        if (!this.connWs) {
            this.wx.connectSocket({
                url: 'ws://127.0.0.1:8090/ws',
                success: function (e) {
                    console.log("success ", e, resource.connWs);
                },
                fail: function (e) {
                    console.log("fail ", e);
                },
                complete: function (e) {
                    console.log("complete ", e);
                },
            });
        }
    },

    // get
    get: function () {
        var promise = new Promise(function (resolve, reject) {
            if (true) {
                resolve("value");
            } else {
                reject("error");
            }
        });
        return promise;
    },
};

module.exports = {
    resource: resource,
}