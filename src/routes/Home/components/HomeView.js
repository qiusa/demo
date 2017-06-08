import React, {
    Component
} from 'react';
import ReactDOM, {
    render
} from 'react-dom';
import page from './room.js'
import util from '../../../components/util.js'
import Notifications, {notify1} from 'react-notify-toast';
import Toast from './toast.js';
import VideoPlayer from './videoPlay.js';
import defaultImage from '../assets/default-icon.png'
import './HomeView.scss'

/*export const HomeView = () => (
  <div>
    <h4>This is a duck, because Redux。。。。。!</h4>
    <img className='duck' src={DuckImage} />
  </div>
)*/
let dataWin = {
    account: 'qiusa',
    password: '123456a',
    roomid: util.getIdTag('roomid'),
    pullUrl: '',
    person: {},
    appkey: '45c6af3c98409b18a84451215d0bdd6e',
    token: '',
    roomid2: '9213830',
    appkey2: '71c281ff6ab950e47a2f6f60d4378d9f',
};
class HomeView extends Component {
    /*static defaultProps = {
        roomCreator: 'qq',
        num: '22'
    }*/
    state = {
        title: '',//房间标题
        avatar: defaultImage,//头像
        roomCreator: '',//房间创造者
        num: '',//房间人数
        loginStatus: false,//登录状态
        giftNum: 1, //礼物数量
        show: {
            loadingStatus: '', //登录聊天室状态
            giftStatus: false //礼物状态
        },
        sendStatus: {
            login: false, //登录状态
            regist: false, //注册状态
            send: false //聊天室发送状态
        },
        sendValue: '',//发送聊天的内容
        login: {
            loginDialog: false, //是否显示登录框
            registDialog: false //是否显示注册框
        },
        login: {},//登录信息
        regist: {}//注册信息
    }
    /**
     * 主动退出聊天室
     */
    routerWillLeave() {
        this.room.disconnect();
    }
    initEvent() {
        /*document.querySelector('.j-over').addEventListener('click', e => {
            e.stopPropagation();
        })*/
    }
    //componentDidMount() 在组件 mounting 完成后调用
    componentDidMount() {
        /**
         * 离开页面触发
         */
        this.props.router.setRouteLeaveHook(
            this.props.route, 
            this.routerWillLeave.bind(this)
        )
        this.initEvent()
        //游客模式登录 todo
        let params = {
            roomid: dataWin.roomid,
            uid: dataWin.account
        }
        //登录
        this.doLogin(dataWin.account, dataWin.password);
        this.refs.video.onEnded()
        //this.refs.video.playUrl('http://gifshow-static.download.ks-cdn.com/video/home-1.mp4')
        /*$.ajax({
            url: 'https://app.netease.im/api/chatroom/requestAddress',
            contentType: "application/json",
            type: 'POST',
            headers: {
                appkey: dataWin.appkey
            },
            data: JSON.stringify(params)
        }).done(function(data) {
            console.info('dtata', data, this)
            if (data.res === 200) {
                this.setState({
                    show: {
                        loadingStatus: '连接中。。。'
                    }
                })
                this.doLink(data.msg.addr);
            } else {
                if (data.res === 414) {
                    alert("账号不存在");
                } else {
                    alert(data.errmsg);
                }
            }
        }.bind(this)).fail(function(data) {
            console.info('error', this);
            this.setState({
                roomCreator: '异常',
                num: 0
            });
        }.bind(this));*/
    }

