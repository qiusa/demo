import React, {
    Component
} from 'react'
import './Zen.scss'
import util from '../../../components/util.js'
import config from '../../../components/config.js'
import Spinner from 'react-spinkit'

export default class Zen extends Component {
    state = {
        index: 1,
        sendValue: '',
        enter: {
            roomid: '',
            pushUrl: ''
        },
        sendStatus: true
    }

    /**
     * 切换导航
     * @param  {Number} index 数字
     */
    nav(index) {
        this.setState({
            index: index,
            sendValue: '',
            sendStatus: true
        })
    }

    /**
     * 校验直播房间号或直播地址是否正确
     * @param  {Obj} checkedParam  参数
     */
    valiate(checkedParam) {
        if (this.state.sendStatus) {
            return
        }
        this.setState({
            sendStatus: true
        })
        this.doLogin(checkedParam)
    }

    /**
     * 进入直播
     */
    enterPlay(key) {
        if (this.state.sendStatus) {
            return
        }
        if (!util.trim(this.state.sendValue)) {
            alert("输入框不能为空")
            return
        }
        let param = {}
        if (this.state.index === 1) {//房间号
            param.roomid = util.trim(this.state.sendValue)
            let reg=/^[0-9]*$/;
            if (!reg.test(param.roomid)) {
                alert('房间号不存在')
                return
            }
        } else {//直播流
            param.pushUrl = util.trim(this.state.sendValue)
        }
        this.valiate(param)
    }
    /**
     * 游客登录
     */
    doLogin(checkedParam) {
        let param = {}
        $.ajax({
            url: config.tourist,
            contentType: "application/x-www-form-urlencoded",
            type: 'POST',
            data: param
        }).done(function(data) {
            if (data.code === 200) {
                //记录登录状态到cookie
                util.setCookie("vAccount", data.ret.username)
                util.setCookie("sid", data.ret.sid)
                util.setCookie("vToken", data.ret.token)
                this.getRoomEnter(data.ret.sid, checkedParam)
            } else {
                alert(data.msg);
                this.setState({
                    sendStatus: false
                })
            }
        }.bind(this)).fail(function(data) {
            console.error('获取数据失败，请刷新重试！')
            this.setState({
                sendStatus: false
            })
        }.bind(this))
    }

    /**
     * 观众获取房间看直播
     * @param  {String} sid session id,用于登录后的各类接口请求校验
     */
    getRoomEnter(sid, checkedParam) {
        checkedParam.sid = sid
        checkedParam.needRoomAddress = true
        $.ajax({
            url: config.enter,
            contentType:"application/x-www-form-urlencoded",
            type: 'POST',
            data: checkedParam
        }).done(function(data) {
            console.info('dtata',data)
            if(data.code===200){
                util.setCookie("sid", sid)
                util.setCookie("status", data.ret.status)
                util.setCookie("valid", data.ret.valid)
                util.setCookie("hlsPullUrl", data.ret.hlsPullUrl)
                util.setCookie("isTourist", true)
                if (data.ret.addr && data.ret.addr[0]) {
                    util.setCookie("addr", JSON.stringify(data.ret.addr))
                }
                window.location.href = '/?back=' + new Date().getTime() + '&roomid=' + data.ret.roomid
            }else{
                if (this.state.index === 1) {
                    if (data.code === 501) {
                        alert('直播已结束')
                    } else {
                        alert('房间号不存在')
                    }
                    
                } else {
                    if (data.code === 501) {
                        alert('直播已结束')
                    } else {
                        alert('拉流地址不存在')
                    }
                }
            }
            this.setState({
                sendStatus: false
            })
        }.bind(this)).fail(function(data) {
            console.error('获取数据失败，请刷新重试！')
            this.setState({
                sendStatus: false
            })
        }.bind(this))
    }

    handleChange(event) {
        this.setState({sendValue:event.target.value})
        this.setState({sendStatus:!event.target.value})
    }
    /**
     * 移开输入框事件
     */
    inputBlur() {
        if (this.interval) {
            clearInterval(this.interval)
        }
    }
    focusInput() {
        this.interval = setInterval(function() {
            document.body.scrollTop = document.body.scrollHeight
        }, 100)
    }
    render() {
            return (
                    <div>
                    {util.isWeixin() ? 
                        <div className="m-bg">
                            <div className="wx">
                                <p className="text">选择在{util.isIos() ? 'Safair' : '浏览器'}中打开</p>
                            </div>
                        </div>
                        :
                        <div className="m-nav">
                            <div className="title">
                                <span className="logo"></span>
                                <span className="text">视频直播观众端</span>
                            </div>
                            <ul className="nav-list">
                                <li className={this.state.index === 1 ? 'cur' : ''} onClick={this.nav.bind(this, 1)}>房间号观看<span className="line"></span></li>
                                <li className={this.state.index === 2 ? 'cur' : ''} onClick={this.nav.bind(this, 2)}>拉流地址<span className="line"></span></li>
                            </ul>
                            <div className="box">
                                <input type={this.state.index === 1 ? 'tel' : 'text'} className="text-input mt10" placeholder={this.state.index === 1 ? "请输入房间号" : "请输入拉流地址"} value={this.state.sendValue} onChange={this.handleChange.bind(this)}/>
                                <span href="javascript:" className={this.state.sendStatus ? 'btn mt10 disabled-btn' : 'btn mt10'} onClick={this.enterPlay.bind(this)}>进入直播</span>
                            </div>
                        </div>
                    }
                    </div>
                        
        )
    }
}

Zen.propTypes = {
    zen: React.PropTypes.object.isRequired
}