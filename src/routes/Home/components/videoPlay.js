/**
 * toast提示框
 */
import React, {
    Component
} from 'react'
import ReactDOM, {
    render
} from 'react-dom'
import config from '../../../components/config.js'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
let dataVideo = {
    init: false
}
class VideoPlay extends Component {
    state = {
        msg: '', //提示信息
        playStatus: false, //播放按钮
        isEnd: false, //直播状态
        hlsPullUrl: '',
        height: '100%',
        attrPro: 'x-webkit-airplay="true" webkit-playsinline="true"'
    }

    componentDidMount() {
        this.setState({
            height: window.innerHeight
        })
        this.refs.myVideo.setAttribute('x-webkit-airplay', "true")
        this.refs.myVideo.setAttribute('webkit-playsinline', "true")
    }

    initStart(hlsPullUrl) {
        if (dataVideo.init) {
            return
        }
        dataVideo.init = true
        this.setState({
            playStatus: true,
            hlsPullUrl: hlsPullUrl
        })
    }

    /**
     * 初始化播放器
     * @param  {String} hlsPullUrl 播放地址
     */
    playUrl() {
        this.showError('加载中。。。')
        this.player = videojs(this.refs.myVideo, {
            controls: true,
            preload: 'auto',
            controls: false,
            controlBar: {
                progressControl: false,
                remainingTimeDisplay: false,
                customControlSpacer: true
            }
        }, function() {
            this.initPlayerEvent()
            let src = {
                src: this.state.hlsPullUrl,
                type: 'application/x-mpegURL'
            }
            this.player.src(src)
        }.bind(this))
    }

    /**
     * 播放视频
     */
    playVideo() {
        this.setState({
            playStatus: false
        })
        this.playUrl()
    }

    /**
     * 直播结束
     */
    onEnded() {
        this.setState({
            isEnd: true
        })
        this.showError('直播已结束')
    }

    initPlayerEvent() {
        this.player.on('loadedmetadata', function() {
            console.info('load')
            this.showError("")
            setTimeout(function() {
                this.player.play()
            }.bind(this), 500)
            
            
        }.bind(this))
        this.player.on('play', function() {
            this.player.requestFullScreen()
        }.bind(this))
        this.player.on('ended', function() {
            console.info('end')
            self.onEnded()
        }.bind(this))
        this.player.on('pause', function() {
            this.setState({
                playStatus: true
            })
        }.bind(this))
         
        this.player.on('error', function() {
            this.showError('直播出错啦')
        }.bind(this))
        this.player.on('timeupdate', function() {
            if (!this.state.isEnd) {
                var currTime = this.player.currentTime()
                //currTime有小数点无法精确判断 2s后延时判断增加精确度
                setTimeout(function() {
                    if (currTime != 0 && parseInt(currTime) === parseInt(this.lastTime)) {
                        this.maybeEnded()
                    }
                }.bind(this), 2000)
                
                this.lastTime = currTime
            }
        }.bind(this))
    }


    /**
     * 通过请求再次确定直播状态
     */
    maybeEnded() {
        // 检查直播是否结束
        if (this.queryingEnded) {
            return
        }
        this.queryingEnded = true
        let param = {
            sid: this.props.param.sid,
            roomid: this.props.param.roomid,
            needRoomAddress: true
        };
        $.ajax({
            url: config.enter,
            contentType:"application/x-www-form-urlencoded",
            type: 'POST',
            data: param
        }).done(function(data) {
            console.info('dtata',data)
            if(data.code===200){
                if (data.ret.status === 1) {

                } else if (data.ret.status === 0 && !data.ret.valid) {
                    this.onEnded()
                } else {
                    this.showError('主播正在赶来的路上')
                }
            }else{
                if (data.code == 501) {
                    this.onEnded()
                } else {
                   alert(data.msg) 
                }
            }
            this.queryingEnded = false
        }.bind(this)).fail(function() {
            this.queryingEnded = false
            alert('系统超时')
        }.bind(this))
    }

    showError(msg) {
        this.setState({
            msg: msg
        })
    }

    msgClass() {
        if (this.state.msg) {
            if (this.state.isEnd) {
                return 'video-tip tip-index'
            } else {
                return 'video-tip'
            }
        } else {
            return 'video-tip f-dn'
        }
    }

    render() {
        let props = {}
        props.layout === 'horizontal'
        return (
            <div className="m-play">
                <div className={this.msgClass()}>
                    {this.state.isEnd ? 
                        <div className="end">
                            <span className="end-avatar">
                                <img src={this.props.props.avatar} />
                            </span>
                            <p className="end-nick">{this.props.props.roomCreator}</p>
                            <p className="end-text">{this.state.msg}</p>
                            <span className="end-btn" onClick={this.props.closePage}>关闭</span>    
                        </div>
                        :
                        <p className="p-text">{this.state.msg}</p>
                    }
                </div>
                <div className={this.state.msg ? 'play-main f-dn' : 'play-main'}>
                    <video className="video video-js vjs-default-skin vjs-big-play-center" ref="myVideo"/* x-webkit-airplay="true" webkit-playsinline="true" */ {...props} playsInline style={{height: this.state.height}}></video>
                </div>
                <div className={this.state.playStatus ? 'play-btn' : 'play-btn f-dn'} onClick={this.playVideo.bind(this)}></div>
            </div>
        )
    }
}

export default VideoPlay