    //连接聊天室link
    doLink(address) {
        console.info(11,dataWin.appkey2, dataWin.account2,MD5(dataWin.token),dataWin.roomid2)
        this.room = SDK.Chatroom.getInstance({
            appKey: dataWin.appkey2, //测试
            account: dataWin.account,
            token: dataWin.token,
            chatroomId: dataWin.roomid,
            chatroomAddresses: address,
            onconnect: function(msg) {
                this.setState({
                    show: {
                        loadingStatus: ''
                    }
                })
                //登陆cookie记录
                util.setCookie("vAccount", dataWin.account);
                util.setCookie("vToken", dataWin.token);
                util.setCookie("sid", dataWin.sid);
                dataWin.roomInfo = msg.chatroom;
                dataWin.person[dataWin.account] = msg.member;
                this.getHistoryMsgs(this.cbGetHistoryMsgs);
                page.initReady(msg, this);

                //page.hideLoginView();
            }.bind(this),
            onmsgs: function(msgs) {
                page.buildChat(msgs, 'msgs');
            }.bind(this),
            onerror: function(error, obj) {
                console.log('发生错误', error, obj);
            }.bind(this),
            onwillreconnect: function(obj) {
                this.setState({
                    show: {
                        loadingStatus: '重连中。。。'
                    }
                })
                // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
                console.log('即将重连', obj);
            }.bind(this),
            ondisconnect: function(error) {
                this.setState({
                    show: {
                        loadingStatus: '连接已断开'
                    }
                })
                // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
                console.log('连接断开', error);
                if (error) {
                    switch (error.code) {
                        // 账号或者密码错误, 请跳转到登录页面并提示错误
                        case 302:
                            $("#loginView .j-errmsg").html("账号或者密码错误").removeClass('f-dn');
                            break;
                        case 13003:
                            alert("你已被主播拉入了黑名单");
                            this.setState({
                                show: {
                                    loadingStatus: '抱歉，你已被主播拉入了黑名单'
                                }
                            })
                            break;
                            // 被踢, 请提示错误后跳转到登录页面
                        case 'kicked':
                            if (error.reason === "managerKick") {
                                alert("你已被管理员移出房间");
                            } else if (error.reason === "blacked") {
                                alert("你已被管理员移出房间");
                            } else if (error.reason === "samePlatformKick") {
                                alert("你已经在其他端登录");
                                page.doLogout();
                            }
                            break;
                        default:
                            console.log(error.message);
                            break;
                    }
                }
            }.bind(this)
        })
    }

    cbGetHistoryMsgs(err, data) {
        if (!err) {
            page.buildChat(data.msgs, 'historyMsgs');
        } else {
            alert(err);
        }
    }

    /**
     * 是否登录
     * @param  {Number}  type 类型 （目前有礼物和点赞）
     * @return {Boolean}      [description]
     */
    isLogin(type) {
        //判断是否是游客登录状态
        if (dataWin.account !== 'qiusa1') {
            this.setState({
                login: {
                    loginDialog: true
                }
            });
        } else {
            if (type === 1) {//发送聊天
                this.setState({
                    loginStatus: true
                });
                setTimeout(function() {
                    this.refs.textInput.focus();
                    /*document.body.scrollTop = 9999;
                    document.documentElement.scrollTop = 9999;*/
                }.bind(this), 200)
                this.interval = setInterval(function() {
                    document.body.scrollTop = document.body.scrollHeight
                }, 100)
            } else if (type === 2) {//发送礼物
                this.setState({
                    show: {
                        giftStatus: true
                    }
                })
            }
            
        }
    }

    /**
     * 发送文本
     * @param  {String}   text     内容
     * @param  {String}   custom   扩展字段json序列化{type:0} 0游客，1正常 2房主 3管理员 4受限制的
     * @param  {Function} callback 回调
     * @return {void}         
     */
    sendText(text, callback) {
        var type = util.parseMemberType(dataWin.person[dataWin.account]);
        this.room.sendText({
            custom: JSON.stringify({
                type: type
            }),
            text: text,
            done: callback
        })
    }

    /**
     * 发送自定义消息
     * @param  {Object}   content   自定义消息内容
     * @param  {String}   custom   扩展字段json序列化{type:0} 0游客，1正常 2房主 3管理员 4受限制的
     * @param  {Function} callback  回调
     * @return {void}         
     */
    sendCustomMessage(content, callback) {
        var type = util.parseMemberType(dataWin.person[dataWin.account]);
        this.room.sendCustomMsg({
            custom: JSON.stringify({
                type: type
            }),
            content: JSON.stringify(content),
            done: callback
        });
    }

    /**
     * 获取聊天室成员
     * @param  {Boolean}   guest  true获取游客 false固定成员
     * @param  {Int}   time   上一个记录的时间戳 0为当前
     * @param {Int} limit 限制
     * @param  {Function} callback 回调
     * @return {Void} 
     */
    getChatroomMembers(guest, time, limit, callback) {
        this.room.getChatroomMembers({
            guest: guest,
            time: time,
            onlyOnline: true,
            limit: limit,
            done: callback
        });
    }

