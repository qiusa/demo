/*
* @Author: Zhang Yingya(hzzhangyingya)
* @Date:   2016-03-28 16:42:33
* @Last Modified by:   Zhang Yingya(hzzhangyingya)
* @Last Modified time: 2016-04-21 17:40:18
*/


function VideoPlayer(options) {
    this.options = options || {};
    var self = this;
    self.initNode(options);
    self.loading();
    self.getLiveInfo(options);
}

var pro = VideoPlayer.prototype = Object.create(EventEmitter.prototype);

pro.initNode = function(options) {
    var self = this;
    // player node
    var $player;
    if (options.playerSelector) {
        $player = $(options.playerSelector);
    } else if (options.player) {
        $player = options.player;
    }
    if (!$player) {
        $player = $('.player');
    }
    self.$player = $player;

    var domStr = '<div class="vam hint"></div>' + '<video class="video"></video>';
    $player.html(domStr);

    // video node
    var $video = $('.video', $player);
    $video.addClass('video-js vjs-default-skin');
    self.$video = $video;

    // hint node
    var $hint = $('.hint', $player);
    self.$hint = $hint;
};

pro.hideHint = function() {
    this.$hint.addClass('f-dn');
};

pro.showHint = function(msg) {
    var self = this;
    self.$hint.html(msg);
    self.$hint.removeClass('f-dn');
};

pro.showError = function(msg) {
    msg = msg || '直播出错啦';
    this.showHint(msg);
};

pro.loading = function() {
    this.showHint('加载中, 请稍候');
};

pro.onEnded = function() {
    var self = this;
    self.ended = true;
    console.log('直播已结束');
    self.showHint('直播已结束');
};

pro.getLiveInfo = function(options) {
    if (options.code == 200) {
        this.play(options.ret.hlsPullUrl);
    }
    /*if (config && config.enter && config.queryVideoLiveStatusUrl && config.roomid && util.readCookie('sid')) {
        $.ajax(config.enter, {
            contentType:"application/x-www-form-urlencoded",
            type: 'POST',
            data: {
                roomid: config.roomid,
                sid: util.readCookie('sid')
            },
            error: function(xhr, type, text) {
                self.showError(text);
            },
            success: function(obj) {
                // console.log('getLiveInfo', obj);
                // console.log(JSON.stringify(obj, null, 4));
                if (obj.code === 200) {
                    self.liveInfo = obj.msg.live;
                    config.liveInfo = self.liveInfo;
                    self.play();
                } else {
                    self.showError(obj.errmsg);
                }
            }
        });
    }*/
};

pro.videoIsLiving = function() {
    if (this.options.ret && this.options.ret.status === 1) {
        return true;
    } else {
        return false;
    }
};

pro.play = function(hlsPullUrl) {
    var self = this;
    if (!self.videoIsLiving()) {
        self.onEnded();
        return;
    }
    var player = self.initPlayer(function() {
        var src;
        src = {
            src: hlsPullUrl,
            type: 'application/x-mpegURL'
        };
        console.log(src);
        // console.log(JSON.stringify(src));
        player.src(src);
        //player.play();
    });
};

pro.initPlayer = function(cb) {
    var self = this;
    var player = self.player;
    if (!player) {
        player = self.player = videojs(self.$video[0], {
            controls: true,
            preload: 'auto',
            controlBar: {
                progressControl: false,
                remainingTimeDisplay: false,
                customControlSpacer: true
            }
        }, function() {
            self.initPlayerEvent();
            cb();
        });
    } else {
        cb();
    }
    return player;
};

pro.initPlayerEvent = function() {
    var self = this;
    var player = self.player;
    player.on('loadedmetadata', function() {
        self.hideHint();
    });
    player.on('ended', function() {
        self.onEnded();
    });
    player.on('error', function() {
        self.showError('直播出错啦');
    });
    player.on('timeupdate', function() {
        if (!self.ended) {
            var currTime = self.player.currentTime();
            // console.log(currTime, self.lastTime);
            if (currTime === self.lastTime) {
                self.maybeEnded();
            }
            self.lastTime = currTime;
        }
    });
};

pro.maybeEnded = function() {
    var self = this;
    // 检查直播是否结束
    if (self.queryingEnded) {return;}
    self.queryingEnded = true;
    console.log('queryingEnded');
    $.ajax(config.queryVideoLiveStatusUrl, {
        method: 'GET',
        data: {
            appkey: config.appkey,
            cid: self.liveInfo.cid,
            time: +new Date()
        },
        dataType: 'json',
        error: function(xhr, type, text) {
            self.showError(text);
        },
        success: function(obj) {
            if (obj.res === 200) {
                self.options.status = obj.msg.status;
                if (!self.videoIsLiving()) {
                    self.onEnded();
                }
                setTimeout(function() {
                    self.queryingEnded = false;
                }, 3000)
            } else {
                self.showError(obj.errmsg);
            }
        }

    });
};
