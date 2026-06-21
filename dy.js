// ==Loon==
// @name         斗鱼动态+广告接口空响应（零上传）
// @desc         拦截关注动态和广告网关，本地返回空数据
// @type         http-request
// @pattern      ^https?://(apiv3\.douyucdn\.cn/mgapi/yubanc/api/feed/followedUserFeedList/v2\?client_sys=ios|rtbapi\.douyucdn\.cn/japi/dyadx/gateway/app/getinfo\?client_sys=ios)
// ==/Loon==

const url = $request.url;
let fakeBody = '{}';

if (url.includes('followedUserFeedList')) {
    const now = Math.floor(Date.now() / 1000);
    fakeBody = JSON.stringify({
        error: 0,
        msg: "正常",
        data: {
            next_offset: 0,
            feed_count: 0,
            tips_new_count: "",
            server_time: now,
            list: []
        }
    });
} else if (url.includes('dyadx/gateway/app/getinfo')) {
    fakeBody = JSON.stringify({
        error: 0,
        msg: "操作成功",
        data: {
            adxc: {},
            xhc: {},
            tips: null,
            list: [],
            qimei: 0
        }
    });
}

$done({
    response: {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: fakeBody
    }
});