    /**
     * 获取历史消息
     * @param  {Function} callback 回调
     * @return {Void} 
     */
    getHistoryMsgs(callback) {
        this.room.getHistoryMsgs({
            limit: 10,
            done: callback
        });
    }

    /**
     * 踢人
     * @param  {string}   account   账号
     * @param  {Function} callback 回调
     * @return {Void} 
     */
    kickChatroomMember(account, callback) {
        this.room.kickChatroomMember({
            account: account,
            done: callback
        });
    }

    /**
     * 标记黑名单
     * @param  {string}   account  账号
     * @param  {Boolean}  isAdd    添加移除
     * @param  {Function} callback 回调
     * @return {void}           
     */
    markChatroomBlacklist(account, isAdd, callback) {
        this.room.markChatroomBlacklist({
            account: account,
            isAdd: isAdd,
            done: callback
        });
    }

    /**
     * 标记禁言名单
     * @param  {string}   account  账号
     * @param  {Boolean}  isAdd    添加移除
     * @param  {Function} callback 回调
     * @return {void}           
     */
    markChatroomGaglist(account, isAdd, callback) {
        this.room.markChatroomGaglist({
            account: account,
            isAdd: isAdd,
            done: callback
        });
    }

    /**
     * 标记管理员
     * @param  {string}   account  账号
     * @param  {Boolean}  isAdd    添加移除
     * @param  {Function} callback 回调
     * @return {void}           
     */
    markChatroomManager(account, isAdd, callback) {
        this.room.markChatroomManager({
            account: account,
            isAdd: isAdd,
            done: callback
        });
    }

    /**
     * 设置聊天室成员等级
     * @param  {string}   account  账号
     * @param  {Boolean}  level    等级
     * @param  {Function} callback 回调
     * @return {void}           
     */
    //  markChatroomCommonMember(account,level,callback){
    //     this.room.markChatroomCommonMember({
    //         account: account,
    //         level:level,
    //         done: callback
    //     });    
    // }
    /**
     * 处理菜单命令
     * @param  {Int} type    类型
     * @param  {String} account 账号
     * @param  {Object} data    成员信息
     * @return {Void}      
     */
    dealCommand(type, account, data) {
        var isadd = true;
        var callback = function(err, data) {
            if (err) {
                alert(err);
            }
        }
        switch (type) {
            case "0":
                this.kickChatroomMember(account, callback);
                break;
            case "1":
                if (data.account) {
                    isadd = !data.gaged;
                }
                this.markChatroomGaglist(account, isadd, callback);
                break;
            case "2":
                if (data.account) {
                    isadd = !data.blacked;
                }
                this.markChatroomBlacklist(account, isadd, callback);
                break;
            case "3":
                if (data.account) {
                    isadd = !(data.type === "manager");
                }
                this.markChatroomManager(account, isadd, callback);
                break;
            default:
                break;
        }
    }

    /**
     * 获取聊天室群成员信息
     * @param  {Array}   account  需要获取信息的成员队列
     * @param  {Function} callback 回调方法
     * @return {void}            
     */
    getChatroomMembersInfo(account, callback) {
        this.room.getChatroomMembersInfo({
            accounts: account,
            done: callback
        });
    }

    /**
     * 移开输入框事件
     */
    inputBlur() {
        if (!this.state.sendValue) {
            this.setState({
                loginStatus: false
            });
        }
        if (this.interval) {
            clearInterval(this.interval)
        }
    }

    /**
     * 监听textarea值的变化
     */
    handleChange(event) {
        this.setState({sendValue:event.target.value})
        this.setState({
            sendStatus: {
                send: !!util.trim(event.target.value)
            }
        })
    }
    changeLogin(status) {
        if (status) {
            this.setState({
                login: {
                    loginDialog: false,
                    registDialog: true
                }
            })
        } else {
            this.setState({
                login: {
                    loginDialog: true,
                    registDialog: false
                }
            })
        }
    }
    /**
     * 监听输入框的值
     * @param  {String} bigKey 需要赋值的外层key
     * @param  {String} key    需要赋值的key
     * @param  {obj} event     当前节点
     */
    handleChangeInput(bigKey, key, event) {
        this.state[bigKey][key] = event.target.value
        this.setState(this.state[bigKey])
    }

