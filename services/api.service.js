const host = 'http://v3.wufazhuce.com:8000';

const wxRequest = (params, url) => {
    wx.showToast({
        title: 'loading...',
        icon: 'loading'
    })
    wx.request({
        url: url,
        method: params.method || 'GET',
        data: params.data || {},
        header: {
            'Content-Type': 'application/json'
        },
        success: (res) => {
            params.success && params.success(res);
            wx.hideToast();
        },
        fail: (res) => {
            params.fail && params.fail(res)
        },
        complete: (res) => {
            params.complete && params.complete(res);
        }
    })
}
// index
const getVolById = (params) => wxRequest(params, host + '/api/hp/detail/' + params.query.id);
const getVolIdList = (params) => wxRequest(params, host + '/api/hp/idlist/0');

// reading
const getCarousel = (params) => wxRequest(params, host + '/api/reading/carousel')
const getLastArticles = (params) => wxRequest(params, host + '/api/reading/index')

module.exports = {
    getVolById,
    getVolIdList,
    getCarousel,
    getLastArticles
}