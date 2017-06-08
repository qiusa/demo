/**
 * toast提示框
 */
import React, {
    Component
} from 'react';
import ReactDOM, {
    render
} from 'react-dom';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
class VideoPlay extends Component {
    state = {
        msg: '加载中。。。', //提示信息
        playStatus: false, //播放按钮
        isEnd: false //直播状态
    }

    /**
     * 初始化播放器
     * @param  {String} hlsPullUrl 播放地址
     */
    playUrl(hlsPullUrl) {
        console.info('hlsPullUrl', hlsPullUrl)
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
            this.initPlayerEvent();
            let src = {
                src: hlsPullUrl,
                type: 'application/x-mpegURL'
            };
            this.player.src(src);
        }.bind(this))
    }

    /**
     * 播放视频
     */
    play() {
        this.player.play();
        this.setState({
            playStatus: false
        })
        console.info(this.refs.myVideo)
            //this.refs.myVideo.cancelFullScrren();  
            //this.refs.myVideo.webkitCancelFullScreen();      
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
            this.setState({
                playStatus: true
            })
        }.bind(this));
        this.player.on('ended', function() {
            console.info('end')
            self.onEnded()
        });
        this.player.on('error', function() {
            this.showError('直播出错啦')
        }.bind(this));
        this.player.on('timeupdate', function() {
            console.info('time', this.player.currentTime())
            if (!this.ended) {
                var currTime = this.player.currentTime();
                // console.log(currTime, this.lastTime);
                if (currTime === this.lastTime) {
                    this.maybeEnded();
                }
                this.lastTime = currTime;
            }
        }.bind(this));
    }

    maybeEnded() {
        // 检查直播是否结束
        if (this.queryingEnded) {
            return;
        }
        this.queryingEnded = true;
        console.log('queryingEnded');
        $.ajax(config.queryVideoLiveStatusUrl, {
            method: 'GET',
            data: {
                appkey: config.appkey,
                cid: this.liveInfo.cid,
                time: +new Date()
            },
            dataType: 'json',
            error: function(xhr, type, text) {
                this.showError(text);
            },
            success: function(obj) {
                if (obj.res === 200) {
                    this.options.status = obj.msg.status;
                    if (!this.videoIsLiving()) {
                        this.onEnded();
                    }
                    setTimeout(function() {
                        this.queryingEnded = false;
                    }, 3000)
                } else {
                    this.showError(obj.errmsg);
                }
            }

        });
    }

    showError(msg) {
        console.info(this, '00======')
        this.setState({
            msg: msg
        })
    }

    render() {
        return (
            <div className="m-play">
                <div className={this.state.msg ? 'video-tip' : 'video-tip f-dn'}>
                    {this.state.isEnd ? 
                        <div className="end">
                            <span className="end-avatar">
                                <img src={this.props.props.avatar} />
                            </span>
                            <p className="end-nick">{this.props.props.roomCreator}</p>
                            <p className="end-text">{this.msg}</p>
                            <span className="end-btn">关闭</span>    
                        </div>
                        :
                        <p className="p-text">{this.state.msg}</p>
                    }
                </div>
                <div className="play-main">
                    <video className="video video-js vjs-default-skin vjs-big-play-center" ref="myVideo"/* x-webkit-airplay="true" webkit-playsinline="true" */ playsInline></video>
                </div>
                <div className={this.state.playStatus ? 'play-btn' : 'play-btn f-dn'} onClick={this.play.bind(this)}></div>
            </div>
        );
    }
}

export default VideoPlay