    /**
     * 校验登录
     */
    validateLogin() {
        //已在登录中
        if (this.state.sendStatus.login) {
            return
        }
        if (!util.trim(this.state.login.username)) {
            this.refs.toast.showToast('帐号不能为空')
        } else if (!util.trim(this.state.login.password) || util.trim(this.state.login.password).length < 6) {
            this.refs.toast.showToast('密码为6~20位字母或者数字')
        }else {
            this.setState({
                sendStatus: {
                    login: true
                }
            })
            this.doLogin(this.state.login.username, this.state.login.password)
        }
    }

    /**
     * 登录
     * @param  {String} username 帐号
     * @param  {String} password 密码
     */
    doLogin(username, password) {
        let param = {
            username: username,
            password: password
        }
        $.ajax({
            url: "http://10.240.76.73:8088/user/login",
            contentType: "application/x-www-form-urlencoded",
            type: 'POST',
            data: param
        }).done(function(data) {
            if (data.code === 200) {
                /*   sid String  session id,用于登录后的接口请求校验
            token   String  用于云信SDK的认证使用
            vodtoken    String  用于点播上传SDK的认证使用*/
                //that.address = data.msg.addr;
                /////$("#room").addClass("f-dn");
                dataWin.account = username
                dataWin.sid = data.ret.sid
                dataWin.token = data.ret.token
                dataWin.vodtoken = data.ret.vodtoken
                //记录登录状态到cookie
                util.setCookie("vAccount", dataWin.account)
                util.setCookie("vToken", dataWin.token)
                util.setCookie("sid", dataWin.sid)
                this.closeLogin();
                this.getRoomEnter(dataWin.sid)
            } else {
                //$("#loginBtn").html('登录').removeAttr('disabled')
                if (data.code === 407) {
                    this.refs.toast.showToast("账号不存在")
                } else {
                    this.refs.toast.showToast(data.msg)
                }
            }
            this.setState({
                sendStatus: {
                    login: false
                }
            })
        }.bind(this)).fail(function(data) {
            console.error('获取数据失败，请刷新重试！')
            this.setState({
                sendStatus: {
                    login: false
                }
            })
            //$("#loginBtn").html('登录').removeAttr('disabled');
        }.bind(this));
    }
    
    /**
     * 观众获取房间看直播
     * @param  {String} sid session id,用于登录后的各类接口请求校验
     * @param  {Boolen} isTourist 是否是游客模式
     */
    getRoomEnter(sid, isTourist) {
        let param = {
            sid: sid,
            needRoomAddress: true
        };
        //如果有房间号则带在请求里
        if (dataWin.roomid) {
            param.roomid = dataWin.roomid;
        }
        //如果有直播流地址则带在请求里
        if (dataWin.pullUrl) {
            param.pullUrl = dataWin.pullUrl;
        }
        $.ajax({
            url: "http://10.240.76.73:8088/room/enter",
            contentType:"application/x-www-form-urlencoded",
            type: 'POST',
            data: param
        }).done(function(data) {
            console.info('dtata',data)
            if(data.code===200){
                this.closeLogin()//关闭登录框
                dataWin.roomid = data.ret.roomid
                if (data.ret.status === 1) {
                    if (!isTourist) {
                        this.refs.video.playUrl(data.ret.hlsPullUrl)//开始播放
                    }
                } else {
                    this.refs.video.onEnded()
                }
                //连接聊天室
                if (data.ret.addr && data.ret.addr[0]) {
                    this.doLink(data.ret.addr)
                }
            }else{
                util.delCookie('vAccount')
                util.delCookie('vToken')
                util.delCookie('sid')
                alert(data.msg)
                //window.location.reload()
            }   
        }.bind(this))
    }
    /**
     * 校验注册输入
     */
    validateRegist() {
        //已在注册中
        if (this.state.sendStatus.regist) {
            return
        }
        if (!util.trim(this.state.regist.username)) {
            this.refs.toast.showToast('帐号不能为空')
        } else if(!util.trim(this.state.regist.nickname)){
            this.refs.toast.showToast('昵称不能为空')
        }else if (!util.trim(this.state.regist.password) || util.trim(this.state.regist.password).length < 6) {
            this.refs.toast.showToast('密码为6~20位字母或者数字')
        }else {
            this.setState({
                sendStatus: {
                    regist: true
                }
            })
            this.doRegister(this.state.regist.username, this.state.regist.password, this.state.regist.nickname);
        }
    }

