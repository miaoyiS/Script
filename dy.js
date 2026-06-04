// ==Loon==
// @name         斗鱼关注动态空响应
// @desc         拦截关注动态接口，直接返回空列表（无方法判断）
// @type         http-response
// @pattern      ^https?://apiv3\.douyucdn\.cn/mgapi/yubanc/api/feed/followedUserFeedList/v2\?
// ==Loon==
// @name         斗鱼关注动态空响应（零上传）
// @desc         拦截关注动态接口，本地返回空列表，无任何网络流量
// @type         http-request
// @pattern      ^https?://apiv3\.douyucdn\.cn/mgapi/yubanc/api/feed/followedUserFeedList/v2\?client_sys=ios
// ==/Loon==

const now = Math.floor(Date.now() / 1000);
const fakeBody = JSON.stringify({
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

$done({
    response: {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: fakeBody
    }
});
