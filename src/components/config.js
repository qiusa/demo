/**
 * 所有请求配置
 */
const ROOT = 'http://139.196.73.243' //外网环境
//const ROOT = 'http://106.2.44.145:8181/appdemo' //外网环境
let config = {
    reg: ROOT + '/user/reg', //注册
    login: ROOT + '/user/login', //登录
    tourist: ROOT + '/user/tourist', //游客登录
    enter: ROOT + '/room/enter', //进去房间
    status: ROOT + '/room/status' //根据房间号查询房间状态，包括聊天室状态和直播频道状态
}

export default config;