    /**
     * 发送注册请求
     * @param  {String} username 帐号
     * @param  {String} password 密码
     * @param  {String} nickname 昵称
     */
    doRegister(username,password,nickname) {
        console.info('-====',this.state.regist);
        let params = {
            username: username,
            password: password,
            nickname: nickname  
        };
        $.ajax({
            url: 'http://10.240.76.73:8088/user/reg',
            type: 'POST',
            data: params,
            contentType: 'application/x-www-form-urlencoded',
            beforeSend: function (req) {
                req.setRequestHeader('appkey', dataWin.appkey);
            },
            success: function(data) {
                if (data.code === 200) {    
                    alert("注册成功");
                    this.resetRegist();
                    this.setState({
                        login: {
                            username: username,
                            password: password,
                            loginDialog: true
                        }
                    })
                }else{
                    alert(data.msg);
                }
                this.setState({
                    sendStatus: {
                        regist: false
                    }
                })
            }.bind(this),
            error: function() {
                alert('请求失败，请重试');
                this.setState({
                    sendStatus: {
                        regist: false
                    }
                })
            }
        });
    }

    /**
     * 重置登录信息
     */
    resetLogin() {
        this.setState({
            login: {
                username: '',
                password: ''
            }
        })
    }

    /**
     * 重置注册信息
     */
    resetRegist() {
        this.setState({
            regist: {
                username: '',
                password: '',
                nickname: '' 
            }
        })
    }

    /**
     * 关闭登录注册框
     */
    closeLogin() {
        this.setState({
            login: {
                loginDialog: false,
                registDialog: false
            }
        })
        this.resetLogin()
        this.resetRegist()
    }

    /**
     * 关闭礼物框
     */
    closeGift() {
        this.setState({
            show: {
                giftStatus: false
            }
        })
    }

    /**
     * 赠送玫瑰
     * @return {Number} 玫瑰数量
     */
    checkNum(num) {
        this.setState({
            giftNum: num
        })
    }

    render() {
        return (
            <div>
                <VideoPlayer ref="video" props={this.state} />
                <div className="m-room">
                    <div className="u-clearfix">
                        <span className="avatar">
                            <img src={this.state.avatar} />
                        </span>
                        <span className="detail">
                            <p className="title">{this.state.roomCreator}</p>
                            <p className="desc">房间号：<span id="roomCreator">{dataWin.roomid}</span></p>
                        </span>
                    </div>
                    <div className="person-num">{this.state.num}人</div>
                    <b></b>
                    <div className={this.state.show.loadingStatus ? 'chat chat-loading' : 'chat chat-loading f-dn'}>{this.state.show.loadingStatus}</div>
                    <div className={this.state.show.loadingStatus ? 'chat j-chat f-dn' : 'chat j-chat'} ref="chat"></div>
                    <div className="like-icon"></div>
                    <div className="edit">
                        <div className={this.state.loginStatus ? 'u-title-line f-dn' : 'u-title-line'}></div>
                        {!this.state.loginStatus ? 
                            <div className="u-clearfix">
                                <div className="edit-info" onTouchEnd={this.isLogin.bind(this, 1)}></div>
                                <div className="edit-gift" onTouchEnd={this.isLogin.bind(this, 2)}></div>
                            </div>
                            :
                            <div className="enter-textarea">
                                <textarea className="edit-text" ref="textInput" value={this.state.sendValue} onChange={this.handleChange.bind(this)} onBlur={this.inputBlur.bind(this)}></textarea>
                                <span className={this.state.sendStatus.send ? 'chat-btn' : 'chat-btn chat-disabled-btn'} onTouchEnd={page.sendText.bind(this, this.state.sendValue)}>发送</span>
                            </div>
                        }
                    </div>
                    <div className={this.state.show.giftStatus ? 'gift-box' : 'gift-box f-dn'}>
                        <div className="over-load" onTouchStart={this.closeGift.bind(this)}></div>
                        <ul className="list u-clearfix">
                            <li className={this.state.giftNum === 1 ? 'cur' : ''} onClick={this.checkNum.bind(this, 1)}>
                                <span className="flower-icon"></span>
                                <p className="text">玫瑰x1</p>
                            </li>
                            <li className={this.state.giftNum === 10 ? 'cur' : ''} onClick={this.checkNum.bind(this, 10)}>
                                <span className="flower-icon"></span>
                                <p className="text">玫瑰x10</p>
                            </li>
                            <li className={this.state.giftNum === 15 ? 'cur' : ''} onClick={this.checkNum.bind(this, 15)}>
                                <span className="flower-icon"></span>
                                <p className="text">玫瑰x15</p>
                            </li>
                            <li className={this.state.giftNum === 99 ? 'cur' : ''} onClick={this.checkNum.bind(this, 99)}>
                                <span className="flower-icon"></span>
                                <p className="text">玫瑰x99</p>
                            </li>
                            <span className="gift-send" onTouchEnd={page.showGift.bind(this, this.state.giftNum)}>赠送</span>
                        </ul>
                    </div>
                </div>
                <div className={(this.state.login.loginDialog || this.state.login.registDialog) ? 'u-login' : 'u-login f-dn'}>
                    <div className="over-load j-over" onTouchStart={this.closeLogin.bind(this)}></div>
                    <div className="blur-bg"></div>
                    <div className={this.state.login.loginDialog ? 'wrap j-login' : 'wrap j-login f-dn'}>
                        <div className="row">
                            <span className="icon icon-account"></span>
                            <input type="text" className="ipt j-account" value={this.state.login.username} placeholder="请输入帐号" onChange={this.handleChangeInput.bind(this, "login", "username")} autoComplete="off" />
                        </div>
                        <div className="row">
                            <span className="icon icon-pwd"></span>
                            <input type="password" className="ipt" placeholder="请输入密码" value={this.state.login.password} onChange={this.handleChangeInput.bind(this, "login", "password")} autoComplete="off" />
                        </div>
                        <div className="row">
                            <span className={this.state.sendStatus.login ? 'btn disabled-btn' : 'btn'} onClick={this.validateLogin.bind(this)}><span>登录</span></span>
                        </div>
                        <a className="action" onClick={this.changeLogin.bind(this, true)}>快速注册 ></a>
                    </div>
                    <div className={this.state.login.registDialog ? 'wrap j-regist' : 'wrap j-regist f-dn'}>
                        <div className="row">
                            <span className="icon icon-account"></span>
                            <input type="text" className="ipt j-account2" placeholder="帐号限20位字母或者数字" maxLength="20" value={this.state.regist.username} onChange={this.handleChangeInput.bind(this, "regist", "username")} autoComplete="off" />
                        </div>
                        <div className="row">
                            <span className="icon icon-pwd"></span>
                            <input type="text" className="ipt j-nick" placeholder="昵称限10位汉字、字母或者数字" maxLength="10" value={this.state.regist.nickname}  onChange={this.handleChangeInput.bind(this, "regist", "nickname")} autoComplete="off" />
                        </div>
                        <div className="row">
                            <span className="icon icon-pwd"></span>
                            <input type="password" className="ipt j-password2" placeholder="密码限6~20位字母或者数字"  maxLength="20" value={this.state.regist.password} onChange={this.handleChangeInput.bind(this, "regist", "password")} autoComplete="off" />
                        </div>
                        <div className="row">
                            <div className="errorMsg j-errmsg2 f-dn"></div>
                        </div>
                        <div className="row">
                            <span className={this.state.sendStatus.regist ? 'btn disabled-btn' : 'btn'} onClick={this.validateRegist.bind(this)}><span>注册</span></span>
                        </div>
                        <a className="action" onClick={this.changeLogin.bind(this, false)}>已有帐号？直接登录 ></a>
                    </div>
                </div>
                <Toast ref="toast" />
            </div>
        );
    }
}

export default HomeView